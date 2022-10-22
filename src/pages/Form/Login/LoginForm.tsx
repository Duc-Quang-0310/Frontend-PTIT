import {
  EyeOutlined,
  MailOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import ButtonUI from 'components/Button/ButtonUI';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import { Logo } from 'components/Images/Logo';
import { yupResolver } from '@hookform/resolvers/yup';
import InputUI from 'components/Input/InputUI';
import _ from 'lodash';
import { ColorPalette } from 'constants/style.constant';
import {
  LoginFormDefaultValue,
  LoginFormValidation,
  MockData,
  UserActionModalType
} from 'constants/user.constants';
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
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  clearErr,
  getListImgProfileRequest,
  loginToExistedAccountActionRequest
} from 'global/common/auth/auth.slice';
import {
  LoginContainer,
  BasicFlex,
  TextUserDoing,
  LoginFormContainer,
  AnotherOptionContainer,
  ErrorAPIBox
} from './Login.style';
import './Login.style.css';

interface LoginFormProps {
  setUserActionModalType: Dispatch<SetStateAction<UserActionModalType>>;
}

const LoginForm: FC<LoginFormProps> = ({ setUserActionModalType }) => {
  const uniqueKey = useId();
  const [toggleSeePW, setToggleSeePW] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { message, success, loading } = useAppSelector(
    (globalState) => globalState.auth
  );
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
    reset
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: LoginFormDefaultValue,
    resolver: yupResolver(LoginFormValidation)
  });

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
      dispatch(
        loginToExistedAccountActionRequest({
          email: value.email,
          password: value.password,
          onComplete: () => {
            reset();
            setUserActionModalType(UserActionModalType.NONE);
          }
        })
      );
    },
    [clearErrors, dispatch, reset, setUserActionModalType]
  );

  useEffect(() => {
    if (errors) {
      const [firstFoundError, ...otherErrors] = Object.entries(errors);
      if (firstFoundError) {
        setFocus(firstFoundError[0]);
      }
    }
  }, [errors, setFocus]);

  useEffect(() => {
    dispatch(getListImgProfileRequest());
    return () => {
      dispatch(clearErr());
    };
  }, [dispatch]);

  return (
    <LoginContainer>
      <BasicFlex>
        <h2>Sử dụng</h2>
        <Logo blockWidth={180} blockHeight={60} />
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
      <TextUserDoing>
        Khám phá xem <b>5000+ Thành viên </b> đã dùng
        <br /> sản phẩm và quan điểm của họ
      </TextUserDoing>
      {renderErrorBox}
      <LoginFormContainer>
        <div>
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
        </div>
        <div>
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
        </div>
        <FlexBetween style={{ paddingInline: 10 }}>
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                style={{ color: ColorPalette.purpleMain }}
                checked={value}
                onChange={onChange}
              >
                Ghi nhớ đăng nhập
              </Checkbox>
            )}
          />

          <span
            style={{ cursor: 'pointer' }}
            onClick={() =>
              setUserActionModalType(UserActionModalType.PW_RECOVER)
            }
          >
            Quên mật khẩu
          </span>
        </FlexBetween>

        <BasicFlex style={{ marginTop: 20 }}>
          <ButtonUI
            content="Đăng nhập"
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
          Chưa có tài khoản hãy{' '}
          <span
            onClick={() =>
              setUserActionModalType(UserActionModalType.NEW_ACCOUNT)
            }
          >
            Đăng ký
          </span>
        </AnotherOptionContainer>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default LoginForm;
