import { FC, memo } from 'react';

interface ProductOverviewProps {
  id?: string;
}

const ProductOverview: FC<ProductOverviewProps> = ({ id }) => {
  return <div>ProductOverview</div>;
};

export default memo(ProductOverview);
