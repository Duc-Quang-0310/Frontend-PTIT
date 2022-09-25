import { forwardRef, memo, useId } from 'react';
import { DatePicker } from 'antd';
import { RangePickerDateProps } from 'antd/lib/date-picker/generatePicker';
import moment, { Moment } from 'moment';
import { checkDisabledDate } from './DatePicker.helpers';
import { DateStatus } from './DatePicker.types';
import './RangePicker.styles.css';

const { RangePicker } = DatePicker;

interface RangePickerProps extends RangePickerDateProps<Moment> {
  dateType?: DateStatus;
}

const RangePickerUI = forwardRef<any, RangePickerProps>((props, ref) => {
  const { dateType = 'default', ...other } = props;
  const uniqueID = useId();

  return (
    <RangePicker
      key={uniqueID}
      ranges={{
        'Hôm nay': [moment(), moment()]
      }}
      format={'DD/MM/YYYY'}
      disabledDate={(currentDate) => checkDisabledDate(currentDate, dateType)}
      ref={ref}
      {...other}
    />
  );
});

export default memo(RangePickerUI);
