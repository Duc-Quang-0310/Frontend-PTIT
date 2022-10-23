import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { Tabs, notification } from 'antd';
import ButtonUI from 'components/Button/ButtonUI';
import CreditCardIcon from 'components/Images/CreditCardIcon';
import GlobalIcon from 'components/Images/GlobalIcon';
import ShieldIcon from 'components/Images/ShieldIcon';
import ModalUI from 'components/Modal/ModalUI';
import Rating from 'components/Rating/Rating';
import { UPDATE } from 'constants/mock.constants';
import { ColorPalette } from 'constants/style.constant';
import { updateCartActionRequest } from 'global/common/auth/auth.slice';
import {
  getLaptopDetailComplete,
  getLaptopDetailRequest
} from 'global/common/laptop/laptop.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useFavoriteLaptop } from 'hooks/useFavoriteLaptop';
import {
  FC,
  CSSProperties,
  useTransition,
  useMemo,
  useCallback,
  useState,
  useId,
  useEffect
} from 'react';
import { useParams } from 'react-router-dom';
import ModalListProductImg from './components/ModalListProductImg';
import ProductListInfoDetail from './components/ProductListInfoDetail';
import ProductOverview from './components/ProductOverview';
import ProductUserComment from './components/ProductUserComment';
import {
  ImageContainer,
  LaptopDetailContainer,
  DetailInfoContainer,
  AdditionalInfoContainer,
  FlexBasic,
  ListGuarantee,
  InfoBodyWrapper,
  Badge
} from './style/LaptopDetail';

const btnStyle: CSSProperties = {
  borderRadius: '6px',
  height: '45px',
  fontWeight: '600'
};

const RatingStyle: CSSProperties = {
  alignItems: 'center',
  marginBottom: '22px'
};

const LaptopDetail: FC = () => {
  const id = useId();
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { handleUpdateFavoriteItem, inFavorite } = useFavoriteLaptop(id);
  const { laptopDetail } = useAppSelector((state) => state.laptop);
  const [, startTransition] = useTransition();
  const imgList = useMemo(
    () =>
      laptopDetail && laptopDetail?.productImg?.length
        ? laptopDetail?.productImg
        : [],
    [laptopDetail]
  );
  const [imgIndex, setImgIndex] = useState(0);
  const [openModalImg, setOpenModalImg] = useState(false);
  const HASH = 160;

  const handleClickOnImg = useCallback(
    (index: number) => {
      startTransition(() => {
        setImgIndex(index);
      });
    },
    [startTransition]
  );

  const tabItems = useMemo(
    () => [
      {
        label: 'Đánh giá',
        key: `${id}item-1`,
        children: <ProductOverview id={params.id} />
      },
      {
        label: 'Thông tin chi tiết',
        key: `${id}item-2`,
        children: <ProductListInfoDetail id={params.id} />
      },
      {
        label: (
          <>
            Bình luận <Badge>{HASH}</Badge>
          </>
        ),
        key: `${id}item-3`,
        children: <ProductUserComment id={params.id} />
      }
    ],
    [params.id, id]
  );

  const renderModalProductImg = useMemo(() => {
    if (!openModalImg) {
      return null;
    }

    return (
      <ModalUI
        modalTitle="none"
        open
        onCancel={() => setOpenModalImg(false)}
        notDisplayTitle
        content={
          <ModalListProductImg imgList={imgList} focusIndex={imgIndex} />
        }
        footer={<div />}
        width={1000}
      />
    );
  }, [imgIndex, imgList, openModalImg]);

  useEffect(() => {
    if (params?.id) {
      dispatch(getLaptopDetailRequest(params.id));
    }
    return () => {
      dispatch(getLaptopDetailComplete(null));
    };
  }, [dispatch, params.id]);

  const handleAddToCart = useCallback(() => {
    if (laptopDetail) {
      dispatch(
        updateCartActionRequest({
          actionType: 'add',
          id: laptopDetail?._id,
          detail: {
            id: laptopDetail?._id || '',
            img:
              laptopDetail?.productImg?.[0] ||
              'https://crast.net/img/2022/09/The-14-inch-MacBook-Pro-sinks-its-price-on-Amazon.jpg',
            name: laptopDetail?.productName || '',
            price: laptopDetail?.price || UPDATE,
            quantity: 1
          }
        })
      );
      notification.success({
        message: 'Thêm vào giỏ hàng thành công'
      });
    }
  }, [dispatch, laptopDetail]);

  const handleChangeFavorite = useCallback(() => {
    if (laptopDetail) {
      handleUpdateFavoriteItem(
        {
          date: laptopDetail?.updatedAt || new Date(),
          id: laptopDetail?._id,
          img:
            laptopDetail?.productImg?.[0] ||
            'https://crast.net/img/2022/09/The-14-inch-MacBook-Pro-sinks-its-price-on-Amazon.jpg',
          title: laptopDetail?.productName || UPDATE
        },
        'change'
      );
    }
  }, [handleUpdateFavoriteItem, laptopDetail]);

  return (
    <LaptopDetailContainer>
      <ImageContainer>
        <div className="carousel">
          {imgList?.slice(0, 4)?.map((img, index) => (
            <div
              className={`item  ${imgIndex === index ? 'active' : ''} `}
              key={id + index}
              onClick={() => handleClickOnImg(index)}
            >
              <img src={img} alt={img} />
            </div>
          ))}

          <ButtonUI
            content="Xem thêm"
            type="default"
            className={imgList?.length > 4 ? 'showBtn' : 'hideBtn'}
            onClick={() => setOpenModalImg(true)}
          />
        </div>
        <div className="imageHero">
          <img src={imgList[imgIndex]} alt={imgList[imgIndex]} />
        </div>
      </ImageContainer>
      <DetailInfoContainer>
        <h3>{laptopDetail?.productName || UPDATE}</h3>
        <FlexBasic style={RatingStyle}>
          <Rating
            defaultValue={5}
            disabled
            style={{ fontSize: '16px', marginBlock: 'auto' }}
          />
          <span style={{ color: ColorPalette.gray_8 }}>160 Lượt đánh giá</span>
        </FlexBasic>
        <h4>{laptopDetail?.price || UPDATE}</h4>
        <InfoBodyWrapper>
          <p>Thông số sản phẩm: </p>
          <ul>
            <li>CPU: {laptopDetail?.cpu || UPDATE}</li>
            <li>RAM: {laptopDetail?.ram || UPDATE}</li>
            <li>Ổ cứng: {laptopDetail?.disk || UPDATE}</li>
            <li>VGA: {laptopDetail?.vga || UPDATE}</li>
            <li>Màn hình: {laptopDetail?.screen || UPDATE}</li>
            <li>Bàn phím: {laptopDetail?.keyboard || UPDATE}</li>
            <li>Hệ điều hành: {laptopDetail?.window || UPDATE}</li>
            <li>Màu: {laptopDetail?.color || UPDATE}</li>
          </ul>
        </InfoBodyWrapper>
        <FlexBasic style={{ marginTop: 40 }}>
          <ButtonUI
            colorFill={ColorPalette.purpleMain}
            content="Thêm vào giỏ hàng"
            style={btnStyle}
            onClick={handleAddToCart}
          />
          <ButtonUI
            content={
              !inFavorite ? (
                <HeartOutlined />
              ) : (
                <HeartTwoTone twoToneColor={ColorPalette.purpleMain} />
              )
            }
            type="default"
            style={btnStyle}
            onClick={handleChangeFavorite}
          />
        </FlexBasic>
        <ListGuarantee>
          <div>
            <GlobalIcon fill={ColorPalette.gray_6} blockWidth={20} />
            <span>Miễn phí giao hàng toàn quốc</span>
          </div>
          <div>
            <CreditCardIcon fill={ColorPalette.gray_6} width={20} />
            <span>100% Bảo mật thanh toán</span>
          </div>
          <div>
            <ShieldIcon fill={ColorPalette.gray_6} width={20} />
            <span>Nguồn cung sản phẩm uy tín</span>
          </div>
        </ListGuarantee>
      </DetailInfoContainer>
      <AdditionalInfoContainer>
        <Tabs items={tabItems} />
      </AdditionalInfoContainer>
      {renderModalProductImg}
    </LaptopDetailContainer>
  );
};

export default LaptopDetail;
