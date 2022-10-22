import RiseOutlined from '@ant-design/icons/lib/icons/RiseOutlined';
import Tooltip from 'antd/es/tooltip';
import { ColorPalette } from 'constants/style.constant';
import {
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
  useCallback,
  useId,
  useMemo
} from 'react';
import { Empty } from 'antd';
import moment from 'helpers/moment';
import {
  CardBody,
  CardContainer,
  CardTitle,
  Content,
  Dot,
  Img,
  InfoWrap,
  TextWrap,
  ViewMoreWrap
} from './CardUI.styles';

interface CardUIProps extends HTMLAttributes<HTMLDivElement> {
  imgLink: string;
  title: string;
  body?: string | ReactNode;
  status?: string;
  date?: Date | string;
  loading?: boolean;
}

const CardUI = forwardRef<any, CardUIProps>((props, ref) => {
  const {
    imgLink,
    title,
    body,
    status,
    date,
    onClick,
    loading = false,
    ...other
  } = props;
  const uniqueKey = useId();

  const renderStaticInfo = useMemo(() => {
    if (!status && !date) {
      return <span>Xem chi tiết</span>;
    }

    return (
      <>
        <span style={{ color: ColorPalette.green_1 }}>{status}</span>
        <Dot itemProp={ColorPalette.gray_3_1} />
        <span>{moment(date).format('Do MMM YYYY')}</span>
      </>
    );
  }, [date, status]);

  const onClickMemo = useCallback(
    (event?: any) => {
      onClick?.(event);
    },
    [onClick]
  );

  if (loading) {
    return (
      <CardContainer>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ margin: 'auto' }}
        />
      </CardContainer>
    );
  }

  return (
    <CardContainer ref={ref} key={uniqueKey} {...other} onClick={onClickMemo}>
      <Img alt={imgLink} src={imgLink} />
      <Content>
        <TextWrap>
          <CardTitle>{title}</CardTitle>
          {body && <CardBody>{body}</CardBody>}
        </TextWrap>
        <ViewMoreWrap>
          <InfoWrap>{renderStaticInfo}</InfoWrap>
          <Tooltip title="Xem chi tiết" placement="bottom">
            <RiseOutlined
              style={{
                color: ColorPalette.gray_11,
                fontSize: 20,
                cursor: 'pointer'
              }}
            />
          </Tooltip>
        </ViewMoreWrap>
      </Content>
    </CardContainer>
  );
});

CardUI.displayName = 'Card';
export default memo(CardUI);
