import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const LaptopDetailContainer = styled.div`
  background-color: #fafafb;
  padding: 60px 150px;
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100vh - 70px);
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 60%;
  flex-direction: row;
  padding-top: 12px;

  .carousel {
    display: flex;
    gap: 18px;
    flex-direction: column;
    transition: all ease-in-out 0.4s;

    .item {
      width: 120px;
      height: 120px;
      background-color: #dcdcdc;
      border-radius: 10px;
      transition: all ease 0.2s;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .active {
      border: 1px solid black;
    }

    .hideBtn {
      display: none !important;
    }
    .showBtn {
      display: none !important;
      transition: all ease-in-out 0.4s;
    }

    &:hover {
      .showBtn {
        display: block !important;
      }
    }
  }

  .imageHero {
    margin-left: 20px;
    width: 100%;
    height: 580px;
    background-color: #dcdcdc;
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const DetailInfoContainer = styled.div`
  flex: 1;
  margin-left: 50px;

  h4,
  h3 {
    font-weight: bold;
    font-size: 28px;
  }

  h4 {
    margin-bottom: 20px;
  }
`;

export const AdditionalInfoContainer = styled.div`
  width: 60%;
  transform: translateY(-35px);
`;

export const FlexBasic = styled.div`
  display: flex;
  gap: 20px;
`;

export const ListGuarantee = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  margin-top: 30px;
  gap: 9px;

  div {
    display: flex;
    gap: 10px;

    span {
      font-size: 15px;
      color: ${ColorPalette.gray_5};
    }
  }
`;

export const InfoBodyWrapper = styled.div`
  p {
    font-weight: bold;
    font-size: 16px;
  }

  ul {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    color: ${ColorPalette.gray_7};
    font-size: 16px;
    transition: all ease-in 0.3s;
  }
`;

export const Badge = styled.span`
  padding: 3px !important;
  background-color: ${ColorPalette.gray_6};
  color: white !important;
  border-radius: 20px;
  font-size: 12px !important;
`;

export const LaptopListImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;

  .imgHero {
    width: 500px;
    height: 500px;
    background-color: #dcdcdc;

    .currentImg {
      transition: all ease-in 0.3s !important;
    }
  }

  .imgList {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;

    .imgItem {
      width: 120px;
      height: 120px;
      cursor: pointer;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .active {
      border: 1px solid black;
    }
  }
`;

export const CommentBlock = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid ${ColorPalette.gray_15};
`;

export const InputBlock = styled.div`
  padding-bottom: 13px;
  border-bottom: 1px solid ${ColorPalette.gray_15};
  h3 {
    font-weight: 600;
    margin-bottom: 13px;
  }
`;
