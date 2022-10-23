import {
  HeartOutlined,
  HeartTwoTone,
  MoreOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { notification, Popover } from 'antd';
import StackUI from 'components/Stack/StackUI';
import { UPDATE } from 'constants/mock.constants';
import { ColorPalette } from 'constants/style.constant';
import { updateCartActionRequest } from 'global/common/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useFavoriteLaptop } from 'hooks/useFavoriteLaptop';
import { memo, useCallback, useMemo } from 'react';
import { ProductCardItem } from '../ProductList.styles';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  id: string;
}

const ProductCard = ({ image, name, price, id }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const { allLaptop } = useAppSelector((store) => store.laptop);
  const { favoriteItem, user } = useAppSelector((store) => store.auth);

  const { handleUpdateFavoriteItem } = useFavoriteLaptop();

  const inFavoriteItem = useMemo(
    () =>
      favoriteItem.length && id
        ? [...favoriteItem].some((laptop) => laptop.id === id)
        : false,
    [favoriteItem, id]
  );

  const handleClickOnFavorite = useCallback(() => {
    const currentLaptop =
      allLaptop.length && allLaptop.find((each) => each._id === id);

    if (!currentLaptop) {
      return null;
    }
    handleUpdateFavoriteItem(
      {
        date: currentLaptop?.updatedAt || new Date(),
        id: currentLaptop?._id,
        img:
          currentLaptop?.productImg?.[0] ||
          'https://crast.net/img/2022/09/The-14-inch-MacBook-Pro-sinks-its-price-on-Amazon.jpg',
        title: currentLaptop?.productName || UPDATE
      },
      'change'
    );
  }, [allLaptop, handleUpdateFavoriteItem, id]);

  const handleClickOnCart = useCallback(() => {
    if (!user) {
      return notification.error({
        message: 'Bạn cần đăng nhập để set dụng chức năng này'
      });
    }

    const existedLaptop = allLaptop.find((each) => each._id === id);

    dispatch(
      updateCartActionRequest({
        actionType: 'add',
        id,
        detail: {
          id: id || '',
          img:
            existedLaptop?.productImg?.[0] ||
            'https://crast.net/img/2022/09/The-14-inch-MacBook-Pro-sinks-its-price-on-Amazon.jpg',
          name: existedLaptop?.productName || UPDATE,
          price: existedLaptop?.price || UPDATE,
          quantity: 1
        }
      })
    );
    notification.success({
      message: 'Thêm vào giỏ hàng thành công',
      duration: 1
    });
  }, [allLaptop, dispatch, id, user]);

  const tooltipMoreMemo = useMemo(() => {
    if (!id) {
      return null;
    }
    return (
      <>
        <StackUI
          width={160}
          icon={
            inFavoriteItem ? (
              <HeartTwoTone twoToneColor={ColorPalette.purpleMain} />
            ) : (
              <HeartOutlined />
            )
          }
          content="Thêm ưa thích"
          onClick={handleClickOnFavorite}
        />
        <StackUI
          width={160}
          icon={<ShoppingCartOutlined />}
          content="Thêm giỏ hàng"
          onClick={handleClickOnCart}
        />
      </>
    );
  }, [id, inFavoriteItem, handleClickOnFavorite, handleClickOnCart]);

  return (
    <ProductCardItem>
      <img src={image} alt={name} />
      <div>{name}</div>
      <div className="product-price">{price}</div>
      <Popover content={tooltipMoreMemo} placement="left" trigger="click">
        <MoreOutlined
          style={{
            cursor: 'pointer',
            fontSize: 18,
            color: ColorPalette.gray_3_1,
            position: 'absolute',
            top: 20,
            right: 20
          }}
        />
      </Popover>
    </ProductCardItem>
  );
};

export default memo(ProductCard);
