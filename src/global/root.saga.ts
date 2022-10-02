import { all } from 'redux-saga/effects';
import counterSaga from './common/counter/counter.saga';
import authSaga from './sagas/auth.saga';

export default function* rootSaga() {
  yield all([counterSaga(), authSaga()]);
}
