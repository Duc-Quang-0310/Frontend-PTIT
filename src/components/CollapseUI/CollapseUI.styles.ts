import { ColorPalette } from 'constants/style.constant';
import styled from 'styled-components';

export const CollapseUIWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  user-select: none;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    transition: all ease 0.2s;
    padding: 14px 15px;
    border-top: 1px solid ${ColorPalette.gray_11};
    border-left: 1px solid ${ColorPalette.gray_11};
    border-right: 1px solid ${ColorPalette.gray_11};
    border-bottom: ${(props) => {
      if (props.itemProp === 'true') {
        return undefined;
      }

      return `1px solid ${ColorPalette.gray_11}`;
    }};
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    border-bottom-left-radius: ${(props) => {
      if (props.itemProp === 'true') {
        return undefined;
      }

      return '7px';
    }};
    border-bottom-right-radius: ${(props) => {
      if (props.itemProp === 'true') {
        return undefined;
      }

      return '7px';
    }};

    background-color: ${(props) => {
      if (props.itemProp === 'true') {
        return ColorPalette.purpleMain;
      }

      return ColorPalette.white;
    }};

    color: ${(props) => {
      if (props.itemProp === 'true') {
        return ColorPalette.white;
      }

      return ColorPalette.gray_3;
    }};
  }

  .transition {
    transition: all ease 0.4s;
    overflow: hidden;
  }

  .display {
    transition: all ease 0.4s;
    min-height: 100px;
    padding: 15px;
    border-left: 1px solid ${ColorPalette.gray_11};
    border-right: 1px solid ${ColorPalette.gray_11};
    border-bottom: 1px solid ${ColorPalette.gray_11};
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  .hide {
    display: none;
    height: 1px;
  }
`;
