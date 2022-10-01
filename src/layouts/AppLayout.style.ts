import styled from 'styled-components';

export const AppLayoutWrapper = styled.div`
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: row;
`;

export const MainContent = styled.div`
  flex-grow: 1;
`;
