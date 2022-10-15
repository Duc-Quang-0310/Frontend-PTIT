import { Empty } from 'antd';
import React, { FC } from 'react';

interface EmptyUIProps {
  height?: string | number;
}

const EmptyUI: FC<EmptyUIProps> = ({ height = '500px' }) => {
  return (
    <div
      style={{
        height,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      />
    </div>
  );
};

export default EmptyUI;
