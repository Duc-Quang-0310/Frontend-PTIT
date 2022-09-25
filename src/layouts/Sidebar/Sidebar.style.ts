import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  min-width: 70px;
  max-width: 180px;
  display: flex;
  flex-direction: row;
  background-color: #e9e9e9;
  width: ${(props) => `${props.itemProp}px`};
  transition: ${(props) =>
    props.itemRef === 'false' ? `width linear 0.2s` : undefined};
`;

export const Resizer = styled.div`
  transition: all ease 0.3s;
  flex-grow: 0;
  flex-shrink: 0;
  justify-self: flex-end;
  cursor: col-resize;
  resize: horizontal;
  flex-basis: 4px;

  :hover {
    background: ${ColorPalette.gray_7};
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  position: relative;
`;
