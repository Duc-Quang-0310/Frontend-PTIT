import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const AppointmentDrawerWrapper = styled.div`
  align-self: flex-end;
  transition: all ease-in 0.3s;
  width: ${(props) => `${props.itemProp || '50'}px`};
  display: flex;
  flex-direction: column;
  border-left: 2px solid ${ColorPalette.gray_11};
  border-top: 1px solid ${ColorPalette.gray_11};
  padding: 10px;
  overflow-y: auto;
  z-index: 998 !important;
  position: relative;
  height: 100%;
`;

export const TogglerDrawerWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.div`
  transition: all ease 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: center;

  svg {
    color: ${ColorPalette.gray_10};
  }

  :hover {
    background-color: ${ColorPalette.primary_6};
    svg {
      color: ${ColorPalette.white};
    }
  }
`;

export const ContentAppointmentWrapper = styled.div`
  margin-top: 15px;
`;
