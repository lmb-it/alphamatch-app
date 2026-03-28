import {call, put} from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';
import {lookupsActions} from '../lookups.slice';
import {fetchNationalities} from '../../api/lookups.service';
import type {INationalityOption} from '../../models/lookups.types';

export function* fetchNationalitiesSaga() {
  try {
    const data: INationalityOption[] = yield call(fetchNationalities);
    yield put(lookupsActions.setNationalities(data));
  } catch (e) {
    yield put(lookupsActions.setError({key: 'nationalities', error: 'Failed to load nationalities'}));
    Sentry.captureException(e, {tags: {feature: 'lookups', step: 'fetch_nationalities'}});
  }
}
