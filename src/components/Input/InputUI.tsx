import Input, { InputProps as AntdInputProps } from 'antd/lib/input/Input';
import { debounce } from 'lodash';
import { ChangeEvent, forwardRef, memo, useCallback, useId } from 'react';
import {
  DefaultContainerInput,
  LabelWrapper,
  RequireText
} from './InputUI.styled';

interface InputProps extends AntdInputProps {
  name: string;
  handleOnChange?: (value: string) => void;
  label?: string;
  containerClassName?: string;
}

const InputUI = forwardRef<any, InputProps>((props, ref) => {
  const {
    name,
    handleOnChange,
    label,
    required,
    containerClassName,
    ...other
  } = props;
  const uniqueKey = useId();

  const handleChangeKeyboard = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const currentValue = String(e.target.value);
      handleOnChange?.(currentValue);
    }),
    [handleOnChange]
  );

  return (
    <DefaultContainerInput className={containerClassName} key={uniqueKey}>
      {label && (
        <LabelWrapper>
          {required && <RequireText>*</RequireText>} {label}
        </LabelWrapper>
      )}
      <Input
        name={name}
        ref={ref}
        allowClear
        required={required}
        onChange={handleChangeKeyboard}
        {...other}
      />
    </DefaultContainerInput>
  );
});

InputUI.displayName = 'Input';
export default memo(InputUI);
