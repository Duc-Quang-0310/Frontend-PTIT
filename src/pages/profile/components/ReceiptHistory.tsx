import CollapseUI from 'components/CollapseUI/CollapseUI';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import EmptyUI from 'components/Empty/EmptyUI';
import { ColorPalette } from 'constants/style.constant';
import moment from 'moment';
import { memo, useCallback, useMemo } from 'react';
import {
  BillInfo,
  RightContentWrapper,
  Content,
  Scrollable
} from '../style/UserProfile.styles';

const ReceiptHistory = () => {
  const renderInside = useCallback(
    (
      username: string,
      date: Date | string,
      item: {
        img: string;
        price: string;
        quantity: number;
        name: string;
      }[]
    ) => (
      <Content>
        <BillInfo style={{ marginBottom: 10 }}>
          <div className="title">Họ và tên: </div>
          <span>{username}</span>
        </BillInfo>
        <BillInfo style={{ marginBottom: 10 }}>
          <div className="title">Ngày lên đơn:</div>
          <span> {moment(date).format('Do MMMM YYYY')}</span>
        </BillInfo>
        <Scrollable>
          {item?.map((each, index) => (
            <div
              key={each.img + index}
              style={{
                display: 'flex',
                paddingInline: '30px',
                marginTop: 30,
                paddingBottom: 25,
                borderBottom: `1px solid ${ColorPalette.gray_10}`
              }}
            >
              <div className="img">
                <img src={each.img} alt={`img product ${index}`} />
              </div>
              <div
                style={{
                  paddingLeft: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%'
                }}
              >
                <div className="title">{each.name}</div>
                <FlexBetween
                  style={{
                    marginTop: 'auto',
                    flexDirection: 'column'
                  }}
                  className="border-top-1px"
                >
                  <div style={{ fontSize: 15, fontWeight: 'bold' }}>
                    Giá:
                    <span style={{ color: ColorPalette.red_4, marginLeft: 10 }}>
                      {each.price} đ
                    </span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 'bold' }}>
                    Số lượng: {each.quantity}
                  </div>
                </FlexBetween>
              </div>
            </div>
          ))}
        </Scrollable>
      </Content>
    ),
    []
  );

  const valueMemo = useMemo(() => [1], []);

  return (
    <RightContentWrapper>
      <h3>Đơn hàng của bạn</h3>
      <div className="subtitle">Đơn hàng</div>
      {valueMemo.length === 0 ? (
        <EmptyUI />
      ) : (
        valueMemo.map((each) => (
          <CollapseUI
            key={each}
            contentCollapse={renderInside('Duc Quang', new Date(), [
              {
                img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
                price: '19.990.000',
                quantity: 2,
                name: 'May tinh'
              },
              {
                img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
                price: '19.990.000',
                quantity: 2,
                name: 'May tinh'
              },
              {
                img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
                price: '19.990.000',
                quantity: 2,
                name: 'May tinh'
              },
              {
                img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
                price: '19.990.000',
                quantity: 2,
                name: 'May tinh'
              }
            ])}
            title="ID: 123"
          />
        ))
      )}
    </RightContentWrapper>
  );
};
export default memo(ReceiptHistory);
