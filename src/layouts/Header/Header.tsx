import {
  ImportOutlined,
  LeftOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  PlusCircleTwoTone,
  MinusCircleTwoTone
} from '@ant-design/icons';
import { Popover, Result } from 'antd';
import { BellIcon } from 'components/Images/BellIcon';
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
import { useNavigate } from 'react-router-dom';
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
import {
  setCart,
  updateCartActionRequest
} from 'global/common/auth/auth.slice';
import { CART } from 'constants/mock.constants';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  CartItem,
  CursorPointer,
  HeaderContainer,
  IconWrapper,
  ListIconWrapper,
  ScrollableCart
} from './Header.style';
import './Header.style.css';

const Header: FC = () => {
  const uniqueKey = useId();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.auth);
  const [modal, setModal] = useState(false);
  const [userActionModalType, setUserActionModalType] =
    useState<UserActionModalType>(UserActionModalType.NONE);
  const [paymentStep, setPaymentStep] = useState(1);
  const navigate = useNavigate();

  const {
    formState: { errors },
    control,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: ''
    },
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required('Tên người nhận là bắt buộc'),
        address: Yup.string().required('Địa chỉ là bắt buộc')
      })
    )
  });

  const handleOnClickSubmit = useCallback(
    (value: any) => {
      setPaymentStep(3);
      reset();
    },
    [reset]
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
                      {item.price} đ
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
          <InfoTitle>Tên người nhận </InfoTitle>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange, ref } }) => {
              return (
                <InputUI
                  ref={ref}
                  value={value}
                  errors={errors}
                  name="name"
                  onChange={onChange}
                  marginNone="marginNone"
                />
              );
            }}
          />

          <InfoTitle>Địa chỉ người nhận </InfoTitle>
          <Controller
            name="address"
            control={control}
            render={({ field: { value, onChange, ref } }) => {
              return (
                <InputUI
                  ref={ref}
                  value={value}
                  errors={errors}
                  name="address"
                  onChange={onChange}
                  marginNone="marginNone"
                />
              );
            }}
          />

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
                        <span>Số lượng: {item.quantity}</span>
                      </div>
                      <span
                        style={{ fontWeight: '600', color: ColorPalette.red_4 }}
                      >
                        {item.price} đ
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
        title="Xử lý đơn hàng thành công"
        subTitle="Bạn hãy đợi nhân viên của chúng tôi liên lạc trong khoảng thời gian gần nhất"
      />
    );
  }, [cart, control, paymentStep, errors]);

  const handleOnProceedCartModal = useCallback(() => {
    if (paymentStep === 1) {
      return setPaymentStep(2);
    }

    if (paymentStep === 2) {
      // TODO call API
      return handleSubmit(handleOnClickSubmit)();
    }

    setModal(false);
    setPaymentStep(1);
  }, [handleOnClickSubmit, handleSubmit, paymentStep]);

  const renderConfirmCartText = useMemo(() => {
    if (paymentStep === 1) {
      return 'Thanh toán';
    }

    if (paymentStep === 2) {
      return 'Đặt hàng';
    }
    return 'Hoàn tất';
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
          <span>Giỏ hàng</span>
        </FlexBasic>
      ) : (
        <FlexBasic>
          <LeftOutlined
            style={{ fontSize: 15, marginBlock: 'auto', cursor: 'pointer' }}
            onClick={() => setPaymentStep((prev) => prev - 1)}
          />
          <span>Thanh toán</span>
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
        onProceed={() => handleOnProceedCartModal()}
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
    () => (
      <>
        <StackUI
          width={140}
          icon={<LoginOutlined />}
          content="Đăng nhập"
          onClick={() => setUserActionModalType(UserActionModalType.LOG_IN)}
        />
        <StackUI
          width={140}
          icon={<ImportOutlined />}
          content="Đăng ký"
          onClick={() =>
            setUserActionModalType(UserActionModalType.NEW_ACCOUNT)
          }
        />
      </>
    ),
    []
  );

  const renderFormModal = useMemo(() => {
    if (userActionModalType === UserActionModalType.NONE) {
      return null;
    }

    let content: ReactNode;

    switch (userActionModalType) {
      case UserActionModalType.LOG_IN:
        content = <LoginForm />;
        break;
      case UserActionModalType.NEW_ACCOUNT:
        content = <SignUpForm />;
        break;
      case UserActionModalType.PW_RECOVER:
        content = <ForgotPasswordForm />;
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

  useEffect(() => {
    dispatch(setCart({ data: CART }));
  }, [dispatch]);

  return (
    <>
      <HeaderContainer
        key={`${uniqueKey}container`}
        style={{ backgroundColor: ColorPalette.white }}
      >
        <CursorPointer onClick={handleRedirectHome}>
          <Logo blockWidth={150} blockHeight="100%" />
        </CursorPointer>
        <ListIconWrapper>
          <Popover
            trigger="click"
            destroyTooltipOnHide
            key={`${uniqueKey}bell-icon`}
          >
            <IconWrapper className="icon-wrapper">
              <BellIcon blockHeight="100%" blockWidth={20} />
            </IconWrapper>
          </Popover>

          <IconWrapper
            className="icon-wrapper"
            key={`${uniqueKey}cart-icon`}
            onClick={handleClickCart}
          >
            <CartIcon blockHeight="100%" blockWidth={20} />
          </IconWrapper>

          <Popover
            trigger="click"
            destroyTooltipOnHide
            key={`${uniqueKey}user-icon`}
            content={renderPopupAccount}
            className="padding-0"
          >
            <IconWrapper className="icon-wrapper">
              <UserIcon blockHeight="100%" blockWidth={22} />
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
