/**
 * useErrorToast — watches a Redux error selector and shows a toast when it changes.
 *
 * Automatically clears the Redux error after displaying the toast,
 * so screens don't need inline error blocks.
 */
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDialog} from '@lmb-it/kitsconcerto';
import {selectAuthError, authActions} from '@src/modules/Auth';
import {selectTAError, tradingAccountActions} from '@src/modules/TradingAccount';
import {selectProfileError, profileActions} from '@src/modules/Profile';

export function useAuthErrorToast() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const {toast} = useDialog();
  const prevError = useRef<string | null>(null);

  useEffect(() => {
    if (error && error !== prevError.current) {
      toast('error', error);
      dispatch(authActions.clearError());
    }
    prevError.current = error;
  }, [error, toast, dispatch]);
}

export function useTradingAccountErrorToast() {
  const dispatch = useDispatch();
  const error = useSelector(selectTAError);
  const {toast} = useDialog();
  const prevError = useRef<string | null>(null);

  useEffect(() => {
    if (error && error !== prevError.current) {
      toast('error', error);
      dispatch(tradingAccountActions.clearError());
    }
    prevError.current = error;
  }, [error, toast, dispatch]);
}

export function useProfileErrorToast() {
  const dispatch = useDispatch();
  const error = useSelector(selectProfileError);
  const {toast} = useDialog();
  const prevError = useRef<string | null>(null);

  useEffect(() => {
    if (error && error !== prevError.current) {
      toast('error', error);
      dispatch(profileActions.clearError());
    }
    prevError.current = error;
  }, [error, toast, dispatch]);
}
