import { PayloadAction } from '@reduxjs/toolkit';
import {
  checkEmailExistActionComplete,
  checkEmailExistActionRequest,
  createNewAccountActionComplete,
  createNewAccountActionRequest,
  resetAuthState
} from 'global/common/auth/auth.slice';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  CheckEmailExistDataResponse,
  CreateNewAccountBody,
  CreateNewAccountDataResponse
} from 'services/client.interface';
import { createNewAccount, validateEmailExist } from 'services/client.services';

function* createNewAccountActionSaga(
  action: PayloadAction<CreateNewAccountBody>
) {
  try {
    yield put(resetAuthState());
    const data: CreateNewAccountDataResponse = yield call(() =>
      createNewAccount(action.payload)
    );
    yield put(
      createNewAccountActionComplete({
        message: data.message,
        success: data.success
      })
    );
  } catch (error: any) {
    yield put(
      createNewAccountActionComplete({
        message: error.response.data.message,
        success: false
      })
    );
  }
}

function* checkEmailExistActionSaga(action: PayloadAction<string>) {
  try {
    const data: CheckEmailExistDataResponse = yield call(() =>
      validateEmailExist(action.payload)
    );
    yield put(
      checkEmailExistActionComplete({
        emailExist: data.exist
      })
    );
  } catch (error: any) {
    yield put(
      checkEmailExistActionComplete({
        emailExist: true
      })
    );
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(createNewAccountActionRequest.type, createNewAccountActionSaga),
    takeLatest(checkEmailExistActionRequest.type, checkEmailExistActionSaga)
  ]);
}
