import { HeartTwoTone, RiseOutlined } from '@ant-design/icons';
import HeartOutlined from '@ant-design/icons/lib/icons/HeartOutlined';
import MoreOutlined from '@ant-design/icons/lib/icons/MoreOutlined';
import ShoppingCartOutlined from '@ant-design/icons/lib/icons/ShoppingCartOutlined';
import { Empty, notification, Popover, Spin, Tooltip } from 'antd';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import Rating from 'components/Rating/Rating';
import StackUI from 'components/Stack/StackUI';
import { UPDATE } from 'constants/mock.constants';
import { ColorPalette } from 'constants/style.constant';
import { updateCartActionRequest } from 'global/common/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useFavoriteLaptop } from 'hooks/useFavoriteLaptop';
import {
  HTMLAttributes,
  forwardRef,
  memo,
  useId,
  useMemo,
  useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'router/router.paths';
import {
  ProductCardContainer,
  ImageWrap,
  BadgeType,
  ContentWrap,
  TextClampOneLine,
  PriceContainer
} from './ProductCard.style';

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  productLink: string;
  type?: 'new' | 'sale' | 'normal';
  title: string;
  price: string;
  loading?: boolean;
  rateStar?: number;
  disabledStar?: boolean;
  id: string;
}

const ProductCard = forwardRef<any, ProductCardProps>((props, ref) => {
  const {
    productLink,
    type = 'normal',
    title,
    price,
    loading,
    rateStar,
    disabledStar = false,
    id = '',
    ...other
  } = props;
  const uniqueId = useId();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { favoriteItem, user } = useAppSelector((store) => store.auth);
  const { allLaptop } = useAppSelector((store) => store.laptop);
  const { handleUpdateFavoriteItem } = useFavoriteLaptop();

  const inFavoriteItem = useMemo(
    () =>
      favoriteItem.length && id
        ? [...favoriteItem].some((laptop) => laptop.id === id)
        : false,
    [favoriteItem, id]
  );

  const handleClickOnCart = useCallback(() => {
    if (!user) {
      return notification.error({
        message: 'Bạn cần đăng nhập để set dụng chức năng này'
      });
    }

    dispatch(
      updateCartActionRequest({
        actionType: 'add',
        id,
        detail: {
          id: id || '',
          img:
            productLink ||
            'https://crast.net/img/2022/09/The-14-inch-MacBook-Pro-sinks-its-price-on-Amazon.jpg',
          name: title || '',
          price:
            (allLaptop.length &&
              allLaptop.find((each) => each._id === id)?.price) ||
            UPDATE,
          quantity: 1
        }
      })
    );
    notification.success({
      message: 'Thêm vào giỏ hàng thành công',
      duration: 1
    });
  }, [allLaptop, dispatch, id, productLink, title, user]);

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

  const handleClickDetail = useCallback(
    () => id && navigate(routerPaths.LAPTOP_DETAIL(id)),
    [id, navigate]
  );

  const tooltipMoreMemo = useMemo(() => {
    if (!productLink) {
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
        <StackUI
          width={160}
          icon={<RiseOutlined />}
          content="Xem chi tiết"
          onClick={handleClickDetail}
        />
      </>
    );
  }, [
    productLink,
    inFavoriteItem,
    handleClickOnFavorite,
    handleClickOnCart,
    handleClickDetail
  ]);

  return (
    <ProductCardContainer
      ref={ref}
      key={`${uniqueId}-${productLink} `}
      {...other}
    >
      <ImageWrap>
        {loading ? (
          <Empty style={{ margin: 'auto' }} />
        ) : (
          <>
            <img src={productLink} alt={productLink} />
            {type !== 'normal' && (
              <BadgeType itemProp={type}>
                {type === 'new' ? 'Mới' : 'Giảm'}
              </BadgeType>
            )}
          </>
        )}
      </ImageWrap>
      <ContentWrap>
        {loading ? (
          <Spin style={{ margin: 'auto' }} />
        ) : (
          <>
            <FlexBetween
              style={{ gap: 10, display: 'flex', alignItems: 'center' }}
            >
              <Tooltip title={title}>
                <TextClampOneLine>{title}</TextClampOneLine>
              </Tooltip>
              <Popover
                content={tooltipMoreMemo}
                placement="left"
                trigger="click"
              >
                <MoreOutlined
                  style={{
                    cursor: 'pointer',
                    fontSize: 18,
                    color: ColorPalette.gray_3_1
                  }}
                />
              </Popover>
            </FlexBetween>
            <FlexBetween
              style={{ marginTop: 5, display: 'flex', alignItems: 'center' }}
            >
              <PriceContainer>{`${price} đ`}</PriceContainer>
              <Rating
                disabled={disabledStar || false}
                style={{ fontSize: 17, color: ColorPalette.purpleMain }}
                defaultValue={rateStar}
              />
            </FlexBetween>
          </>
        )}
      </ContentWrap>
    </ProductCardContainer>
  );
});

export default memo(ProductCard);
