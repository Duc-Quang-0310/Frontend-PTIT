import Select, {
  SelectProps as AntdDefaultSelectProps,
  DefaultOptionType
} from 'antd/es/select';
import {
  forwardRef,
  useId,
  useState,
  useMemo,
  memo,
  useCallback,
  Dispatch,
  SetStateAction,
  CSSProperties
} from 'react';
import { debounce, size } from 'lodash';
import cn from 'classnames';
import axios from 'axios';
import { AsyncActionCall } from 'constants/select.constant';
import { WarningText } from './SelectUI.style';
import './select-ui.style.css';

interface SelectProps extends AntdDefaultSelectProps<any> {
  selectType: 'sync' | 'async';
  defaultOption: DefaultOptionType[];
  containerClassName?: string;
  readOnly?: boolean;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  requestAsyncType?: AsyncActionCall;
  stylesAttribute?: CSSProperties;
  isRequired?: boolean;
}

const SelectUI = forwardRef<any, SelectProps>((props, ref) => {
  const {
    selectType,
    containerClassName,
    readOnly = false,
    defaultOption,
    value,
    setValue,
    requestAsyncType,
    stylesAttribute,
    isRequired,
    ...other
  } = props;
  const uniqueID = useId();
  const finalizeOptionMemo = useMemo(() => {
    if (!size(defaultOption)) {
      return [];
    }
    return defaultOption.sort((currentValue, compareValue) => {
      if (
        currentValue.label &&
        compareValue.label &&
        currentValue.label < compareValue.label
      ) {
        return -1;
      }
      if (
        currentValue.label &&
        compareValue.label &&
        currentValue.label > compareValue.label
      ) {
        return 1;
      }
      return 0;
    });
  }, [defaultOption]);
  const [options, setOptions] = useState(finalizeOptionMemo);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const handleCallAsyncRequest = useCallback(
    // TODO: Refactor this in the near future to match usage
    async (action: AsyncActionCall, value: string) => {
      switch (action) {
        case AsyncActionCall.TEMP:
          const { data } = await axios.get(
            'https://pokeapi.co/api/v2/pokemon/ditto'
          );
          return Array(data.abilities).map((each) => ({
            value: each.name,
            label: each.name
          }));
        case AsyncActionCall.ACTION_1:
          return [{ label: value }];
        case AsyncActionCall.ACTION_2:
          return [{ label: value }];
        default:
          return [];
      }
    },
    []
  );
  const handleSearch = useCallback(
    debounce(async (value: string) => {
      if (selectType === 'sync') {
        return;
      }
      if (!size(value)) {
        return setOptions(finalizeOptionMemo);
      }
      if (requestAsyncType) {
        setLoading(true);
        const result = await handleCallAsyncRequest(requestAsyncType, value);
        setOptions(result);
        setLoading(false);
      }
    }, 500),
    [selectType, handleCallAsyncRequest]
  );
  const handleOnChangeSearch = useCallback(
    (currentValue: any, option: DefaultOptionType | DefaultOptionType[]) => {
      setSelectedValue(currentValue);
      if (Array.isArray(option)) {
        return null;
      }
      if (typeof value === 'string') {
        return setValue(currentValue);
      }
      if (Array.isArray(value)) {
        const newValue = [...value].map((each) => {
          if (each?.label === option?.label) {
            return {
              ...each,
              value: currentValue,
              label: option?.label
            };
          }
          return each;
        });
        return setValue(newValue);
      }
      return setValue({
        ...value,
        value: currentValue,
        label: option.label
      });
    },
    [value, setValue]
  );
  const statusMemo = useMemo(() => {
    if (!isRequired) {
      return undefined;
    }
    if (selectedValue) {
      return 'warning';
    }
    return '';
  }, [isRequired, selectedValue]);
  return (
    <>
      <Select
        key={uniqueID}
        ref={ref}
        className={cn(containerClassName, 'default-container')}
        showSearch
        allowClear
        disabled={readOnly}
        onSearch={handleSearch}
        options={options}
        optionFilterProp="label"
        onChange={handleOnChangeSearch}
        loading={loading}
        style={stylesAttribute}
        status={statusMemo}
        defaultValue={value}
        {...other}
      />
      {isRequired && !selectedValue && (
        <WarningText>Bạn chưa chọn dữ liệu</WarningText>
      )}
    </>
  );
});
SelectUI.displayName = 'Select UI';
export default memo(SelectUI);
