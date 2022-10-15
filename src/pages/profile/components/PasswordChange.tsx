import { yupResolver } from '@hookform/resolvers/yup';
import ButtonUI from 'components/Button/ButtonUI';
import InputUI from 'components/Input/InputUI';
import {
  UpdatePasswordSchema,
  UpdatePasswordValue
} from 'constants/user.constants';
import { ErrorAPIBox } from 'pages/Form/Login/Login.style';
import { FC, memo, useCallback } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { InfoTitle, RightContentWrapper } from '../style/UserProfile.styles';

const PasswordChange: FC = () => {
  const {
    formState: { errors },
    control,
    handleSubmit
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: UpdatePasswordValue,
    resolver: yupResolver(UpdatePasswordSchema)
  });

  const updateInfo = useCallback((value: any) => {
    //
  }, []);

  return (
    <RightContentWrapper>
      <h3>Thay đổi mật khẩu</h3>
      <div className="subtitle">Mật khẩu</div>
      <ErrorAPIBox
        itemProp={'success'}
        style={{ width: '100%', marginTop: 20 }}
      >
        Đổi mật khẩu hoàn tất
      </ErrorAPIBox>
      <InfoTitle style={{ marginTop: 20 }}>Mật khẩu cũ</InfoTitle>
      <Controller
        name="old"
        control={control}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <InputUI
              ref={ref}
              value={value}
              errors={errors}
              name="old"
              onChange={onChange}
              marginNone="marginNone"
            />
          );
        }}
      />

      <InfoTitle>Mật khẩu mới </InfoTitle>
      <Controller
        name="new"
        control={control}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <InputUI
              ref={ref}
              value={value}
              errors={errors}
              name="new"
              onChange={onChange}
              marginNone="marginNone"
            />
          );
        }}
      />

      <InfoTitle>Xác nhận mật khẩu mới </InfoTitle>
      <Controller
        name="newRepeat"
        control={control}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <InputUI
              ref={ref}
              value={value}
              errors={errors}
              name="newRepeat"
              onChange={onChange}
              marginNone="marginNone"
            />
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
      />
    </RightContentWrapper>
  );
};

export default memo(PasswordChange);
