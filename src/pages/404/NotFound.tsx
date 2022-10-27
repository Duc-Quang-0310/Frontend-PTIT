import { Result } from 'antd';
import ButtonUI from 'components/Button/ButtonUI';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang mà bạn đang điều hướng không tồn tại"
      extra={
        <ButtonUI
          type="primary"
          onClick={() => navigate('/')}
          content="Về trang chủ"
          style={{ marginInline: 'auto' }}
        />
      }
    />
  );
};

export default NotFound;
