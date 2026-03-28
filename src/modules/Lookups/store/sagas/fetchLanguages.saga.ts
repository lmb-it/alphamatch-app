import {call, put} from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';
import {lookupsActions} from '../lookups.slice';
import {fetchLanguages} from '../../api/lookups.service';
import type {ILanguageOption} from '../../models/lookups.types';

export function* fetchLanguagesSaga() {
  try {
    const data: ILanguageOption[] = yield call(fetchLanguages);
    yield put(lookupsActions.setLanguages(data));
  } catch (e) {
    yield put(lookupsActions.setError({key: 'languages', error: 'Failed to load languages'}));
    Sentry.captureException(e, {tags: {feature: 'lookups', step: 'fetch_languages'}});
  }
}
