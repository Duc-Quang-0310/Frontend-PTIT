import { yupResolver } from '@hookform/resolvers/yup';
import { Select, Steps } from 'antd';
import ButtonUI from 'components/Button/ButtonUI';
import InputUI from 'components/Input/InputUI';
import {
  UpdateAddressSchema,
  UpdateAddressValue
} from 'constants/user.constants';
import {
  getDistrictActionRequest,
  getProvinceActionRequest,
  getWardActionRequest
} from 'global/common/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FC, useState, useCallback, useEffect, memo } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import {
  InfoTitle,
  RightContentWrapper,
  StepTitle
} from '../style/UserProfile.styles';

const { Step } = Steps;
const { Option } = Select;

const UserAddress: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useAppDispatch();
  const { province, district, ward, profile } = useAppSelector(
    (store) => store.auth
  );

  const handleOnchangeStep = useCallback((current: number) => {
    setCurrentStep(current);
  }, []);

  const {
    watch,
    formState: { errors },
    control,
    getValues,
    handleSubmit,
    setValue
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: UpdateAddressValue,
    resolver: yupResolver(UpdateAddressSchema)
  });

  const provinceWatch = watch('province');
  const districtWatch = watch('district');

  const updateInfo = useCallback((value: any) => {
    //
  }, []);

  useEffect(() => {
    dispatch(getProvinceActionRequest());
  }, [dispatch]);

  useEffect(() => {
    if (provinceWatch) {
      dispatch(getDistrictActionRequest({ provinceId: provinceWatch }));
    }
  }, [dispatch, provinceWatch]);

  useEffect(() => {
    if (districtWatch) {
      dispatch(getWardActionRequest({ districtId: districtWatch }));
    }
  }, [dispatch, districtWatch]);

  useEffect(() => {
    if (profile) {
      setValue('firstName', profile?.firstName || '');
      setValue('lastName', profile?.lastName || '');
      setValue('province', profile?.province || '');
      setValue('district', profile?.district || '');
      setValue('ward', profile?.ward || '');
      setValue('address', profile?.address || '');
    }
  }, [profile, setValue]);

  return (
    <RightContentWrapper>
      <h3>Thông tin người dùng</h3>
      <div className="subtitle">Địa chỉ</div>
      <Steps
        current={currentStep}
        onChange={handleOnchangeStep}
        direction="vertical"
        style={{
          marginTop: '30px',
          marginBottom: 20
        }}
      >
        <Step
          title={
            <StepTitle>
              Thành phố <div>*</div>
            </StepTitle>
          }
          description={
            <>
              <Controller
                name="province"
                control={control}
                render={({ field: { value, onChange, ref } }) => {
                  return (
                    <Select
                      value={value}
                      onChange={onChange}
                      clearIcon
                      showSearch={false}
                      ref={ref}
                      style={{ width: '100%' }}
                    >
                      {province &&
                        province.map((each) => (
                          <Option
                            value={each.province_id}
                            key={each.province_id}
                          >
                            {each.province_name}
                          </Option>
                        ))}
                    </Select>
                  );
                }}
              />
              {errors && errors?.province && (
                <div className="error-text">
                  {String(errors.province?.message) || 'Có lỗi xảy ra'}
                </div>
              )}
            </>
          }
        />
        <Step
          title={
            <StepTitle>
              Quận <div>*</div>
            </StepTitle>
          }
          description={
            <>
              <Controller
                name="district"
                control={control}
                render={({ field: { value, onChange, ref } }) => {
                  return (
                    <Select
                      value={value}
                      onChange={onChange}
                      clearIcon
                      showSearch={false}
                      ref={ref}
                      style={{ width: '100%' }}
                      disabled={!getValues('province')}
                    >
                      {district &&
                        district.map((each) => (
                          <Option
                            value={each.district_id}
                            key={each.district_id}
                          >
                            {each.district_name}
                          </Option>
                        ))}
                    </Select>
                  );
                }}
              />
              {errors && errors?.district && (
                <div className="error-text">
                  {String(errors.district?.message) || 'Có lỗi xảy ra'}
                </div>
              )}
            </>
          }
        />
        <Step
          title={
            <StepTitle>
              Phường <div>*</div>
            </StepTitle>
          }
          description={
            <>
              <Controller
                name="ward"
                control={control}
                render={({ field: { value, onChange, ref } }) => {
                  return (
                    <Select
                      value={value}
                      onChange={onChange}
                      clearIcon
                      showSearch={false}
                      ref={ref}
                      style={{ width: '100%' }}
                      disabled={!getValues('district')}
                    >
                      {ward &&
                        ward.map((each) => (
                          <Option value={each.ward_id} key={each.ward_id}>
                            {each.ward_name}
                          </Option>
                        ))}
                    </Select>
                  );
                }}
              />
              {errors && errors?.ward && (
                <div className="error-text">
                  {String(errors.ward?.message) || 'Có lỗi xảy ra'}
                </div>
              )}
            </>
          }
        />
        <Step
          title={
            <StepTitle>
              Địa chỉ cụ thể <div>*</div>
            </StepTitle>
          }
          description={
            <Controller
              name="address"
              control={control}
              render={({ field: { value, onChange, ref } }) => {
                return (
                  <InputUI
                    ref={ref}
                    placeholder="Địa chỉ"
                    value={value}
                    errors={errors}
                    name="address"
                    onChange={onChange}
                    marginNone="marginNone"
                    disabled={
                      !getValues('province') ||
                      !getValues('district') ||
                      !getValues('ward')
                    }
                  />
                );
              }}
            />
          }
        />
      </Steps>

      <div className="subtitle">Thông tin</div>
      <InfoTitle style={{ marginTop: 30 }}>Họ và tên đệm: </InfoTitle>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <InputUI
              ref={ref}
              value={value}
              errors={errors}
              name="firstName"
              onChange={onChange}
              marginNone="marginNone"
            />
          );
        }}
      />

      <InfoTitle>Tên: </InfoTitle>
      <Controller
        name="lastName"
        control={control}
        render={({ field: { value, onChange, ref } }) => {
          return (
            <InputUI
              ref={ref}
              value={value}
              errors={errors}
              name="lastName"
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

export default memo(UserAddress);
