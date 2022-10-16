import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CartItem,
  CreateNewAccountBody,
  District,
  Profiles,
  Province,
  User,
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
  cart: CartItem;
  token: string;
  user: User | null;
  profile: Profiles | null;
}

const initialState: AuthState = {
  emailExist: false,
  message: '',
  success: null,
  loading: false,
  province: null,
  district: null,
  ward: null,
  cart: [],
  token: '',
  user: null,
  profile: null
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
      loading: false,
      province: null,
      district: null,
      ward: null,
      cart: [],
      token: '',
      user: null,
      profile: null
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
    }),
    updateCartActionRequest: (
      state: AuthState,
      action: PayloadAction<{
        id: string;
        actionType: 'add' | 'minus' | 'delete';
        detail?: {
          id: string;
          img: string;
          price: string;
          quantity: number;
          name: string;
        };
      }>
    ) => {
      const { id, actionType, detail } = action.payload;
      const oldCart = state.cart;

      if (!oldCart || oldCart.length === 0) {
        return { ...state };
      }

      let newCart: CartItem = [];

      if (actionType === 'add') {
        const doestValueExist = [...oldCart].some((item) => item.id === id);

        if (!doestValueExist && detail) {
          newCart = [...oldCart, detail];
        } else {
          newCart = [...oldCart].map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity + 1
              };
            }

            return { ...item };
          });
        }
      }

      if (actionType === 'minus') {
        const currentItem = [...oldCart].find((item) => item.id === id);

        if (currentItem?.quantity === 1) {
          newCart = [...oldCart].filter((item) => item.id !== id);
        } else {
          newCart = [...oldCart].map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: item.quantity - 1
              };
            }

            return { ...item };
          });
        }
      }

      if (actionType === 'delete') {
        newCart = [...oldCart].filter((item) => item.id !== id);
      }

      return {
        ...state,
        cart: newCart
      };
    },
    setCart: (state: AuthState, action: PayloadAction<{ data: CartItem }>) => ({
      ...state,
      cart: action.payload.data
    }),
    loginToExistedAccountActionRequest: (
      state: AuthState,
      action: PayloadAction<CreateNewAccountBody>
    ) => ({
      ...state,
      loading: true
    }),
    loginToExistedAccountActionComplete: (
      state: AuthState,
      action: PayloadAction<{
        success: boolean;
        message: string;
        refreshToken: string;
        user: User | null;
        profile: Profiles | null;
      }>
    ) => ({
      ...state,
      loading: false,
      success: action.payload.success,
      message: action.payload.message,
      token: action.payload.refreshToken,
      user: action.payload.user,
      profile: action.payload.profile
    }),
    clearErr: (state: AuthState) => ({
      ...state,
      loading: false,
      success: null,
      message: ''
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
  getWardActionComplete,
  updateCartActionRequest,
  setCart,
  loginToExistedAccountActionRequest,
  loginToExistedAccountActionComplete,
  clearErr
} = authSlice.actions;

export default authSlice.reducer;
