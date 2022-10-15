import { CameraOutlined } from '@ant-design/icons';
import { ColorPalette } from 'constants/style.constant';
import { Tab } from 'constants/user.constants';
import moment from 'moment';
import { LaptopDetailContainer } from 'pages/ProductDetail/style/LaptopDetail';
import { FC, useId, useMemo, useState } from 'react';
import Favorite from './components/Favorite';
import PasswordChange from './components/PasswordChange';
import ReceiptHistory from './components/ReceiptHistory';
import UserAddress from './components/UserAddress';
import { Left, Right } from './style/UserProfile.styles';

const UserProfile: FC = () => {
  const uniqueKey = useId();
  const [tab, setTab] = useState<Tab>(Tab.ADDRESS);

  const INFO = useMemo(
    () => [
      {
        label: 'Trạng thái:',
        value: 'Hoạt động'
      },
      {
        label: 'Hoạt động:',
        value: moment().format('Do MMMM YYYY')
      },
      {
        label: 'Tham gia:',
        value: moment().format('Do MMMM YYYY')
      },
      {
        label: 'Email:',
        value: 'ducquang03102000@gmail.com'
      }
    ],
    []
  );

  const renderTabMemo = useMemo(() => {
    switch (tab) {
      case Tab.ADDRESS:
        return <UserAddress />;
      case Tab.CHANGE_PASSWORD:
        return <PasswordChange />;
      case Tab.RECEIPT:
        return <ReceiptHistory />;
      case Tab.FAVORITE:
        return <Favorite />;

      default:
        return null;
    }
  }, [tab]);

  return (
    <LaptopDetailContainer key={uniqueKey}>
      <Left key={`${uniqueKey} - left`}>
        <div className="avatar">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="user-avatar"
          />
          <div className="uploadImg">
            <CameraOutlined
              style={{
                fontSize: 22,
                color: ColorPalette.white
              }}
            />
          </div>
        </div>

        <div className="info">
          <h3>Nguyễn Đức Quang</h3>
          {INFO?.map((each) => (
            <div className="block" key={`${uniqueKey} - ${each.label}`}>
              <div className="label">{each.label}</div>
              <span> {each.value}</span>
            </div>
          ))}
        </div>

        <div
          className={`navigator ${tab === Tab.ADDRESS ? 'active' : 'hover'}`}
          onClick={() => setTab(Tab.ADDRESS)}
        >
          Thông tin
        </div>
        <div
          className={`navigator ${
            tab === Tab.CHANGE_PASSWORD ? 'active' : 'hover'
          }`}
          onClick={() => setTab(Tab.CHANGE_PASSWORD)}
        >
          Đổi mật khẩu
        </div>
        <div
          className={`navigator ${tab === Tab.RECEIPT ? 'active' : 'hover'}`}
          onClick={() => setTab(Tab.RECEIPT)}
        >
          Đơn hàng
        </div>
        <div
          className={`navigator ${tab === Tab.FAVORITE ? 'active' : 'hover'}`}
          onClick={() => setTab(Tab.FAVORITE)}
        >
          Yêu thích
        </div>
      </Left>
      <Right key={`${uniqueKey} - right`}>{renderTabMemo}</Right>
    </LaptopDetailContainer>
  );
};

export default UserProfile;
