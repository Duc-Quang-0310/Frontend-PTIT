import { CameraOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { UPDATE } from 'constants/mock.constants';
import { ColorPalette } from 'constants/style.constant';
import { Tab } from 'constants/user.constants';
import { useAppSelector } from 'hooks/redux';
import moment from 'moment';
import { LaptopDetailContainer } from 'pages/ProductDetail/style/LaptopDetail';
import { FC, useEffect, useId, useMemo, useRef, useState } from 'react';
import { avatarUpload } from 'services/client.services';
import Favorite from './components/Favorite';
import PasswordChange from './components/PasswordChange';
import ReceiptHistory from './components/ReceiptHistory';
import UserAddress from './components/UserAddress';
import { Left, Right } from './style/UserProfile.styles';

const UserProfile: FC = () => {
  const uniqueKey = useId();
  const [tab, setTab] = useState<Tab>(Tab.ADDRESS);
  const fileRef = useRef<HTMLInputElement>(null);
  const { profile, user } = useAppSelector((store) => store.auth);
  const [userImgUrl, setUserImgUrl] = useState<string>('');

  const readFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const file = e.target.files[0];
      try {
        const formData = new FormData();
        formData.append('avatar', file, file.name);
        const url = await avatarUpload(formData);
        setUserImgUrl(url);
        notification.success({ message: 'Đăng ảnh thành công' });
      } catch (error) {
        notification.error({ message: 'Đăng ảnh thất bại' });
      }
    }
  };

  const INFO = useMemo(
    () =>
      profile
        ? [
            {
              label: 'Trạng thái:',
              value: 'Hoạt động'
            },
            {
              label: 'Hoạt động:',
              value: moment(profile?.updatedAt).format('Do MMMM YYYY') || UPDATE
            },
            {
              label: 'Tham gia:',
              value: moment(user?.createdAt).format('Do MMMM YYYY') || UPDATE
            },
            {
              label: 'Email:',
              value: user?.email || UPDATE
            }
          ]
        : [],
    [profile, user?.createdAt, user?.email]
  );

  const renderTabMemo = useMemo(() => {
    switch (tab) {
      case Tab.ADDRESS:
        return <UserAddress imageUrl={userImgUrl} />;
      case Tab.CHANGE_PASSWORD:
        return <PasswordChange />;
      case Tab.RECEIPT:
        return <ReceiptHistory />;
      case Tab.FAVORITE:
        return <Favorite />;

      default:
        return null;
    }
  }, [tab, userImgUrl]);

  useEffect(() => {
    setUserImgUrl(
      profile && profile?.avatar
        ? profile?.avatar
        : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    );
  }, [profile]);

  return (
    <LaptopDetailContainer key={uniqueKey}>
      <Left key={`${uniqueKey} - left`}>
        <div className="avatar">
          <img src={userImgUrl} alt="user-avatar" />
          <div className="uploadImg" onClick={() => fileRef?.current?.click()}>
            <CameraOutlined
              style={{
                fontSize: 22,
                color: ColorPalette.white
              }}
            />
            <input
              type="file"
              id="user-avatar"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileRef}
              onChange={(e) => readFile(e)}
            />
          </div>
        </div>

        <div className="info">
          <h3>{`${profile?.firstName} ${profile?.lastName}` || UPDATE}</h3>
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
