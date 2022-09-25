import moment from 'moment';
import { DateStatus } from './DatePicker.types';

export const checkDisabledDate = (
  currentDate: moment.Moment,
  typeDate: DateStatus
): boolean => {
  if (typeDate === 'future') return currentDate < moment().endOf('day');

  if (typeDate === 'past') return currentDate > moment().endOf('day');
  return (
    currentDate > moment().endOf('day') && currentDate < moment().endOf('day')
  );
};
