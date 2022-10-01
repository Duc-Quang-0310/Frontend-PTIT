import Input, { InputProps as AntdInputProps } from 'antd/lib/input/Input';
import { forwardRef, memo, useId } from 'react';
import {
  DefaultContainerInput,
  LabelWrapper,
  RequireText
} from './InputUI.styled';

interface InputProps extends AntdInputProps {
  label?: string;
  containerClassName?: string;
}

const InputUI = forwardRef<any, InputProps>((props, ref) => {
  const { label, required, containerClassName, ...other } = props;
  const uniqueKey = useId();

  return (
    <DefaultContainerInput className={containerClassName} key={uniqueKey}>
      {label && (
        <LabelWrapper>
          {required && <RequireText>*</RequireText>} {label}
        </LabelWrapper>
      )}
      <Input ref={ref} allowClear required={required} {...other} />
    </DefaultContainerInput>
  );
});

InputUI.displayName = 'Input';
export default memo(InputUI);
