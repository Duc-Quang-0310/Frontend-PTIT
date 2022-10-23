import { FC, ReactNode } from 'react';
import {
  StackUIContentWrapper,
  StackUIIconWrapper,
  StackUIWrapper
} from './StackUI.style';
import './StackUI.style.css';

interface StackUIProps {
  icon: ReactNode;
  content: ReactNode;
  width: number | string;
  onClick: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const StackUI: FC<StackUIProps> = ({ content, icon, width, onClick }) => {
  return (
    <StackUIWrapper
      style={{ width }}
      className="content-wrapper"
      onClick={(e) => onClick(e)}
    >
      <StackUIIconWrapper>{icon}</StackUIIconWrapper>
      <StackUIContentWrapper>{content}</StackUIContentWrapper>
    </StackUIWrapper>
  );
};

export default StackUI;
