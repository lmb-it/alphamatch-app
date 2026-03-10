/**
 * useErrorToast — watches a Redux error selector and shows a toast when it changes.
 *
 * Automatically clears the Redux error after displaying the toast,
 * so screens don't need inline error blocks.
 */
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDialog} from '@lmb/kitsconcerto';
import {selectAuthError, authActions} from '@src/modules/Auth';

export function useAuthErrorToast() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const {toast} = useDialog();
  const prevError = useRef<string | null>(null);

  useEffect(() => {
    if (error && error !== prevError.current) {
      toast('error', error);
      // Clear the error so it won't re-trigger on re-mount
      dispatch(authActions.clearError());
    }
    prevError.current = error;
  }, [error, toast, dispatch]);
}
