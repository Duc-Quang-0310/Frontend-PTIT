import { ImportOutlined, LoginOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
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
  useId,
  useMemo,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserActionModalType } from 'constants/user.constants';
import {
  CursorPointer,
  HeaderContainer,
  IconWrapper,
  ListIconWrapper
} from './Header.style';
import './Header.style.css';

const Header: FC = () => {
  const uniqueKey = useId();
  const [modal, setModal] = useState(false);
  const [userActionModalType, setUserActionModalType] =
    useState<UserActionModalType>(UserActionModalType.NONE);
  const navigate = useNavigate();
  const renderModalCart = useMemo(() => {
    if (!modal) {
      return null;
    }

    return (
      <ModalUI
        open
        modalTitle="Giỏ hàng"
        onCancel={() => setModal(false)}
        modalColorType="purple"
        confirmText="Thanh toán"
      />
    );
  }, [modal]);

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

  return (
    <>
      <HeaderContainer key={`${uniqueKey}container`}>
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
