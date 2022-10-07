import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const UserSuggestProductContainer = styled.div`
  padding: 100px 200px;

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

  h3 {
    font-size: 40px;
    font-weight: 700;
    color: #090914;
    text-align: center;
    margin-bottom: 30px;
  }

  p {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: ${ColorPalette.gray_6};
  }
`;
