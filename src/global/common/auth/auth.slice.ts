import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CartItem,
  CreateNewAccountBody,
  District,
  FavoriteItem,
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
  listProfileImgs: string[];
  internalLoading: boolean;
  favoriteItem: FavoriteItem[];
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
  profile: null,
  listProfileImgs: [],
  internalLoading: false,
  favoriteItem: []
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
      profile: null,
      listProfileImgs: [],
      internalLoading: false,
      favoriteItem: []
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
    }),
    getListImgProfileRequest: (state: AuthState) => ({
      ...state,
      loading: true
    }),
    getListImgProfileComplete: (
      state: AuthState,
      action: PayloadAction<string[]>
    ) => ({
      ...state,
      listProfileImgs: action.payload,
      loading: false
    }),
    updateFavoriteItem: (
      state: AuthState,
      action: PayloadAction<FavoriteItem[]>
    ) => ({
      ...state,
      favoriteItem: action.payload
    }),
    passwordRecoverActionRequest: (
      state: AuthState,
      action: PayloadAction<{
        email: string;
        password: string;
        onSuccess?: Function;
      }>
    ) => ({
      ...state,
      internalLoading: true
    }),
    passwordRecoverActionComplete: (
      state: AuthState,
      action: PayloadAction<{
        success: boolean;
        message: string;
      }>
    ) => ({
      ...state,
      success: action.payload.success,
      message: action.payload.message
    }),
    changePasswordActionRequest: (
      state: AuthState,
      action: PayloadAction<{
        oldPassword: string;
        newPassword: string;
        userId: string;
        onSuccess?: Function;
      }>
    ) => ({
      ...state,
      internalLoading: true
    }),
    changePasswordActionComplete: (
      state: AuthState,
      action: PayloadAction<{
        success: boolean;
        message: string;
      }>
    ) => ({
      ...state,
      success: action.payload.success,
      message: action.payload.message,
      internalLoading: false
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
  clearErr,
  getListImgProfileRequest,
  getListImgProfileComplete,
  updateFavoriteItem,
  passwordRecoverActionRequest,
  passwordRecoverActionComplete,
  changePasswordActionRequest,
  changePasswordActionComplete
} = authSlice.actions;

export default authSlice.reducer;
