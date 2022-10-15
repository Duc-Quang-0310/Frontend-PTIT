import CollapseUI from 'components/CollapseUI/CollapseUI';
import { memo } from 'react';
import { RightContentWrapper } from '../style/UserProfile.styles';

const ReceiptHistory = () => {
  return (
    <RightContentWrapper>
      <h3>Đơn hàng của bạn</h3>
      <div className="subtitle">Đơn hàng</div>
      <CollapseUI key={'s'} contentCollapse="a" title="ID: 123" />
    </RightContentWrapper>
  );
};
export default memo(ReceiptHistory);
