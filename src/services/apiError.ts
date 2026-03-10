/**
 * API Error Parser
 *
 * Parses axios errors into a consistent shape matching the backend envelope:
 *   { success: false, message: string, errors: Record<string, string[]>, meta: Record<string, any> }
 */

export interface IApiError {
  /** HTTP status code (0 if network/timeout error) */
  status: number;
  /** Human-readable error message */
  message: string;
  /** Field-level validation errors: { fieldAlias: ['Error text', ...] } */
  errors: Record<string, string[]>;
  /** Extra metadata from the backend */
  meta: Record<string, any>;
}

/**
 * Extract a structured error from an axios error (or any thrown value).
 *
 * Usage in sagas:
 *   catch (e) { const err = parseApiError(e); yield put(failureAction(err.message)); }
 */
export function parseApiError(error: any): IApiError {
  // Axios error with backend response
  if (error?.response?.data) {
    const {data} = error.response;
    return {
      status: error.response.status ?? 0,
      message: data.message ?? 'Something went wrong',
      errors: data.errors ?? {},
      meta: data.meta ?? {},
    };
  }

  // Axios error without response (network / timeout)
  if (error?.request) {
    if (error.code === 'ECONNABORTED') {
      return {
        status: 0,
        message: 'Request timed out. Please check your connection.',
        errors: {},
        meta: {},
      };
    }
    return {
      status: 0,
      message: 'Network error. Please check your internet connection.',
      errors: {},
      meta: {},
    };
  }

  // Generic Error or string
  const message =
    typeof error === 'string'
      ? error
      : error?.message ?? 'An unexpected error occurred';

  return {
    status: 0,
    message,
    errors: {},
    meta: {},
  };
}

/**
 * Flatten field-level validation errors into a single string.
 * Useful for showing a toast with all validation issues at once.
 *
 * Example: { email: ['Required'], password: ['Too short'] } → 'Required. Too short.'
 */
export function flattenValidationErrors(errors: Record<string, string[]>): string {
  return Object.values(errors)
    .flat()
    .join('. ');
}
