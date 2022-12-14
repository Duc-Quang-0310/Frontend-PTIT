import { Col, Row } from 'antd';
import CardUI from 'components/Card/CardUI';
import { useLaptop } from 'hooks/useLaptop';
import { memo, FC, useId, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'router/router.paths';
import { UserSuggestProductContainer } from '../style/UserSuggestProduct';

const MOCK_DATA = [
  {
    id: '',
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    id: '',
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    id: '',
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    id: '',
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    id: '',
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  },
  {
    id: '',
    img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
    title: 'Mountain great',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.',
    date: new Date()
  }
];

const UserSuggestProduct: FC = () => {
  const uniqueID = useId();
  const { randomProduct } = useLaptop(6);
  const navigate = useNavigate();
  const valueMemo = useMemo(() => {
    if (randomProduct.length) {
      return randomProduct.map((laptop) => ({
        img:
          laptop?.productImg?.[0] ||
          'https://crast.net/img/2022/09/The-14-inch-MacBook-Pro-sinks-its-price-on-Amazon.jpg',
        title: laptop.productName,
        body: <div />,
        date: laptop?.updatedAt || new Date(),
        id: laptop?._id
      }));
    }

    return MOCK_DATA;
  }, [randomProduct]);

  return (
    <UserSuggestProductContainer key={uniqueID}>
      <h3>G???i ?? c???a ch??ng t??i</h3>
      <p>
        D?????i ????y l?? t???ng h???p c??c s???n ph???m theo <br />
        ch??ng t??i l?? ph?? h???p v???i b???n nh???t
      </p>
      <Row gutter={[24, 0]} style={{ marginTop: 60 }}>
        {valueMemo.map(({ body, img, title, date, id }, index) => (
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
              status="C??n h??ng"
              id={id}
              onClick={() => id && navigate(routerPaths.LAPTOP_DETAIL(id))}
              style={{ minHeight: '330px' }}
            />
          </Col>
        ))}
      </Row>
    </UserSuggestProductContainer>
  );
};

export default memo(UserSuggestProduct);
