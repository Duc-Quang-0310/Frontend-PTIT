import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';
import {
  increment,
  incrementSaga,
  incrementSagaSuccess
} from './counter.slice';

function* increaseSaga(action: PayloadAction<number>) {
  yield put(incrementSaga());
  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  yield all([takeLatest(increment.toString(), increaseSaga)]);
}
