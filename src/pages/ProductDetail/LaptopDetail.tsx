import { HeartOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ButtonUI from 'components/Button/ButtonUI';
import CreditCardIcon from 'components/Images/CreditCardIcon';
import GlobalIcon from 'components/Images/GlobalIcon';
import ShieldIcon from 'components/Images/ShieldIcon';
import ModalUI from 'components/Modal/ModalUI';
import Rating from 'components/Rating/Rating';
import { ColorPalette } from 'constants/style.constant';
import {
  FC,
  CSSProperties,
  useTransition,
  useMemo,
  useCallback,
  useState,
  useId
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
  const [, startTransition] = useTransition();
  const imgList = useMemo(() => [0, 1, 2, 3, 4], []);
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

  return (
    <LaptopDetailContainer>
      <ImageContainer>
        <div className="carousel">
          {imgList?.slice(0, 4)?.map((_img, index) => (
            <div
              className={`item  ${imgIndex === index ? 'active' : ''} `}
              key={id + index}
              onClick={() => handleClickOnImg(index)}
            />
          ))}

          <ButtonUI
            content="Xem thêm"
            type="default"
            className={imgList?.length > 4 ? 'showBtn' : 'hideBtn'}
            onClick={() => setOpenModalImg(true)}
          />
        </div>
        <div className="imageHero">{imgList[imgIndex]}</div>
      </ImageContainer>
      <DetailInfoContainer>
        <h3>Jenny’s Closets - The winter top for female, green</h3>
        <FlexBasic style={RatingStyle}>
          <Rating
            defaultValue={5}
            disabled
            style={{ fontSize: '16px', marginBlock: 'auto' }}
          />
          <span style={{ color: ColorPalette.gray_8 }}>160 Lượt đánh giá</span>
        </FlexBasic>
        <h4>16.999.000 đ</h4>
        <InfoBodyWrapper>
          <p>Thông số sản phẩm: </p>
          <ul>
            <li>CPU: Intel core i5 11400H </li>
            <li>RAM: 8GB</li>
            <li>Ổ cứng: 512GB SSD</li>
            <li>VGA: NVIDIA GTX1650 4G</li>
            <li>Màn hình: 15.6 inch FHD 144Hz</li>
            <li>Bàn phím: có led</li>
            <li>Hệ điều hành: Win 11</li>
            <li>Màu: Đen</li>
          </ul>
        </InfoBodyWrapper>
        <FlexBasic style={{ marginTop: 40 }}>
          <ButtonUI
            colorFill={ColorPalette.purpleMain}
            content="Thêm vào giỏ hàng"
            style={btnStyle}
          />
          <ButtonUI
            content={<HeartOutlined />}
            type="default"
            style={btnStyle}
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
