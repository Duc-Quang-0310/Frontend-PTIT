import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined
} from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar } from 'antd';
import ButtonUI from 'components/Button/ButtonUI';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import InputUI from 'components/Input/InputUI';
import { ColorPalette } from 'constants/style.constant';
import {
  MockData,
  SignUpFormDefaultValue,
  SignUpFormValidation,
  UserActionModalType
} from 'constants/user.constants';
import {
  checkEmailExistActionRequest,
  clearErr,
  createNewAccountActionRequest,
  getListImgProfileRequest
} from 'global/common/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import _ from 'lodash';
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState
} from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import {
  AnotherOptionContainer,
  BasicFlex,
  ErrorAPIBox,
  LoginContainer,
  LoginFormContainer
} from '../Login/Login.style';

interface ForgotPasswordFormProps {
  setUserActionModalType: Dispatch<SetStateAction<UserActionModalType>>;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  setUserActionModalType
}) => {
  const dispatch = useAppDispatch();
  const uniqueKey = useId();
  const { message, success, loading, emailExist } = useAppSelector(
    (globalState) => globalState.auth
  );
  const [toggleSeePW, setToggleSeePW] = useState<boolean>(false);
  const { listProfileImgs } = useAppSelector((store) => store.auth);

  const mappedImg = useMemo(() => {
    if (listProfileImgs.length) {
      return _.sampleSize(listProfileImgs, 7);
    }
    return MockData;
  }, [listProfileImgs]);

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    setFocus,
    control,
    watch,
    setError,
    reset
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
      clearErrors();
      const { email, password, firstName, lastName } = value;
      dispatch(
        createNewAccountActionRequest({
          email,
          password,
          firstName: !firstName ? undefined : firstName,
          lastName: !lastName ? undefined : lastName,
          onComplete: () => reset()
        })
      );
    },
    [clearErrors, dispatch, reset]
  );

  const renderErrorBox = useMemo(() => {
    if (message) {
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
    if (!emailExist) {
      setError('email', { message: 'Email không tồn tại vui lòng thử lại' });
    }
  }, [emailExist, setError]);

  useEffect(() => {
    dispatch(getListImgProfileRequest());
    return () => {
      dispatch(clearErr());
    };
  }, [dispatch]);

  return (
    <LoginContainer>
      <BasicFlex>
        <h2>Lấy lại mật khẩu</h2>
      </BasicFlex>
      <Avatar.Group style={{ marginTop: 15, marginBottom: 12 }}>
        {mappedImg.map((each, index) => (
          <Avatar
            src={each}
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
        <FlexBetween style={{ paddingInline: 10 }}>
          <div />
          <span
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setUserActionModalType(UserActionModalType.NEW_ACCOUNT)
            }
          >
            Chưa có tài khoản
          </span>
        </FlexBetween>

        <BasicFlex style={{ marginTop: 10 }}>
          <ButtonUI
            content="Đổi mật khẩu"
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
          Đã có tài khoản hãy{' '}
          <span
            onClick={() => setUserActionModalType(UserActionModalType.LOG_IN)}
          >
            Đăng nhập
          </span>
        </AnotherOptionContainer>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default ForgotPasswordForm;
