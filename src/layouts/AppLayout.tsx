import { FC, useId } from 'react';
import { Outlet } from 'react-router';
import {
  AppLayoutWrapper,
  ContentWrapper,
  MainContent
} from './AppLayout.style';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const AppLayout: FC = () => {
  const uniqueKey = useId();

  return (
    <AppLayoutWrapper key={uniqueKey}>
      <Header />
      <ContentWrapper>
        <Sidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </AppLayoutWrapper>
  );
};

export default AppLayout;
