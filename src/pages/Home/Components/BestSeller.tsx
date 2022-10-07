import { Col, Row } from 'antd';
import ProductCard from 'components/ProductCard/ProductCard';
import { FC, memo } from 'react';
import { BestSellerContainer } from '../style/BestSeller';

const MOCK_DATA = [
  {
    price: '16.999.000',
    productLink:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    title: 'Orange'
  },
  {
    price: '16.999.000',
    productLink:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    title: 'Orange'
  },
  {
    price: '16.999.000',
    productLink:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    title: 'Orange'
  },
  {
    price: '16.999.000',
    productLink:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
    title: 'Orange'
  }
];

const BestSeller: FC = () => {
  return (
    <BestSellerContainer key={BestSellerContainer}>
      <h2>Sản phẩm bán chạy</h2>
      <Row
        gutter={[16, 0]}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {MOCK_DATA.map(({ price, productLink, title }, index) => (
          <Col
            key={`${price}${productLink}${title}${index}`}
            xxl={6}
            style={{ marginTop: 30 }}
          >
            <ProductCard
              price={price}
              productLink={productLink}
              title={title}
              disabledStar
              rateStar={5}
            />
          </Col>
        ))}
      </Row>
    </BestSellerContainer>
  );
};

export default memo(BestSeller);
