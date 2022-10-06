import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateNewAccountBody } from 'services/client.interface';

export interface AuthState {
  emailExist: boolean;
  message: string;
  success: boolean | null;
  loading: boolean;
}

const initialState: AuthState = {
  emailExist: false,
  message: '',
  success: null,
  loading: false
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
    })
  }
});

export const {
  createNewAccountActionRequest,
  createNewAccountActionComplete,
  resetAuthState,
  checkEmailExistActionRequest,
  checkEmailExistActionComplete
} = authSlice.actions;

export default authSlice.reducer;
