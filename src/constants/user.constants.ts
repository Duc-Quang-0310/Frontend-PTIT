import * as Yup from 'yup';

/* eslint-disable */
const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
/* eslint-enable */

export const MockData = [
  {
    link: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
  },
  {
    link: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
  },
  {
    link: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
  },
  {
    link: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
  },
  {
    link: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
  },
  {
    link: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
  },
  {
    link: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80'
  }
];

export const LoginFormDefaultValue = {
  email: '',
  password: '',
  rememberMe: true
};

export const LoginFormValidation = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Chưa phải dạng email')
    .min(10, 'Email quá ngắn')
    .max(64, 'Email quá dài')
    .required('Email không được để trống'),
  password: Yup.string()
    .min(8, 'Mật khẩu không được ngắn hơn 8 ký tự')
    .max(30, 'Mật khẩu không được dài hơn 30 ký tự')
    .required('Mật khẩu không được để trống')
});

export enum UserActionModalType {
  LOG_IN = 'Log-in',
  LOG_OUT = 'log-out',
  NEW_ACCOUNT = 'sign-up',
  NONE = 'none',
  PW_RECOVER = 'pw-recover'
}

export const SignUpFormDefaultValue = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: ''
};

export const SignUpFormValidation = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Chưa phải dạng email')
    .min(10, 'Email quá ngắn')
    .max(64, 'Email quá dài')
    .required('Email không được để trống'),
  password: Yup.string()
    .min(8, 'Mật khẩu không được ngắn hơn 8 ký tự')
    .max(30, 'Mật khẩu không được dài hơn 30 ký tự')
    .required('Mật khẩu không được để trống')
    .matches(
      REGEX_PASSWORD,
      'Tối thiểu 8 ký tự, Một chữ hoa, Một chữ thường, Một chữ số, và Một ký tự đặc biệt'
    ),
  confirmPassword: Yup.string()
    .min(8, 'Mật khẩu không được ngắn hơn 8 ký tự')
    .max(30, 'Mật khẩu không được dài hơn 30 ký tự')
    .required('Mật khẩu không được để trống')
    .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại không đúng '),
  firstName: Yup.string().trim().nullable(),
  lastName: Yup.string().trim().nullable()
});
