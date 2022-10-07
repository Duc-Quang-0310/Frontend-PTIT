import { Col, Row } from 'antd';
import CardUI from 'components/Card/CardUI';
import { memo, FC, useId, useMemo } from 'react';
import { UserSuggestProductContainer } from '../style/UserSuggestProduct';

const UserSuggestProduct: FC = () => {
  const uniqueID = useId();
  const valueMemo = useMemo(
    () => [
      {
        img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
        title: 'Mountain great',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.'
      },
      {
        img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
        title: 'Mountain great',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.'
      },
      {
        img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
        title: 'Mountain great',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.'
      },
      {
        img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
        title: 'Mountain great',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.'
      },
      {
        img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
        title: 'Mountain great',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.'
      },
      {
        img: 'https://i.natgeofe.com/n/c9107b46-78b1-4394-988d-53927646c72b/1095.jpg',
        title: 'Mountain great',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut.'
      }
    ],
    []
  );

  return (
    <UserSuggestProductContainer key={uniqueID}>
      <h3>Gợi ý của chúng tôi</h3>
      <p>
        Dưới đây là tổng hợp các sản phẩm theo <br />
        chúng tôi là phù hợp với bạn nhất
      </p>
      <Row gutter={[24, 0]} style={{ marginTop: 60 }}>
        {valueMemo.map(({ body, img, title }, index) => (
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
              date={new Date()}
              status="Còn hàng"
            />
          </Col>
        ))}
      </Row>
    </UserSuggestProductContainer>
  );
};

export default memo(UserSuggestProduct);
