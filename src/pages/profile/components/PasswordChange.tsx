import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonUI from 'components/Button/ButtonUI';
import InputUI from 'components/Input/InputUI';
import {
  UpdatePasswordSchema,
  UpdatePasswordValue
} from 'constants/user.constants';
import {
  changePasswordActionRequest,
  clearErr
} from 'global/common/auth/auth.slice';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { ErrorAPIBox } from 'pages/Form/Login/Login.style';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { InfoTitle, RightContentWrapper } from '../style/UserProfile.styles';

const PasswordChange: FC = () => {
  const { message, success, internalLoading, user } = useAppSelector(
    (globalState) => globalState.auth
  );
  const dispatch = useAppDispatch();
  const [toggleSeePW, setToggleSeePW] = useState<boolean>(false);

  const renderSuffixPassword = useMemo(
    () =>
      !toggleSeePW ? (
        <EyeOutlined onClick={() => setToggleSeePW((prev) => !prev)} />
      ) : (
        <EyeInvisibleOutlined onClick={() => setToggleSeePW((prev) => !prev)} />
      ),
    [toggleSeePW]
  );

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
    clearErrors
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: UpdatePasswordValue,
    resolver: yupResolver(UpdatePasswordSchema)
  });

  const updateInfo = useCallback(
    (value: any) => {
      const { old: oldPassword, new: newPassword } = value;

      if (oldPassword && newPassword && user?._id) {
        dispatch(
          changePasswordActionRequest({
            oldPassword,
            newPassword,
            userId: user?._id,
            onSuccess: () => {
              reset();
              clearErrors();
            }
          })
        );
      }
    },
    [clearErrors, dispatch, reset, user?._id]
  );

  useEffect(
    () => () => {
      dispatch(clearErr());
    },
    [dispatch]
  );

  return (
    <RightContentWrapper>
      <h3>Thay đổi mật khẩu</h3>
      <div className="subtitle">Mật khẩu</div>
      {message && success !== null && (
        <ErrorAPIBox
          itemProp={success ? 'success' : 'failure'}
          style={{ width: '100%', marginTop: 20 }}
        >
          {message}
        </ErrorAPIBox>
      )}
      <InfoTitle style={{ marginTop: 20 }}>Mật khẩu cũ</InfoTitle>
      <Controller
        name="old"
        control={control}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <>
              <InputUI
                ref={ref}
                value={value}
                name="old"
                onChange={onChange}
                marginNone="marginNone"
                type={!toggleSeePW ? 'password' : 'text'}
                suffix={renderSuffixPassword}
              />
              {errors && errors?.old && (
                <div className="error-text">{String(errors?.old?.message)}</div>
              )}
            </>
          );
        }}
      />

      <InfoTitle>Mật khẩu mới </InfoTitle>
      <Controller
        name="new"
        control={control}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <>
              <InputUI
                ref={ref}
                value={value}
                name="new"
                onChange={onChange}
                marginNone="marginNone"
                type="password"
              />
              {errors && errors?.new && (
                <div className="error-text">{String(errors?.new?.message)}</div>
              )}
            </>
          );
        }}
      />

      <InfoTitle>Xác nhận mật khẩu mới </InfoTitle>
      <Controller
        name="newRepeat"
        control={control}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <>
              <InputUI
                ref={ref}
                value={value}
                name="newRepeat"
                onChange={onChange}
                marginNone="marginNone"
                type="password"
              />
              {errors && errors?.newRepeat && (
                <div className="error-text">
                  {String(errors?.newRepeat?.message)}
                </div>
              )}
            </>
          );
        }}
      />
      <ButtonUI
        content="Cập nhật"
        style={{
          marginTop: 30,
          marginLeft: 'auto',
          paddingInline: 40,
          height: 50,
          fontSize: 15,
          fontWeight: '600',
          borderRadius: '20px'
        }}
        onClick={handleSubmit(updateInfo)}
        loading={internalLoading}
      />
    </RightContentWrapper>
  );
};

export default memo(PasswordChange);
