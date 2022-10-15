import { Row, Col } from 'antd';
import CreditCardIcon from 'components/Images/CreditCardIcon';
import ShieldIcon from 'components/Images/ShieldIcon';
import TruckIcon from 'components/Images/TruckIcon';
import { ColorPalette } from 'constants/style.constant';
import { FC } from 'react';
import { CSSProperties } from 'styled-components';
import {
  IconBackground,
  Inner,
  TextCenter,
  WhyChooseUsContainer
} from '../style/WhyChooseUs';
import GiftIcon from './GiftIcon';
import '../style/WhyChooseUs.css';

const styled: CSSProperties = {
  padding: '25px 15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${ColorPalette.gray_22}`
};

const subTitleStyle: CSSProperties = {
  fontWeight: 'bold',
  fontSize: '16px',
  marginTop: 15,
  marginBottom: 7
};

const textStyle: CSSProperties = {
  color: ColorPalette.gray_5
};

const WhyChooseUs: FC = () => {
  return (
    <WhyChooseUsContainer key="WhyChooseUsContainer">
      <Inner
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <h3>Tại sao bạn nên chọn chúng tôi</h3>
        <Row style={{ width: '70%' }}>
          <Col xxl={6} style={styled} className="hoverable">
            <IconBackground>
              <TruckIcon fill={ColorPalette.white} />
            </IconBackground>
            <div style={subTitleStyle}>Miễn phí giao hàng</div>
            <TextCenter style={textStyle}>
              Miễn phí giao hàng
              <br /> trên toàn quốc
            </TextCenter>
          </Col>
          <Col xxl={6} style={styled} className="hoverable">
            <IconBackground>
              <GiftIcon fill={ColorPalette.white} />
            </IconBackground>
            <div style={subTitleStyle}>Quà tặng thành viên</div>
            <TextCenter style={textStyle}>
              Với mỗi thành viên từng mua <br /> sản phẩm sẽ có ưu đãi
            </TextCenter>
          </Col>
          <Col xxl={6} style={styled} className="hoverable">
            <IconBackground>
              <CreditCardIcon fill={ColorPalette.white} />
            </IconBackground>
            <div style={subTitleStyle}>Thanh toán bảo mật</div>
            <TextCenter style={textStyle}>
              Với mỗi đơn hàng chúng tôi cam
              <br /> kết bảo mật thông tin
            </TextCenter>
          </Col>
          <Col xxl={6} style={styled} className="hoverable">
            <IconBackground>
              <ShieldIcon fill={ColorPalette.white} />
            </IconBackground>
            <div style={subTitleStyle}>Sản phẩm uy tín</div>
            <TextCenter style={textStyle}>
              Với các nhà cung cấp uy tín chúng tôi
              <br /> sẽ hoàn trả nếu có lỗi
            </TextCenter>
          </Col>
        </Row>
      </Inner>
    </WhyChooseUsContainer>
  );
};

export default WhyChooseUs;
