import { useAppSelector } from 'hooks/redux';
import { FC, memo } from 'react';

interface ProductOverviewProps {
  id?: string;
}

const ProductOverview: FC<ProductOverviewProps> = ({ id }) => {
  const { laptopDetail } = useAppSelector((state) => state.laptop);
  return (
    <div className="render-html">
      <section
        dangerouslySetInnerHTML={{ __html: String(laptopDetail?.review) }}
      />
    </div>
  );
};

export default memo(ProductOverview);
