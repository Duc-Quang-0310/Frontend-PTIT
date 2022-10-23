import { Col, Row } from 'antd';
import CardUI from 'components/Card/CardUI';
import EmptyUI from 'components/Empty/EmptyUI';
import { useAppSelector } from 'hooks/redux';
import { useFavoriteLaptop } from 'hooks/useFavoriteLaptop';
import { FC, memo, useCallback, useId, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'router/router.paths';
import { FavoriteItem } from 'services/client.interface';
import { RightContentWrapper } from '../style/UserProfile.styles';

const Favorite: FC = () => {
  const uniqueID = useId();
  const { favoriteItem } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const { handleUpdateFavoriteItem } = useFavoriteLaptop();

  const valueMemo = useMemo(
    () =>
      favoriteItem.length
        ? favoriteItem.map((each) => ({
            img: each.img,
            title: each.title,
            body: <div />,
            id: each.id,
            date: each?.date || new Date()
          }))
        : [],
    [favoriteItem]
  );

  const handleDeleteItem = useCallback(
    (params: FavoriteItem) => {
      handleUpdateFavoriteItem(params, 'remove');
    },
    [handleUpdateFavoriteItem]
  );

  return (
    <RightContentWrapper>
      <h3>Sản phẩm yêu thích</h3>
      <div className="subtitle">Sản phẩm</div>

      {valueMemo.length ? (
        <Row gutter={[24, 0]}>
          {valueMemo.map(({ body, img, title, date, id }, index) => (
            <Col
              xxl={12}
              md={24}
              key={`${uniqueID}${body}${img}${title}${index}`}
              style={{ marginTop: 30, position: 'relative' }}
            >
              <CardUI
                imgLink={img}
                title={title}
                body={body}
                date={date}
                status="Còn hàng"
                id={id}
                onClick={() => navigate(routerPaths.LAPTOP_DETAIL(id))}
              />

              <div
                className="close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem({
                    date,
                    id,
                    img,
                    title
                  });
                }}
              >
                X
              </div>
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
