import moment, { Moment } from 'moment';
import { FC, memo, useState } from 'react';
import { CalendarProps as AntDCalendarProps } from 'antd/lib/calendar';
import { Alert, Calendar, Col, Row, Select } from 'antd';
import DatePickerUI from 'components/DatePicker/DatePickerUI';
import { CalenderHeader } from './Calendar.styled';
import './Calendar.styles.css';

interface CalendarProps extends AntDCalendarProps<Moment> {}

const CalendarUI: FC<CalendarProps> = (props) => {
  const { defaultValue = moment(), ...other } = props;
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const onSelect = (currenDate: Moment) => {
    setSelectedValue(currenDate);
  };

  const handleChangeDatePicker = (currenDate: Moment | null) => {
    if (currenDate) setSelectedValue(currenDate);
  };

  // Wrap inside useCallBack
  const customizeHeader = (
    value: moment.Moment,
    onChange: (date: moment.Moment) => void
  ) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];
    const current = value.clone();
    const localeData = value.localeData();
    const months = [];

    // use map instead of common loop
    /**
     * @Array [1,2,3,4,...12].forEach(each=> ...)
     */

    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }

    // use map instead of common loop
    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {months[i]}
        </Select.Option>
      );
    }

    // const to top
    const month = value.month();

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
              onChange={(newMonth) => {
                const now = value.clone().month(newMonth);
                onChange(now);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </CalenderHeader>
    );
  };

  return (
    <>
      <Alert
        message={`Bạn đã chọn ngày: ${selectedValue.format('DD/MM/YYYY')}`}
      />
      <Calendar
        headerRender={({ value, onChange }) => customizeHeader(value, onChange)}
        value={selectedValue}
        onSelect={onSelect}
        locale={{
          lang: {
            locale: 'vi',
            dayFormat: moment.updateLocale('vi', {
              weekdaysMin: [
                'Chủ nhật',
                'Thứ 2',
                'Thứ 3',
                'Thứ 4',
                'Thứ 5',
                'Thứ 6',
                'Thứ 7'
              ]
            })
          }
        }}
        {...other}
      />
    </>
  );
};

CalendarUI.displayName = 'CalendarUI';
export default memo(CalendarUI);
