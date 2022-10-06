import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined
} from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar } from 'antd';
import ButtonUI from 'components/Button/ButtonUI';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import { Logo } from 'components/Images/Logo';
import InputUI from 'components/Input/InputUI';
import { ColorPalette } from 'constants/style.constant';
import {
  MockData,
  SignUpFormDefaultValue,
  SignUpFormValidation
} from 'constants/user.constants';
import {
  checkEmailExistActionRequest,
  createNewAccountActionRequest,
  resetAuthState
} from 'global/common/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FC, useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import {
  AnotherOptionContainer,
  BasicFlex,
  ErrorAPIBox,
  LoginContainer,
  LoginFormContainer
} from '../Login/Login.style';

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const uniqueKey = useId();
  const { message, success, loading, emailExist } = useAppSelector(
    (globalState) => globalState.auth
  );
  const [toggleSeePW, setToggleSeePW] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    setFocus,
    control,
    watch,
    setError
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: SignUpFormDefaultValue,
    resolver: yupResolver(SignUpFormValidation)
  });

  const emailWatch = watch('email');

  const renderSuffixPassword = useMemo(
    () =>
      !toggleSeePW ? (
        <EyeOutlined onClick={() => setToggleSeePW((prev) => !prev)} />
      ) : (
        <EyeInvisibleOutlined onClick={() => setToggleSeePW((prev) => !prev)} />
      ),
    [toggleSeePW]
  );

  const onSubmitLogin = useCallback(
    (value: any) => {
      if (errors) {
        return null;
      }
      clearErrors();
      const { email, password, firstName, lastName } = value;
      dispatch(
        createNewAccountActionRequest({
          email,
          password,
          firstName: !firstName ? undefined : firstName,
          lastName: !lastName ? undefined : lastName
        })
      );
    },
    [clearErrors, dispatch, errors]
  );

  const renderErrorBox = useMemo(() => {
    if (message && success) {
      return (
        <ErrorAPIBox itemProp={success ? 'success' : 'error'}>
          {message}
        </ErrorAPIBox>
      );
    }
    return null;
  }, [message, success]);

  useEffect(() => {
    if (errors) {
      const [firstFoundError, ...otherErrors] = Object.entries(errors);
      if (firstFoundError) {
        setFocus(firstFoundError[0]);
      }
    }
  }, [errors, setFocus]);

  useEffect(() => {
    if (emailWatch && String(emailWatch).includes('@gmail.com')) {
      dispatch(checkEmailExistActionRequest(emailWatch));
    }
  }, [dispatch, emailWatch]);

  useEffect(() => {
    if (emailExist) {
      setError('email', { message: 'Email đã tồn tại vui lòng thử lại' });
    }
  }, [emailExist, setError]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  return (
    <LoginContainer>
      <BasicFlex>
        <h2>Tham gia</h2>
        <Logo blockWidth={180} blockHeight={60} />
      </BasicFlex>
      <Avatar.Group style={{ marginTop: 15, marginBottom: 12 }}>
        {MockData.map((each, index) => (
          <Avatar
            src={each.link}
            key={uniqueKey + index}
            style={{ height: 45, width: 45 }}
          />
        ))}
      </Avatar.Group>
      {renderErrorBox}
      <LoginFormContainer>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, ref } }) => (
            <InputUI
              ref={ref}
              name="email"
              placeholder="Email"
              style={{ borderRadius: 8, paddingBlock: 10, paddingLeft: 15 }}
              suffix={<MailOutlined />}
              onChange={onChange}
              value={value}
              errors={errors}
              errTextStyle={{ paddingInline: 12 }}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, ref } }) => (
            <InputUI
              ref={ref}
              name="password"
              placeholder="Mật khẩu"
              type={!toggleSeePW ? 'password' : 'text'}
              style={{ borderRadius: 8, paddingBlock: 10, paddingLeft: 15 }}
              suffix={renderSuffixPassword}
              onChange={onChange}
              value={value}
              errors={errors}
              errTextStyle={{ paddingInline: 12 }}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange, ref } }) => (
            <InputUI
              ref={ref}
              name="confirmPassword"
              placeholder="Mật khẩu xác nhận"
              type={!toggleSeePW ? 'password' : 'text'}
              style={{ borderRadius: 8, paddingBlock: 10, paddingLeft: 15 }}
              suffix={renderSuffixPassword}
              onChange={onChange}
              value={value}
              errors={errors}
              errTextStyle={{ paddingInline: 12 }}
            />
          )}
        />
        <FlexBetween>
          <div>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { value, onChange, ref } }) => (
                <InputUI
                  ref={ref}
                  name="firstName"
                  placeholder="Họ và tên đệm"
                  type="text"
                  style={{ borderRadius: 8, paddingBlock: 10, paddingLeft: 15 }}
                  onChange={onChange}
                  value={value}
                  errors={errors}
                  errTextStyle={{ paddingInline: 12 }}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { value, onChange, ref } }) => (
                <InputUI
                  ref={ref}
                  name="lastName"
                  placeholder="Tên"
                  type="text"
                  style={{ borderRadius: 8, paddingBlock: 10, paddingLeft: 15 }}
                  onChange={onChange}
                  value={value}
                  errors={errors}
                  errTextStyle={{ paddingInline: 12 }}
                />
              )}
            />
          </div>
        </FlexBetween>
        <FlexBetween style={{ paddingInline: 10 }}>
          <div />
          <span style={{ cursor: 'pointer' }}>Quên mật khẩu</span>
        </FlexBetween>

        <BasicFlex style={{ marginTop: 10 }}>
          <ButtonUI
            content="Đăng ký"
            colorFill={ColorPalette.purpleMain}
            style={{
              width: '95%',
              height: 45,
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: '0.8px'
            }}
            onClick={handleSubmit(onSubmitLogin)}
            loading={loading}
          />
        </BasicFlex>

        <AnotherOptionContainer>
          Đã có tài khoản hãy <span>Đăng nhập</span>
        </AnotherOptionContainer>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default SignUpForm;
