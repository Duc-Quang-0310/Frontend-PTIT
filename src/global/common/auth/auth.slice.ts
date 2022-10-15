import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CreateNewAccountBody,
  District,
  Province,
  Ward
} from 'services/client.interface';

export interface AuthState {
  emailExist: boolean;
  message: string;
  success: boolean | null;
  loading: boolean;
  province: Province;
  district: District;
  ward: Ward;
}

const initialState: AuthState = {
  emailExist: false,
  message: '',
  success: null,
  loading: false,
  province: null,
  district: null,
  ward: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createNewAccountActionRequest: (
      state: AuthState,
      action: PayloadAction<CreateNewAccountBody>
    ) => ({
      ...state,
      loading: true
    }),
    createNewAccountActionComplete: (
      state: AuthState,
      action: PayloadAction<{ success: boolean; message: string }>
    ) => ({
      ...state,
      loading: false,
      success: action.payload.success,
      message: action.payload.message
    }),
    resetAuthState: (state: AuthState) => ({
      ...state,
      emailExist: false,
      message: '',
      success: null,
      loading: false
    }),
    checkEmailExistActionRequest: (
      state: AuthState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      emailExist: false
    }),
    checkEmailExistActionComplete: (
      state: AuthState,
      action: PayloadAction<{ emailExist: boolean }>
    ) => ({
      ...state,
      emailExist: action.payload.emailExist
    }),
    getProvinceActionRequest: (state: AuthState) => ({
      ...state,
      loading: true
    }),
    getProvinceActionComplete: (
      state: AuthState,
      action: PayloadAction<{ data: Province }>
    ) => ({
      ...state,
      loading: false,
      province: action.payload.data
    }),
    getDistrictActionRequest: (
      state: AuthState,
      action: PayloadAction<{ provinceId: string }>
    ) => ({
      ...state,
      loading: true
    }),
    getDistrictActionComplete: (
      state: AuthState,
      action: PayloadAction<{ data: District }>
    ) => ({
      ...state,
      loading: false,
      district: action.payload.data
    }),
    getWardActionRequest: (
      state: AuthState,
      action: PayloadAction<{ districtId: string }>
    ) => ({
      ...state,
      loading: true
    }),
    getWardActionComplete: (
      state: AuthState,
      action: PayloadAction<{ data: Ward }>
    ) => ({
      ...state,
      loading: false,
      ward: action.payload.data
    })
  }
});

export const {
  createNewAccountActionRequest,
  createNewAccountActionComplete,
  resetAuthState,
  checkEmailExistActionRequest,
  checkEmailExistActionComplete,
  getProvinceActionRequest,
  getProvinceActionComplete,
  getDistrictActionRequest,
  getDistrictActionComplete,
  getWardActionRequest,
  getWardActionComplete
} = authSlice.actions;

export default authSlice.reducer;
