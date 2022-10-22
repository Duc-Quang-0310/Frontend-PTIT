import { Col, Row } from 'antd';
import CardUI from 'components/Card/CardUI';
import { useLaptop } from 'hooks/useLaptop';
import { memo, FC, useId, useMemo } from 'react';
import { UserSuggestProductContainer } from '../style/UserSuggestProduct';

const MOCK_DATA = [
  {
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  }
];

const UserSuggestProduct: FC = () => {
  const uniqueID = useId();
  const { randomProduct } = useLaptop(6);
  const valueMemo = useMemo(() => {
    if (randomProduct.length) {
      return randomProduct.map((laptop) => ({
        img:
          laptop?.productImg?.[0] ||
          'https://crast.net/img/2022/09/The-14-inch-MacBook-Pro-sinks-its-price-on-Amazon.jpg',
        title: laptop.productName,
        body: <div />,
        date: laptop?.updatedAt || new Date()
      }));
    }

    return MOCK_DATA;
  }, [randomProduct]);

  return (
    <UserSuggestProductContainer key={uniqueID}>
      <h3>Gợi ý của chúng tôi</h3>
      <p>
        Dưới đây là tổng hợp các sản phẩm theo <br />
        chúng tôi là phù hợp với bạn nhất
      </p>
      <Row gutter={[24, 0]} style={{ marginTop: 60 }}>
        {valueMemo.map(({ body, img, title, date }, index) => (
          <Col
            xxl={12}
            md={24}
            key={`${uniqueID}${body}${img}${title}${index}`}
            style={{ marginTop: 30 }}
          >
            <CardUI
              imgLink={img}
              title={title}
              body={body}
              date={date}
              status="Còn hàng"
            />
          </Col>
        ))}
      </Row>
    </UserSuggestProductContainer>
  );
};

export default memo(UserSuggestProduct);
