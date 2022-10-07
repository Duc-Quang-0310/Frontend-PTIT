import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const WhyChooseUsContainer = styled.div`
  background-color: ${ColorPalette.gray_20};
  padding: 100px 20px;
  @media (max-width: 1500px) {
    padding: 80px 20px;
  }
  @media (max-width: 1400px) {
    padding: 60px 20px;
  }
  @media (max-width: 1300px) {
    padding: 40px 20px;
  }
  @media (max-width: 1210px) {
    padding: 30px 10px;
  }
`;

export const Inner = styled.div`
  background-color: ${ColorPalette.white};
  padding-block: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h3 {
    text-align: center;
    padding-top: 50px;
    padding-bottom: 40px;
    font-size: 30px;
    font-weight: bold;
  }
`;

export const IconBackground = styled.div`
  background-color: ${ColorPalette.gray_5} !important;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 !important;
`;

export const TextCenter = styled.div`
  text-align: center;
  margin-bottom: 0 !important;
`;
