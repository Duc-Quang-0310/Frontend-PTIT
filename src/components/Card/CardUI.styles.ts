import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  border-radius: 15px;
  height: 260px;
  -webkit-box-shadow: 12px 1px 14px 4px rgba(118, 118, 118, 0.27);
  box-shadow: 12px 1px 14px 4px rgba(118, 118, 118, 0.27);
  overflow: hidden;
  width: 100%;
  cursor: pointer;
`;

export const Img = styled.img`
  height: 100%;
  width: 37%;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const CardTitle = styled.h2`
  font-weight: 700;
  font-size: 19px;
  color: ${ColorPalette.gray_2};
`;

export const CardBody = styled.p`
  font-size: 13px;
  color: ${ColorPalette.gray_7};
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

export const ViewMoreWrap = styled.div`
  display: flex;
  border-top: 1px solid ${ColorPalette.gray_11};
  padding-top: 15px;
  justify-content: space-between;
`;

export const InfoWrap = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;

  span {
    cursor: pointer;
    color: ${ColorPalette.gray_3_1};
    font-weight: 500;
  }
`;

export const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.itemProp};
  display: flex;
  justify-content: center;
`;
