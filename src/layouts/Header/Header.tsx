import {
  ImportOutlined,
  LeftOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  PlusCircleTwoTone,
  MinusCircleTwoTone,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { notification, Popover, Result, Badge } from 'antd';
import { CartIcon } from 'components/Images/CartIcon';
import { Logo } from 'components/Images/Logo';
import UserIcon from 'components/Images/UserIcon';
import ModalUI from 'components/Modal/ModalUI';
import StackUI from 'components/Stack/StackUI';
import ForgotPasswordForm from 'pages/Form/Forgot-password/ForgotPasswordForm';
import SignUpForm from 'pages/Form/Sign-up/SignUpForm';
import LoginForm from 'pages/Form/Login/LoginForm';
import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EmptyUI from 'components/Empty/EmptyUI';
import { ColorPalette } from 'constants/style.constant';
import { FlexBasic } from 'pages/ProductDetail/style/LaptopDetail';
import { InfoTitle } from 'pages/profile/style/UserProfile.styles';
import InputUI from 'components/Input/InputUI';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import { UserActionModalType } from 'constants/user.constants';
import { phoneRegExp } from 'constants/mock.constants';
import { paymentBill } from 'services/client.services';
import { sumUpTotalPrice } from 'helpers/price';
import {
  getDistrictActionRequest,
  getProvinceActionRequest,
  getWardActionRequest,
  resetAuthState,
  setCart,
  updateCartActionRequest
} from 'global/common/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { routerPaths } from 'router/router.paths';
import {
  CartItem,
  CursorPointer,
  HeaderContainer,
  IconWrapper,
  ListIconWrapper,
  PageNavigation,
  ScrollableCart
} from './Header.style';
import './Header.style.css';

const Header: FC = () => {
  const uniqueKey = useId();
  const dispatch = useAppDispatch();
  const { cart, profile, province, district, ward, user } = useAppSelector(
    (store) => store.auth
  );
  const [modal, setModal] = useState(false);
  const [userActionModalType, setUserActionModalType] =
    useState<UserActionModalType>(UserActionModalType.NONE);
  const [paymentStep, setPaymentStep] = useState(1);
  const navigate = useNavigate();

  const priceInTotal = useMemo(() => sumUpTotalPrice(cart), [cart]);

  const { pathname } = useLocation();

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset,
    setValue
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
      telephone: ''
    },
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required('T??n ng?????i nh???n l?? b???t bu???c'),
        address: Yup.string().required('?????a ch??? l?? b???t bu???c'),
        telephone: Yup.string().matches(
          phoneRegExp,
          'S??? ??i???n tho???i kh??ng ?????t y??u c???u'
        )
      })
    )
  });

  const handleOnClickSubmit = useCallback(
    async (value: any) => {
      try {
        await paymentBill({
          userId: String(user?._id),
          address: value.address,
          cash: priceInTotal,
          items: cart.map((each) => each.id),
          lastModify: new Date(),
          telephone: value.telephone,
          quantity: cart.map((each) => each.quantity)
        });

        setPaymentStep(3);
      } catch (error) {
        notification.error({
          message: 'C?? l???i x???y ra khi x??? l?? thanh to??n',
          duration: 2
        });
      }
    },
    [cart, priceInTotal, user?._id]
  );

  const renderContentByStep = useMemo(() => {
    if (cart.length === 0) {
      return <EmptyUI />;
    }

    if (paymentStep === 1) {
      return (
        <ScrollableCart>
          {cart?.map((item, index) => (
            <CartItem key={item.quantity + index + item.price}>
              <div className="imgContainer">
                <img src={item.img} alt={item.name} />
              </div>

              <div className="contentContainer">
                <h5>{item.name}</h5>
                <div className="footer">
                  <FlexBetween>
                    <div className="btnCombination">
                      <PlusCircleTwoTone
                        twoToneColor={ColorPalette.green_16}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          dispatch(
                            updateCartActionRequest({
                              id: item.id,
                              actionType: 'add'
                            })
                          )
                        }
                      />
                      <span>{item.quantity}</span>
                      <MinusCircleTwoTone
                        twoToneColor={ColorPalette.red_11}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          dispatch(
                            updateCartActionRequest({
                              id: item.id,
                              actionType: 'minus'
                            })
                          )
                        }
                      />
                    </div>
                    <span
                      style={{ fontWeight: '600', color: ColorPalette.red_4 }}
                    >
                      {item.price} ??
                    </span>
                  </FlexBetween>
                </div>
              </div>
            </CartItem>
          ))}
        </ScrollableCart>
      );
    }

    if (paymentStep === 2) {
      return (
        <div>
          <InfoTitle>
            T??n ng?????i nh???n
            <span>*</span>
          </InfoTitle>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange, ref } }) => {
              return (
                <>
                  <InputUI
                    ref={ref}
                    value={value}
                    name="name"
                    onChange={onChange}
                    marginNone="marginNone"
                  />
                  {errors && errors?.name && (
                    <div className="error-text">
                      {String(errors?.name?.message)}
                    </div>
                  )}
                </>
              );
            }}
          />

          <InfoTitle>
            ?????a ch??? ng?????i nh???n
            <span>*</span>
          </InfoTitle>
          <Controller
            name="address"
            control={control}
            render={({ field: { value, onChange, ref } }) => {
              return (
                <>
                  <InputUI
                    ref={ref}
                    value={value}
                    name="address"
                    onChange={onChange}
                    marginNone="marginNone"
                  />
                  {errors && errors?.address && (
                    <div className="error-text">
                      {String(errors?.address?.message)}
                    </div>
                  )}
                </>
              );
            }}
          />

          <InfoTitle>
            S??? ??i???n tho???i
            <span>*</span>
          </InfoTitle>
          <Controller
            name="telephone"
            control={control}
            render={({ field: { value, onChange, ref } }) => {
              return (
                <>
                  <InputUI
                    ref={ref}
                    value={value}
                    name="telephone"
                    onChange={onChange}
                    marginNone="marginNone"
                  />
                  {errors && errors?.telephone && (
                    <div className="error-text">
                      {String(errors?.telephone?.message)}
                    </div>
                  )}
                </>
              );
            }}
          />

          <InfoTitle>
            T???ng gi?? ti???n:
            <strong>{priceInTotal}</strong>
          </InfoTitle>

          <ScrollableCart itemProp="250px" style={{ marginTop: 25 }}>
            {cart?.map((item, index) => (
              <CartItem key={item.quantity + index}>
                <div className="imgContainer">
                  <img src={item.img} alt={item.name} />
                </div>

                <div className="contentContainer">
                  <h5>{item.name}</h5>
                  <div className="footer">
                    <FlexBetween>
                      <div className="btnCombination">
                        <span>S??? l?????ng: {item.quantity}</span>
                      </div>
                      <span
                        style={{ fontWeight: '600', color: ColorPalette.red_4 }}
                      >
                        {item.price}
                      </span>
                    </FlexBetween>
                  </div>
                </div>
              </CartItem>
            ))}
          </ScrollableCart>
        </div>
      );
    }

    return (
      <Result
        status="success"
        title="X??? l?? ????n h??ng th??nh c??ng"
        subTitle="B???n h??y ?????i nh??n vi??n c???a ch??ng t??i li??n l???c trong kho???ng th???i gian g???n nh???t"
      />
    );
  }, [cart, paymentStep, dispatch, control, priceInTotal, errors]);

  const handleOnProceedCartModal = useCallback(async () => {
    if (paymentStep === 1) {
      return setPaymentStep(2);
    }

    if (paymentStep === 2) {
      return handleSubmit(handleOnClickSubmit)();
    }

    if (paymentStep === 3) {
      dispatch(setCart({ data: [] }));
    }

    setModal(false);
    setPaymentStep(1);
  }, [dispatch, handleOnClickSubmit, handleSubmit, paymentStep]);

  const renderConfirmCartText = useMemo(() => {
    if (paymentStep === 1) {
      return 'Thanh to??n';
    }

    if (paymentStep === 2) {
      return '?????t h??ng';
    }
    return 'Ho??n t???t';
  }, [paymentStep]);

  const renderModalCartTitle = useMemo(
    () =>
      paymentStep === 1 ? (
        <FlexBasic>
          <ShoppingCartOutlined
            style={{
              fontSize: 15,
              marginBlock: 'auto'
            }}
          />
          <span>Gi??? h??ng</span>
        </FlexBasic>
      ) : (
        <FlexBasic>
          <LeftOutlined
            style={{ fontSize: 15, marginBlock: 'auto', cursor: 'pointer' }}
            onClick={() => setPaymentStep((prev) => prev - 1)}
          />
          <span>Thanh to??n</span>
        </FlexBasic>
      ),
    [paymentStep]
  );

  const renderModalCart = useMemo(() => {
    if (!modal) {
      return null;
    }

    return (
      <ModalUI
        open
        modalTitle={renderModalCartTitle}
        onCancel={() => {
          setModal(false);
          setPaymentStep(1);
          reset();
        }}
        modalColorType="purple"
        confirmText={renderConfirmCartText}
        disableConfirm={!cart.length}
        content={renderContentByStep}
        onProceed={async () => handleOnProceedCartModal()}
      />
    );
  }, [
    cart.length,
    handleOnProceedCartModal,
    modal,
    renderConfirmCartText,
    renderContentByStep,
    renderModalCartTitle,
    reset
  ]);

  const renderPopupAccount = useMemo(
    () =>
      !profile ? (
        <>
          <StackUI
            width={140}
            icon={<LoginOutlined />}
            content="????ng nh???p"
            onClick={() => setUserActionModalType(UserActionModalType.LOG_IN)}
          />
          <StackUI
            width={140}
            icon={<ImportOutlined />}
            content="????ng k??"
            onClick={() =>
              setUserActionModalType(UserActionModalType.NEW_ACCOUNT)
            }
          />
        </>
      ) : (
        <>
          <StackUI
            width={140}
            icon={<LogoutOutlined />}
            content="????ng xu???t"
            onClick={() => {
              dispatch(resetAuthState());
              navigate('/');
            }}
          />
          <StackUI
            width={140}
            icon={<UserOutlined />}
            content="Th??ng tin ng?????i d??ng"
            onClick={() => navigate(routerPaths.USER_PROFILE(profile._id))}
          />
        </>
      ),
    [dispatch, navigate, profile]
  );

  const renderFormModal = useMemo(() => {
    if (userActionModalType === UserActionModalType.NONE) {
      return null;
    }

    let content: ReactNode;

    switch (userActionModalType) {
      case UserActionModalType.LOG_IN:
        content = <LoginForm setUserActionModalType={setUserActionModalType} />;
        break;
      case UserActionModalType.NEW_ACCOUNT:
        content = (
          <SignUpForm setUserActionModalType={setUserActionModalType} />
        );
        break;
      case UserActionModalType.PW_RECOVER:
        content = (
          <ForgotPasswordForm setUserActionModalType={setUserActionModalType} />
        );
        break;

      default:
        break;
    }

    return (
      <ModalUI
        open
        modalTitle="none"
        footer={<div />}
        notDisplayTitle
        content={content}
        onCancel={() => setUserActionModalType(UserActionModalType.NONE)}
      />
    );
  }, [userActionModalType]);

  const handleClickCart = useCallback(() => {
    setModal(true);
  }, []);

  const handleRedirectHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleSetDataForUserOnCart = useCallback(() => {
    if (profile) {
      setValue('name', `${profile?.firstName} ${profile?.lastName}` || '');
      if (
        profile?.address &&
        profile?.province &&
        profile?.district &&
        profile?.ward &&
        province &&
        district &&
        ward
      ) {
        const currentProvince = province.find(
          (each) => each.province_id === profile?.province
        );

        const currentDistrict = district.find(
          (each) => each.district_id === profile?.district
        );

        const currentWard = ward.find((each) => each.ward_id === profile?.ward);

        const address = `${profile?.address}, ${currentWard?.ward_name}, ${currentDistrict?.district_name}, ${currentProvince?.province_name}`;
        setValue('address', address);
      } else {
        setValue('address', '');
      }
    }
  }, [district, profile, province, setValue, ward]);

  useEffect(() => {
    if (paymentStep && paymentStep === 2) {
      handleSetDataForUserOnCart();
    }
  }, [handleSetDataForUserOnCart, paymentStep]);

  useEffect(() => {
    handleSetDataForUserOnCart();
  }, [handleSetDataForUserOnCart]);

  useEffect(() => {
    dispatch(getProvinceActionRequest());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.district) {
      dispatch(
        getDistrictActionRequest({ provinceId: String(profile.province) })
      );
    }

    if (profile?.ward) {
      dispatch(getWardActionRequest({ districtId: String(profile.district) }));
    }
  }, [dispatch, profile]);

  return (
    <>
      <HeaderContainer
        key={`${uniqueKey}container`}
        style={{ backgroundColor: ColorPalette.white }}
      >
        <CursorPointer onClick={handleRedirectHome}>
          <Logo blockWidth={150} blockHeight="100%" />
        </CursorPointer>
        <PageNavigation>
          <span
            className={pathname === '/' ? 'active' : ''}
            onClick={() => navigate(routerPaths.HOME)}
          >
            Trang ch???
          </span>
          <span
            className={pathname.includes('/laptop') ? 'active' : ''}
            onClick={() => navigate(routerPaths.PRODUCT_LIST)}
          >
            S???n ph???m
          </span>

          {profile && (
            <span
              className={pathname.includes('user') ? 'active' : ''}
              onClick={() => navigate(routerPaths.USER_PROFILE(profile._id))}
            >
              C?? nh??n
            </span>
          )}
        </PageNavigation>
        <ListIconWrapper>
          {profile && (
            <Badge count={cart?.length || 0} size="small" offset={[-3, 7]}>
              <IconWrapper
                className="icon-wrapper"
                key={`${uniqueKey}cart-icon`}
                onClick={handleClickCart}
              >
                <CartIcon blockHeight="100%" blockWidth={20} />
              </IconWrapper>
            </Badge>
          )}

          <Popover
            trigger="click"
            destroyTooltipOnHide
            key={`${uniqueKey}user-icon`}
            content={renderPopupAccount}
            className="padding-0"
          >
            <IconWrapper className="icon-wrapper">
              {profile && profile?.avatar ? (
                <img src={profile?.avatar} alt={profile?.avatar} />
              ) : (
                <UserIcon blockHeight="100%" blockWidth={22} />
              )}
            </IconWrapper>
          </Popover>
        </ListIconWrapper>
      </HeaderContainer>
      {renderModalCart}
      {renderFormModal}
    </>
  );
};

export default memo(Header);
