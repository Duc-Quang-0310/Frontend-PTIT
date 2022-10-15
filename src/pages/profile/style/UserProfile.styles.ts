import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const Left = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar {
    width: 300px;
    height: 300px;
    position: relative;
    margin-bottom: 30px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .uploadImg {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      bottom: 0;
      right: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${ColorPalette.purle_classic};
      cursor: pointer;
    }
  }

  .info {
    padding-block: 20px;
    width: 100%;
    background-color: ${ColorPalette.white};
    border-radius: 12px;
    margin-bottom: 30px;

    h3 {
      color: ${ColorPalette.purpleMain};
      font-weight: bold;
      font-size: 22px;
      text-align: center;
    }

    .block {
      display: flex;
      padding: 17px 20px;
      border-bottom: 1px solid ${ColorPalette.gray_15};
      align-items: center;

      .label {
        width: 35%;
        font-size: 16px;
        font-weight: bold;
      }

      span {
        font-size: 16px;
      }
    }
  }

  .navigator {
    width: 100%;
    padding-block: 20px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    background-color: white;
    letter-spacing: 0.2px;
    display: flex;
    justify-content: center;
    border-radius: 15px;
    cursor: pointer;
    transition: all ease 0.3s;
  }

  .hover:hover {
    border-left: 5px solid ${ColorPalette.purpleMain};
    border-top: 5px solid ${ColorPalette.purpleMain};
  }

  .active {
    background-color: ${ColorPalette.purpleMain};
    color: white;
  }
`;

export const Right = styled.div`
  flex: 1;
`;

export const RightContentWrapper = styled.div`
  padding-inline: 35px;

  h3 {
    font-size: 28px;
    font-weight: 700;
    color: ${ColorPalette.purpleMain};
    text-align: center;
    margin-top: 15px;
    margin-bottom: 40px;
  }

  .subtitle {
    width: 100%;
    background-color: ${ColorPalette.purpleMain};
    color: white;
    padding-block: 10px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const StepTitle = styled.span`
  color: ${ColorPalette.gray_3};
  font-size: 17px;
  font-weight: 600;
  display: flex;
  gap: 5px;

  div {
    color: ${ColorPalette.red_4};
    font-size: 17px;
    font-weight: 600;
  }
`;

export const InfoTitle = styled.div`
  color: ${ColorPalette.gray_3};
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 15px;
`;

export const BillInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  font-size: 16px;

  .title {
    width: 150px;
    font-weight: 600;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  .img {
    width: 250px;
    height: 150px;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .title {
    font-size: 18px;
    font-weight: 600;
  }

  .margin-top-auto {
    margin-top: auto;
  }
`;

export const Scrollable = styled.div`
  max-height: 320px;
  overflow: auto;

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
