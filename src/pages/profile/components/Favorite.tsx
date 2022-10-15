import { Col, Row } from 'antd';
import CardUI from 'components/Card/CardUI';
import EmptyUI from 'components/Empty/EmptyUI';
import { FC, memo, useCallback, useId, useMemo } from 'react';
import { RightContentWrapper } from '../style/UserProfile.styles';

const Favorite: FC = () => {
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
      }
    ],
    []
  );

  const handleDeleteItem = useCallback((id: string) => {
    //
  }, []);

  return (
    <RightContentWrapper>
      <h3>Sản phẩm yêu thích</h3>
      <div className="subtitle">Sản phẩm</div>

      {valueMemo.length ? (
        <Row gutter={[24, 0]}>
          {valueMemo.map(({ body, img, title }, index) => (
            <Col
              xxl={12}
              md={24}
              key={`${uniqueID}${body}${img}${title}${index}`}
              style={{ marginTop: 30, position: 'relative' }}
              onClick={() => handleDeleteItem(title)}
            >
              <CardUI
                imgLink={img}
                title={title}
                body={body}
                date={new Date()}
                status="Còn hàng"
              />

              <div className="close-icon">X</div>
            </Col>
          ))}
        </Row>
      ) : (
        <EmptyUI />
      )}
    </RightContentWrapper>
  );
};

export default memo(Favorite);
