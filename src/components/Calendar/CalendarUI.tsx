import { CalendarProps as AtnDCalendarProps } from 'antd/lib/calendar';
import moment from 'moment';
import { forwardRef } from 'react';
import { Calendar } from 'antd';

interface CalendarProps extends AtnDCalendarProps<moment.Moment> {}

const CalendarUI = forwardRef<any, CalendarProps>((props, ref) => {
  return <Calendar />;
});

CalendarUI.displayName = 'CalendarUI';
export default CalendarUI;
