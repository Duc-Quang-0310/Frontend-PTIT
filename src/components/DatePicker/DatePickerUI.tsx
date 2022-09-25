import { memo, useId, forwardRef } from 'react';
import { DatePicker } from 'antd';
import { PickerDateProps } from 'antd/lib/date-picker/generatePicker';
import moment, { Moment } from 'moment';
import { checkDisabledDate } from './DatePicker.helpers';
import { DateStatus } from './DatePicker.types';

interface DatePickerProps extends PickerDateProps<Moment> {
  dateType?: DateStatus;
  showTimeSelect?: boolean;
}

const DatePickerUI = forwardRef<any, DatePickerProps>((props, ref) => {
  const { dateType = 'default', showTimeSelect, ...other } = props;
  const uniqueID = useId();

  return (
    <DatePicker
      key={uniqueID}
      showTime={
        showTimeSelect && {
          defaultValue: moment('00:00:00', 'HH:mm:ss')
        }
      }
      format={showTimeSelect ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY'}
      disabledDate={(currentDate) => checkDisabledDate(currentDate, dateType)}
      ref={ref}
      {...other}
    />
  );
});

export default memo(DatePickerUI);
