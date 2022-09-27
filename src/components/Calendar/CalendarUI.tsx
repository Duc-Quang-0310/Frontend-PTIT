import { Moment } from 'moment';
import { FC, memo, useCallback, useId, useState } from 'react';
import { CalendarProps as AntDCalendarProps } from 'antd/lib/calendar';
import { Alert, Calendar, Col, Row, Select } from 'antd';
import moment from 'helpers/moment';
import DatePickerUI from 'components/DatePicker/DatePickerUI';
import { CalenderHeader } from './Calendar.styled';
import './Calendar.styles.css';

interface CalendarProps extends AntDCalendarProps<Moment> {}

const CalendarUI: FC<CalendarProps> = (props) => {
  const { defaultValue = moment(), ...other } = props;
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const uniqueKey = useId();

  const handleSelectDay = (currenDate: Moment) => {
    setSelectedValue(currenDate);
  };

  const handleChangeDatePicker = useCallback((currenDate: Moment | null) => {
    if (currenDate) setSelectedValue(currenDate);
  }, []);

  const customizeHeader = useCallback(
    (value: moment.Moment, onChange: (date: moment.Moment) => void) => {
      const monthIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const monthOptions: JSX.Element[] = [];
      const current = value.clone();
      const localeData = value.localeData();
      const month = value.month();

      monthIndex.forEach((item) => {
        current.month(item);
        const currenMonth = localeData.monthsShort(current);
        monthOptions.push(
          <Select.Option key={item} value={item}>
            {currenMonth}
          </Select.Option>
        );
      });

      const handleChangeMonthSelect = (newMonth: number) => {
        const now = value.clone().month(newMonth);
        onChange(now);
      };

      return (
        <CalenderHeader>
          <DatePickerUI
            allowClear={false}
            value={selectedValue}
            onChange={handleChangeDatePicker}
          />
          <Row gutter={8}>
            <Col>
              <Select
                dropdownMatchSelectWidth={false}
                value={month}
                onChange={handleChangeMonthSelect}
              >
                {monthOptions}
              </Select>
            </Col>
          </Row>
        </CalenderHeader>
      );
    },
    [handleChangeDatePicker, selectedValue]
  );

  return (
    <>
      <Alert
        message={`Bạn đã chọn ngày: ${selectedValue.format('DD/MM/YYYY')}`}
      />
      <Calendar
        key={uniqueKey}
        headerRender={({ value, onChange }) => customizeHeader(value, onChange)}
        value={selectedValue}
        onSelect={handleSelectDay}
        {...other}
      />
    </>
  );
};

CalendarUI.displayName = 'CalendarUI';
export default memo(CalendarUI);
