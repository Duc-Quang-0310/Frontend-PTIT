import { all } from 'redux-saga/effects';
import counterSaga from './common/counter/counter.saga';

export default function* rootSaga() {
  yield all([counterSaga()]);
}
