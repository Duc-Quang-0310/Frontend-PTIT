import ScheduleOutlined from '@ant-design/icons/lib/icons/ScheduleOutlined';
import DatePickerUI from 'components/DatePicker/DatePickerUI';
import moment from 'moment';
import { FC, useState } from 'react';
import {
  AppointmentDrawerWrapper,
  ContentAppointmentWrapper,
  IconWrapper
} from './AppointmentDrawer.style';

const AppointmentDrawer: FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <AppointmentDrawerWrapper itemProp={toggle ? '450' : '70'}>
      <IconWrapper onClick={() => setToggle((prev) => !prev)}>
        <ScheduleOutlined style={{ fontSize: toggle ? 47 : 35 }} />
      </IconWrapper>
      {toggle && (
        <ContentAppointmentWrapper>
          <DatePickerUI defaultValue={moment()} />
        </ContentAppointmentWrapper>
      )}
    </AppointmentDrawerWrapper>
  );
};

export default AppointmentDrawer;
