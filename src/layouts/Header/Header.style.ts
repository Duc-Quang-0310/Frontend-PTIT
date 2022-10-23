import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background-color: '#dcdcdc';
  height: 70px;
  padding-block: 10px;
  padding-inline: 90px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100vw;
  z-index: 999;
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
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CartItem = styled.div`
  display: flex;
  margin-bottom: 25px;

  .imgContainer {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .contentContainer {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;

    h5 {
      color: ${ColorPalette.gray_3};
      font-weight: 600;
      font-size: 16px;
    }

    .footer {
      border-top: 1px solid ${ColorPalette.gray_10};
      padding-top: 8px;
      margin-top: auto;
    }
  }
`;

export const ScrollableCart = styled.div`
  max-height: ${(props) => props.itemProp || '350px'};
  overflow: auto;
  padding-right: 20px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 7px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${ColorPalette.purpleMain};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:active {
    background: ${ColorPalette.purpleMain};
  }
`;
