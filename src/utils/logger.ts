/**
 * Structured Logger
 *
 * Wraps console methods so they only run in __DEV__ mode.
 * Errors are also forwarded to Sentry with optional context.
 */
import * as Sentry from '@sentry/react-native';

type LogContext = Record<string, unknown>;

export const logger = {
  debug(message: string, data?: LogContext) {
    if (__DEV__) {
      console.log(`[DEBUG] ${message}`, data ?? '');
    }
  },

  info(message: string, data?: LogContext) {
    if (__DEV__) {
      console.info(`[INFO] ${message}`, data ?? '');
    }
  },

  warn(message: string, data?: LogContext) {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`, data ?? '');
    }
    Sentry.addBreadcrumb({
      category: 'warning',
      message,
      data,
      level: 'warning',
    });
  },

  error(message: string, error: unknown, data?: LogContext) {
    if (__DEV__) {
      console.error(`[ERROR] ${message}`, error, data ?? '');
    }
    Sentry.captureException(error instanceof Error ? error : new Error(String(error)), {
      tags: data?.feature ? {feature: String(data.feature)} : undefined,
      extra: {message, ...data},
    });
  },
};
