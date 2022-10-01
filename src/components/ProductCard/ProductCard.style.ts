import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const ProductCardContainer = styled.div`
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  -webkit-box-shadow: 12px 1px 14px 4px rgba(118, 118, 118, 0.27);
  box-shadow: 12px 1px 14px 4px rgba(118, 118, 118, 0.27);
  height: 330px;
`;

export const ImageWrap = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  display: flex;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BadgeType = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ColorPalette.white};
  font-weight: 600;
  font-size: 13px;
  background-color: ${(props) => {
    if (props.itemProp === 'new') {
      return ColorPalette.gray_3_1;
    }
    return ColorPalette.gray_9;
  }};
  opacity: 0.9;
`;

export const ContentWrap = styled.div`
  padding-inline: 15px;
  padding-block: 12px;
  display: flex;
  flex-direction: column;
`;

export const TextClampOneLine = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
`;

export const PriceContainer = styled.div`
  font-weight: 400;
`;
