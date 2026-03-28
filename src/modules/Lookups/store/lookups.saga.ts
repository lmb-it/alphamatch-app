import {takeLatest} from 'redux-saga/effects';
import {lookupsActions} from './lookups.slice';
import {fetchNationalitiesSaga} from './sagas/fetchNationalities.saga';
import {fetchLanguagesSaga} from './sagas/fetchLanguages.saga';

export default function* lookupsSaga(): Generator {
  yield takeLatest(lookupsActions.fetchNationalities.type, fetchNationalitiesSaga);
  yield takeLatest(lookupsActions.fetchLanguages.type, fetchLanguagesSaga);
}
