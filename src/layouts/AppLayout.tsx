import { FC, useId } from 'react';
import { Outlet } from 'react-router';
import { AppLayoutWrapper, ContentWrapper } from './AppLayout.style';
import Header from './Header/Header';

const AppLayout: FC = () => {
  const uniqueKey = useId();

  return (
    <AppLayoutWrapper key={uniqueKey}>
      <Header />
      <ContentWrapper>
        <div
          style={{
            width: '100vw',
            height: '70px'
          }}
        />
        <Outlet />
      </ContentWrapper>
    </AppLayoutWrapper>
  );
};

export default AppLayout;
