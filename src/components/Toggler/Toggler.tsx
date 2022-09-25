import { ColorPalette } from 'constants/style.constant';
import { Dispatch, FC, SetStateAction, useCallback, useId } from 'react';
import { TogglerDrawerWrapper } from './Toggle.style';
import './Toggle.style.css';

interface TogglerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  position?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
  leftToRight?: boolean;
}

const Toggler: FC<TogglerProps> = ({
  isOpen,
  setIsOpen,
  position,
  leftToRight = false
}) => {
  const uniqueKey = useId();
  const handleOnClickToggler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <TogglerDrawerWrapper
      key={uniqueKey}
      onClick={handleOnClickToggler}
      style={{
        top: position?.top,
        left: position?.left,
        right: position?.right,
        bottom: position?.bottom
      }}
    >
      {/* Right To left Arrow */}
      {!leftToRight ? (
        <svg
          viewBox="0 0 20 20"
          className={isOpen ? 'rotate-180-deg' : 'rotate-minus-180deg'}
        >
          <path
            fill={ColorPalette.primary_6}
            d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
          ></path>
        </svg>
      ) : (
        <svg
          viewBox="0 0 20 20"
          className={isOpen ? 'rotate-180-deg' : 'rotate-minus-180deg'}
        >
          <path
            fill={ColorPalette.primary_6}
            d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
          ></path>
        </svg>
      )}
      {/* Left to Right Arrow */}
    </TogglerDrawerWrapper>
  );
};

export default Toggler;
