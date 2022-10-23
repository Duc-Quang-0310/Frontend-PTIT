import { Result } from 'antd';
import ButtonUI from 'components/Button/ButtonUI';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'router/router.paths';

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
          onClick={() => navigate(routerPaths.HOME)}
          content="Về trang chủ"
          style={{ marginInline: 'auto' }}
        />
      }
    />
  );
};

export default NotFound;
