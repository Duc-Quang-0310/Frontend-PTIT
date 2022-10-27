import CollapseUI from 'components/CollapseUI/CollapseUI';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import EmptyUI from 'components/Empty/EmptyUI';
import { ColorPalette } from 'constants/style.constant';
import { getAllReceiptsRequest } from 'global/common/auth/auth.slice';
import { useAppSelector } from 'hooks/redux';
import moment from 'moment';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BillInfo,
  RightContentWrapper,
  Content,
  Scrollable
} from '../style/UserProfile.styles';

const ReceiptHistory = () => {
  const { user, receipts, profile } = useAppSelector((store) => store.auth);
  const dispatch = useDispatch();

  const renderInside = useCallback(
    (
      username: string,
      date: Date | string,
      address: string,
      cash: string,
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
        <BillInfo style={{ marginBottom: 10 }}>
          <div className="title">Địa chỉ:</div>
          <span> {address}</span>
        </BillInfo>
        <BillInfo style={{ marginBottom: 10 }}>
          <div className="title">Tổng giá tiền:</div>
          <span style={{ color: ColorPalette.red_4, fontWeight: '600' }}>
            {cash}
          </span>
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
                      {each.price}
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

  useEffect(() => {
    if (user) {
      dispatch(getAllReceiptsRequest(user._id));
    }
  }, [dispatch, user]);

  return (
    <RightContentWrapper>
      <h3>Đơn hàng của bạn</h3>
      <div className="subtitle">Đơn hàng</div>
      {receipts.length === 0 ? (
        <EmptyUI />
      ) : (
        receipts.map((each) => (
          <CollapseUI
            key={each._id}
            contentCollapse={renderInside(
              `${profile?.firstName} ${profile?.lastName}`,
              each.lastModify,
              each.address,
              each.cash,
              each.items.map((item, index) => ({
                img: item?.productImg?.[0],
                name: item?.productName,
                price: item?.price,
                quantity:
                  each?.quantity && each?.quantity?.length
                    ? each?.quantity?.[index]
                    : 1
              }))
            )}
            title={`ID: ${each._id}`}
          />
        ))
      )}
    </RightContentWrapper>
  );
};
export default memo(ReceiptHistory);
