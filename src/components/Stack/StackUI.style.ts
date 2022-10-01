import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const StackUIWrapper = styled.div`
  display: flex;
  padding-block: 10px;
  padding-inline: 12px;
  border-bottom: 1px solid ${ColorPalette.gray_20};
  user-select: none;
  cursor: pointer;
`;

export const StackUIIconWrapper = styled.div`
  width: 30%;
`;

export const StackUIContentWrapper = styled.div`
  flex: 1;
`;
