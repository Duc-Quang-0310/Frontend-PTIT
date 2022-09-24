import { Spin } from 'antd';
import { FC, ReactNode, Suspense } from 'react';
import styled from 'styled-components';

const LoadingLayout = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuspenseComp: FC<{ child: ReactNode }> = (props) => {
  return (
    <Suspense
      fallback={
        <LoadingLayout>
          <Spin size="large" />
        </LoadingLayout>
      }
    >
      {props.child}
    </Suspense>
  );
};

export default SuspenseComp;
