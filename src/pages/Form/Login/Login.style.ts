import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-block: 30px;
`;

export const BasicFlex = styled.div`
  display: flex;
  gap: 10;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 0 !important;
    margin-right: 15px;
    font-size: 25px;
    font-weight: 700;
    color: ${ColorPalette.gray_4};
  }
`;

export const TextUserDoing = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${ColorPalette.gray_4};
  margin-block: 100;
  text-align: center;
`;

export const LoginFormContainer = styled.form`
  width: 65%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const AnotherOptionContainer = styled.div`
  text-align: center;
  span {
    color: ${ColorPalette.purpleMain};
    font-weight: 700;
    margin-left: 6px;
    cursor: pointer;
  }
`;

export const ErrorAPIBox = styled.div`
  width: 61%;
  border-radius: 10px;
  text-align: center;
  background-color: ${(props) => {
    if (props.itemProp === 'success') {
      return ColorPalette.green_3;
    }
    return ColorPalette.red_5;
  }};
  color: ${ColorPalette.white};
  padding-block: 10px;
  font-weight: bold;
`;
