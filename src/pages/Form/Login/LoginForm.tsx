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
import { ColorPalette } from 'constants/style.constant';
import {
  LoginFormDefaultValue,
  LoginFormValidation,
  MockData
} from 'constants/user.constants';
import { FC, useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  LoginContainer,
  BasicFlex,
  TextUserDoing,
  LoginFormContainer,
  AnotherOptionContainer
} from './Login.style';
import './Login.style.css';

const LoginForm: FC = () => {
  const uniqueKey = useId();
  const [toggleSeePW, setToggleSeePW] = useState<boolean>(false);

  const {
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    setFocus,
    control
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: LoginFormDefaultValue,
    resolver: yupResolver(LoginFormValidation)
  });
  const rememberMeWatch = watch('rememberMe');

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
      if (rememberMeWatch) {
        // TODO: handle with true case
      }
      console.log('🚀 ~ file: LoginForm.tsx ~ line 60 ~ value', value);
    },
    [clearErrors, rememberMeWatch]
  );

  useEffect(() => {
    if (errors) {
      const [firstFoundError, ...otherErrors] = Object.entries(errors);
      if (firstFoundError) {
        console.log(
          '🚀 ~ file: LoginForm.tsx ~ line 72 ~ useEffect ~ otherErrors',
          otherErrors
        );
        setFocus(firstFoundError?.[0]);
      }
    }
  }, [errors, setFocus]);

  return (
    <LoginContainer>
      <BasicFlex>
        <h2>Sử dụng</h2>
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
      <TextUserDoing>
        Khám phá xem <b>5000+ Thành viên </b> đã dùng
        <br /> sản phẩm và quan điểm của họ
      </TextUserDoing>
      <LoginFormContainer>
        <div>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, ref } }) => {
              return (
                <InputUI
                  ref={ref}
                  placeholder="Email"
                  style={{ borderRadius: 8, paddingBlock: 10, paddingLeft: 15 }}
                  suffix={<MailOutlined />}
                  onChange={onChange}
                  value={value}
                />
              );
            }}
          />
          {errors && errors?.email && (
            <div style={{ paddingInline: 12 }} className="error-text">
              {String(errors?.email?.message)}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, ref } }) => (
              <InputUI
                ref={ref}
                placeholder="Mật khẩu"
                type={!toggleSeePW ? 'password' : 'text'}
                style={{ borderRadius: 8, paddingBlock: 10, paddingLeft: 15 }}
                suffix={renderSuffixPassword}
                onChange={onChange}
                value={value}
              />
            )}
          />
          {errors && errors?.password && (
            <div style={{ paddingInline: 12 }} className="error-text">
              {String(errors?.password?.message)}
            </div>
          )}
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

          <span style={{ cursor: 'pointer' }}>Quên mật khẩu</span>
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
          />
        </BasicFlex>

        <AnotherOptionContainer>
          Chưa có tài khoản hãy <span>Đăng ký</span>
        </AnotherOptionContainer>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default LoginForm;
