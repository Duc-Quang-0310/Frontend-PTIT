import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetListLaptopPaginateBody, Laptop } from 'services/client.interface';

export interface LaptopState {
  allLaptop: Laptop[];
  laptopListPaginate: Laptop[];
  laptopDetail: Laptop | null;
  loading: boolean;
}

const initialState: LaptopState = {
  allLaptop: [],
  laptopListPaginate: [],
  laptopDetail: null,
  loading: true
};

export const laptopSlice = createSlice({
  name: 'laptop',
  initialState,
  reducers: {
    getAllLaptopRequest: (state: LaptopState) => ({
      ...state,
      loading: true
    }),
    getAllLaptopComplete: (
      state: LaptopState,
      action: PayloadAction<Laptop[]>
    ) => ({
      ...state,
      allLaptop: action.payload,
      loading: false
    }),
    getPaginationLaptopRequest: (
      state: LaptopState,
      action: PayloadAction<GetListLaptopPaginateBody>
    ) => ({
      ...state,
      loading: true
    }),
    getPaginationLaptopComplete: (
      state: LaptopState,
      action: PayloadAction<Laptop[]>
    ) => ({
      ...state,
      laptopListPaginate: action.payload,
      loading: false
    }),
    getLaptopDetailRequest: (
      state: LaptopState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      loading: true
    }),
    getLaptopDetailComplete: (
      state: LaptopState,
      action: PayloadAction<Laptop | null>
    ) => ({
      ...state,
      laptopDetail: action.payload,
      loading: false
    })
  }
});

export const {
  getAllLaptopRequest,
  getAllLaptopComplete,
  getPaginationLaptopRequest,
  getPaginationLaptopComplete,
  getLaptopDetailRequest,
  getLaptopDetailComplete
} = laptopSlice.actions;

export default laptopSlice.reducer;
