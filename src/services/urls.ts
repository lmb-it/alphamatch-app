/**
 * API endpoint URL constants
 */
export const URLs = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    forgotPassword: '/auth/request-reset',
    resetPassword: '/auth/reset',
    refresh: '/auth/refresh',
    verifyEmail: '/auth/verify-email',
    resendCode: '/auth/resend-code',
    verifyResetCode: '/auth/verify-reset-code',
    socialLogin: '/auth/social-login',
    phoneLogin: '/auth/phone-login',
  },
  jobs: {
    feed: '/jobs',
    detail: '/jobs/:ref',
    create: '/jobs',
    update: '/jobs/:ref',
    delete: '/jobs/:ref',
    myJobs: '/jobs/my',
  },
  bids: {
    create: '/jobs/:jobRef/bids',
    myBids: '/bids/my',
    detail: '/bids/:ref',
    accept: '/bids/:ref/accept',
    reject: '/bids/:ref/reject',
  },
  chat: {
    rooms: '/chat/rooms',
    room: '/chat/rooms/:ref',
    messages: '/chat/rooms/:ref/messages',
    send: '/chat/rooms/:ref/messages',
  },
  profile: {
    me: '/profile',
    update: '/profile',
    view: '/profile/:ref',
    portfolio: '/profile/portfolio',
  },
  payments: {
    methods: '/payments/methods',
    addMethod: '/payments/methods',
    deposit: '/payments/deposit',
    earnings: '/payments/earnings',
    history: '/payments/transactions',
  },
  subscriptions: {
    plans: '/subscriptions/plans',
    subscribe: '/subscriptions',
    mySubscriptions: '/subscriptions/my',
    cancel: '/subscriptions/:ref/cancel',
  },
  teams: {
    list: '/teams',
    create: '/teams',
    detail: '/teams/:ref',
    members: '/teams/:ref/members',
    invite: '/teams/:ref/invite',
  },
  notifications: {
    list: '/notifications',
    markRead: '/notifications/:ref/read',
    markAllRead: '/notifications/read-all',
    registerDevice: '/notifications/device',
  },
  lookups: {
    countries: '/geo/countries',
    states: '/geo/states/:countryRef',
    cities: '/geo/cities',
    currencies: '/geo/currencies',
    careers: '/options/careers',
  },
};

/**
 * Replace URL params, e.g. resolveUrl('/jobs/:ref', { ref: 'JOB-123' })
 */
export function resolveUrl(url: string, params: Record<string, any>): string {
  let resolved = url;
  Object.entries(params).forEach(([key, value]) => {
    resolved = resolved.replace(`:${key}`, String(value ?? ''));
  });
  return resolved;
}
