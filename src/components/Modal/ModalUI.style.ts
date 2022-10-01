import { ColorPalette } from 'constants/style.constant';
import { renderColorByType } from 'helpers/color';
import styled from 'styled-components';

export const ModalFooterDefaultContainer = styled.div`
  display: flex;
  justify-content: flex-end !important;
  flex-direction: row;
`;

export const ModalHeaderDefaultContainer = styled.div`
  background-color: ${(props) => renderColorByType(props.itemType as any)};
  height: 40px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  padding: 10px 12px;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  color: ${ColorPalette.white};
`;

export const ModalContentDefaultContainer = styled.div`
  padding: 12px;
`;

export const CloseIconContainer = styled.div`
  cursor: pointer;
`;

export const CloseVisibleOnlyContainer = styled.div`
  position: absolute;
  top: 6px;
  right: 10px;
  cursor: pointer;
`;
