import { PayloadAction } from '@reduxjs/toolkit';
import {
  getAllLaptopComplete,
  getAllLaptopRequest,
  getLaptopDetailComplete,
  getLaptopDetailRequest,
  getPaginationLaptopComplete,
  getPaginationLaptopRequest
} from 'global/common/laptop/laptop.slice';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GetListLaptopPaginateBody, Laptop } from 'services/client.interface';
import {
  getDetailLaptop,
  getListLaptop,
  getListLaptopPaginate
} from 'services/client.services';

function* getAllLaptopSaga() {
  try {
    const res: Laptop[] = yield call(() => getListLaptop());
    yield put(getAllLaptopComplete(res));
  } catch (error) {
    yield put(getAllLaptopComplete([]));
  }
}

function* getPaginateLaptopSaga(
  action: PayloadAction<GetListLaptopPaginateBody>
) {
  const { page, size } = action.payload;
  try {
    const res: Laptop[] = yield call(() =>
      getListLaptopPaginate({
        page,
        size
      })
    );
    yield put(getPaginationLaptopComplete(res));
  } catch (error) {
    yield put(getPaginationLaptopComplete([]));
  }
}

function* getDetailLaptopSaga(action: PayloadAction<string>) {
  try {
    const res: Laptop = yield call(() => getDetailLaptop(action.payload));
    yield put(getLaptopDetailComplete(res));
  } catch (error) {
    yield put(getLaptopDetailComplete(null));
  }
}

export default function* laptopSaga() {
  yield all([
    takeLatest(getAllLaptopRequest.type, getAllLaptopSaga),
    takeLatest(getLaptopDetailRequest.type, getDetailLaptopSaga),
    takeLatest(getPaginationLaptopRequest.type, getPaginateLaptopSaga)
  ]);
}
