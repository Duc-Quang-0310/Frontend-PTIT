import { Col, Row } from 'antd';
import ProductCard from 'components/ProductCard/ProductCard';
import { useLaptop } from 'hooks/useLaptop';
import { FC, memo, useMemo } from 'react';
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
  const { randomProduct } = useLaptop();

  const convertedData = useMemo(() => {
    if (randomProduct) {
      return randomProduct.map((laptop) => ({
        price: '16.999.000',
        productLink:
          laptop?.productImg?.[0] ||
          'https://crast.net/img/2022/09/The-14-inch-MacBook-Pro-sinks-its-price-on-Amazon.jpg',
        title: laptop?.productName
      }));
    }
    return MOCK_DATA;
  }, [randomProduct]);

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
        {convertedData.map(({ price, productLink, title }, index) => (
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
