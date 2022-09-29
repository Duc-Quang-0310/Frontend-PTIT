import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background-color: '#dcdcdc';
  height: 70px;
  padding-block: 10px;
  padding-inline: 90px;
  display: flex;
  justify-content: space-between;
`;

export const CursorPointer = styled.div`
  cursor: pointer;
`;

export const ListIconWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ColorPalette.gray_20};
  border-radius: 50%;
  width: 42px;
  height: 42px;
  transition: all ease-in 0.2s;
  cursor: pointer;
`;
