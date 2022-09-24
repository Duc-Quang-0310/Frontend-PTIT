import { debounce } from 'lodash';
import Rate, { RateProps as AntdRateProps } from 'rc-rate/lib/Rate';
import { forwardRef, useCallback } from 'react';

interface RateProps extends AntdRateProps {
  handleOnChangeStar: (star: number) => void;
}

const Rating = forwardRef<any, RateProps>((props, ref) => {
  const { handleOnChangeStar, ...other } = props;
  const handleOnChange = useCallback(
    debounce((value) => {
      handleOnChangeStar(value);
    }),
    []
  );

  return <Rate allowHalf {...other} onChange={handleOnChange} allowClear />;
});

export default Rating;
