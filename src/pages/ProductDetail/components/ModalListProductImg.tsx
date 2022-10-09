import { Image } from 'antd';
import { FC, useCallback, useId, useState } from 'react';
import { LaptopListImgContainer } from '../style/LaptopDetail';

interface ModalListProductImgProps {
  imgList: number[];
  focusIndex: number;
}

const TEMP = [
  'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.jpg',
  'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.jpg',
  'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.jpg',
  'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.jpg',
  'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/V%C3%A9C%C3%B4ngVi%C3%AAnGi%E1%BA%A3iTr%C3%ADIMGWorldsofAdventure.jpg'
];

const ModalListProductImg: FC<ModalListProductImgProps> = ({
  imgList,
  focusIndex
}) => {
  const id = useId();
  const [currentImgIndex, setCurrentImgIndex] = useState(focusIndex || 0);
  const handleOnclickChangeImgIndex = useCallback((index: number) => {
    setCurrentImgIndex(index);
  }, []);

  return (
    <LaptopListImgContainer key={id}>
      <div className="imgHero">
        <Image
          src={TEMP[currentImgIndex]}
          height={500}
          width={500}
          className="currentImg"
        />
      </div>
      <div className="imgList">
        {TEMP?.map((childImg, index) => (
          <div
            className={`imgItem ${currentImgIndex === index ? 'active' : ''}`}
            key={`product+${index}+${id}`}
            onClick={() => handleOnclickChangeImgIndex(index)}
          >
            <img src={childImg} alt={`product+${index}+${id}`} />
          </div>
        ))}
      </div>
    </LaptopListImgContainer>
  );
};

export default ModalListProductImg;
