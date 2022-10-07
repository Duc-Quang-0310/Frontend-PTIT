import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const CompanyFeatureContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 100px 200px;
  flex-wrap: wrap;
  background-color: ${ColorPalette.gray_20};
  @media (max-width: 1500px) {
    padding: 80px 140px;
  }
  @media (max-width: 1400px) {
    padding: 60px 100px;
  }
  @media (max-width: 1300px) {
    padding: 40px 60px;
  }
  @media (max-width: 1210px) {
    padding: 30px 40px;
    justify-content: center;
    align-items: center;
  }
`;

export const LeftBlock = styled.div`
  display: flex;
  flex-direction: column;
  span {
    color: ${ColorPalette.purpleMain};
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

export const PromoteText = styled.div`
  font-size: 52px;
  font-weight: 700;
  color: #090914;
  margin-top: 30px;
  line-height: 60px;
`;

export const RightBlock = styled.div`
  img {
    width: 450px;
    height: 400px;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export const AdditionalContent = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  div {
    width: 50%;
    display: flex;
    flex-direction: row;

    p {
      font-size: 18px;
      font-weight: bold;
      margin-left: 15px;
      margin-bottom: 0 !important;
    }
    span {
      margin-bottom: 0 !important;
    }

    @media (max-width: 1210px) {
      margin-top: 40px;
      margin-bottom: 30px;
    }
  }
`;
