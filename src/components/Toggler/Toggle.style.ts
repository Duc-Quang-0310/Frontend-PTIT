import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const TogglerDrawerWrapper = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  position: absolute;
  z-index: 999 !important;
  border: 2px solid ${ColorPalette.primary_6};
  background-color: ${ColorPalette.white};

  svg {
    transition: all ease-in 0.3s;
  }
`;
