import { PayloadAction } from '@reduxjs/toolkit';
import {
  checkEmailExistActionComplete,
  checkEmailExistActionRequest,
  createNewAccountActionComplete,
  createNewAccountActionRequest,
  getDistrictActionComplete,
  getDistrictActionRequest,
  getProvinceActionComplete,
  getProvinceActionRequest,
  getWardActionComplete,
  getWardActionRequest,
  resetAuthState,
  loginToExistedAccountActionComplete,
  loginToExistedAccountActionRequest
} from 'global/common/auth/auth.slice';
import { setLocalStorageItem } from 'helpers/storage';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  CheckEmailExistDataResponse,
  CreateNewAccountBody,
  CreateNewAccountDataResponse,
  DistrictData,
  LoginToExistedAccountData,
  ProvinceData,
  WardData
} from 'services/client.interface';
import {
  createNewAccount,
  getDistrict,
  getProvince,
  getWard,
  loginToExistedAccount,
  validateEmailExist
} from 'services/client.services';

function* createNewAccountActionSaga(
  action: PayloadAction<CreateNewAccountBody>
) {
  try {
    yield put(resetAuthState());

    const { onComplete, ...other } = action.payload;

    const data: CreateNewAccountDataResponse = yield call(() =>
      createNewAccount(other)
    );
    yield put(
      createNewAccountActionComplete({
        message: data.message,
        success: data.success
      })
    );
    onComplete?.();
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

function* getProvinceActionSaga() {
  try {
    const res: ProvinceData = yield call(() => getProvince());
    yield put(
      getProvinceActionComplete({
        data: res.results
      })
    );
  } catch (error) {
    yield put(
      getProvinceActionComplete({
        data: null
      })
    );
  }
}

function* getDistrictActionSaga(action: PayloadAction<{ provinceId: string }>) {
  try {
    const res: DistrictData = yield call(() =>
      getDistrict(action.payload.provinceId)
    );
    yield put(
      getDistrictActionComplete({
        data: res.results
      })
    );
  } catch (error) {
    yield put(
      getDistrictActionComplete({
        data: null
      })
    );
  }
}

function* getWardActionSaga(action: PayloadAction<{ districtId: string }>) {
  try {
    const res: WardData = yield call(() => getWard(action.payload.districtId));
    yield put(
      getWardActionComplete({
        data: res.results
      })
    );
  } catch (error) {
    yield put(
      getWardActionComplete({
        data: null
      })
    );
  }
}

function* loginExistedAccountActionSaga(
  action: PayloadAction<CreateNewAccountBody>
) {
  try {
    yield put(resetAuthState());
    const { onComplete, ...other } = action.payload;
    const data: LoginToExistedAccountData = yield call(() =>
      loginToExistedAccount(other)
    );

    setLocalStorageItem('token', data.accessToken);

    yield put(
      loginToExistedAccountActionComplete({
        message: data.message,
        success: true,
        profile: data?.data?.profile || null,
        refreshToken: data.refreshToken || '',
        user: data?.data?.userInfo || null
      })
    );
    onComplete?.();
  } catch (error: any) {
    yield put(
      loginToExistedAccountActionComplete({
        message: error.response.data.message,
        success: false,
        profile: null,
        refreshToken: '',
        user: null
      })
    );
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(createNewAccountActionRequest.type, createNewAccountActionSaga),
    takeLatest(checkEmailExistActionRequest.type, checkEmailExistActionSaga),
    takeLatest(getProvinceActionRequest.type, getProvinceActionSaga),
    takeLatest(getDistrictActionRequest.type, getDistrictActionSaga),
    takeLatest(getWardActionRequest.type, getWardActionSaga),
    takeLatest(
      loginToExistedAccountActionRequest.type,
      loginExistedAccountActionSaga
    )
  ]);
}
