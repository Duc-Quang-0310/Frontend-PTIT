import {
  ReactNode,
  useCallback,
  KeyboardEvent,
  MouseEvent,
  useId,
  forwardRef,
  memo,
  CSSProperties
} from 'react';
import Button from 'antd/es/button';
import { BaseButtonProps } from 'antd/es/button/button';
import LoadingOutlined from '@ant-design/icons/lib/icons/LoadingOutlined';
import {
  LoadingContainer,
  PrefixContainer,
  SuffixContainer
} from './Button.style';

interface ButtonProps extends BaseButtonProps {
  content: string | ReactNode;
  prefixElement?: ReactNode;
  suffixElement?: ReactNode;
  onClick?: (e?: MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (e?: KeyboardEvent<HTMLDivElement>) => void;
  loadingClassName?: string;
  hideBtn?: boolean;
  unSeenBtn?: boolean;
  colorFill?: string;
}

const ButtonUI = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    content,
    prefixElement,
    suffixElement,
    className,
    loading,
    onClick,
    onKeyDown,
    loadingClassName,
    type,
    hideBtn,
    unSeenBtn,
    colorFill,
    ...other
  } = props;
  const btnId = useId();
  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onClick?.(event);
    },
    [onClick]
  );

  return (
    <Button
      {...other}
      disabled={loading as boolean}
      type={type || 'primary'}
      ref={ref}
      key={`antd-btn-${btnId}`}
      style={{
        background: colorFill,
        borderColor: colorFill
      }}
    >
      {loading ? (
        <LoadingContainer key={`loading-${btnId}`}>
          <LoadingOutlined />
          <p>Đang tải</p>
        </LoadingContainer>
      ) : (
        <div
          onClick={(e) => handleOnClick(e)}
          onKeyDown={(e) => onKeyDown?.(e)}
          key={`button-${btnId}`}
        >
          {prefixElement && <PrefixContainer>{prefixElement}</PrefixContainer>}
          {content}
          {suffixElement && <SuffixContainer>{suffixElement}</SuffixContainer>}
        </div>
      )}
    </Button>
  );
});

ButtonUI.displayName = 'Button';
export default memo(ButtonUI);
