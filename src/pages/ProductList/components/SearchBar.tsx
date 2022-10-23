import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input';
import { memo } from 'react';
import {
  ProductListSearchBar,
  ProductListSearchInfo
} from '../ProductList.styles';

const { Search } = Input;

interface SearchBarProps extends SearchProps {}

const SearchBar = ({ ...props }: SearchBarProps) => {
  return (
    <ProductListSearchInfo>
      <div className="search-res">
        Tìm thấy length kết quả cho <span>abc</span>
      </div>
      <ProductListSearchBar>
        <Search allowClear {...props} />
      </ProductListSearchBar>
    </ProductListSearchInfo>
  );
};

export default memo(SearchBar);
