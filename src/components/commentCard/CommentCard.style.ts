import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const CommentCardContainer = styled.div`
  width: 100%;
  display: flex;
  height: 200px;
`;

export const ImageWrapper = styled.div`
  border-radius: 20px;
  height: 100%;
  width: 215px;
  overflow: hidden;
  display: flex;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentWrapper = styled.div`
  padding-inline: 30px;
  padding-block: 8px;
  display: flex;
  flex: 1;
  div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row !important;
`;
export const BoldTitle = styled.span`
  font-weight: 700;
  color: ${ColorPalette.gray_5};
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BoldAuthor = styled.span`
  font-weight: 700;
  color: ${ColorPalette.gray_5};
  font-size: 14px;
`;

export const DateTitle = styled.span`
  font-weight: 400;
  color: ${ColorPalette.gray_7};
  font-size: 12px;
`;
