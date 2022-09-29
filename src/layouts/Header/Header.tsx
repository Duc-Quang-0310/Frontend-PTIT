import { ImportOutlined, LoginOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { BellIcon } from 'components/Images/BellIcon';
import { CartIcon } from 'components/Images/CartIcon';
import { Logo } from 'components/Images/Logo';
import UserIcon from 'components/Images/UserIcon';
import ModalUI from 'components/Modal/ModalUI';
import StackUI from 'components/Stack/StackUI';
import { FC, memo, useCallback, useId, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        content=""
      />
    );
  }, [modal]);

  const renderPopupAccount = useMemo(
    () => (
      <>
        <StackUI width={140} icon={<LoginOutlined />} content="Đăng nhập" />
        <StackUI width={140} icon={<ImportOutlined />} content="Đăng ký" />
      </>
    ),
    []
  );

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
    </>
  );
};

export default memo(Header);
