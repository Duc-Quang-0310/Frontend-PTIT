import { Spin } from 'antd';
import { FC, Suspense } from 'react';
import styled from 'styled-components';

const LoadingLayout = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuspenseComp: FC = (props: any) => {
  return (
    <Suspense
      fallback={
        <LoadingLayout>
          <Spin size="large" />
        </LoadingLayout>
      }
    >
      {props.children}
    </Suspense>
  );
};

export default SuspenseComp;
