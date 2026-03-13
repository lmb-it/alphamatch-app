// Mock Sentry before importing logger
jest.mock('@sentry/react-native', () => ({
  captureException: jest.fn(),
  addBreadcrumb: jest.fn(),
}));

import * as Sentry from '@sentry/react-native';
import {logger} from '../logger';

describe('logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('warn', () => {
    it('adds a Sentry breadcrumb', () => {
      logger.warn('test warning', {feature: 'test'});
      expect(Sentry.addBreadcrumb).toHaveBeenCalledWith({
        category: 'warning',
        message: 'test warning',
        data: {feature: 'test'},
        level: 'warning',
      });
    });
  });

  describe('error', () => {
    it('captures an Error in Sentry', () => {
      const err = new Error('test error');
      logger.error('something failed', err, {feature: 'trading_account'});
      expect(Sentry.captureException).toHaveBeenCalledWith(err, {
        tags: {feature: 'trading_account'},
        extra: {message: 'something failed', feature: 'trading_account'},
      });
    });

    it('wraps non-Error values into Error', () => {
      logger.error('string error', 'just a string');
      expect(Sentry.captureException).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          extra: {message: 'string error'},
        }),
      );
    });
  });
});
