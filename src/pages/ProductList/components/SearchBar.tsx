import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input';
import { debounce } from 'lodash';
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback
} from 'react';
import { Laptop } from 'services/client.interface';
import {
  ProductListSearchBar,
  ProductListSearchInfo
} from '../ProductList.styles';

const { Search } = Input;

interface SearchBarProps extends SearchProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  totalValue: number;
}

const SearchBar = ({
  searchValue,
  setSearchValue,
  totalValue,
  ...props
}: SearchBarProps) => {
  const handleChangeSearchInput = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }, 400),
    [setSearchValue]
  );

  return (
    <ProductListSearchInfo>
      <div className={`search-res ${searchValue ? '' : 'hidden'}`}>
        Tìm thấy {totalValue} kết quả cho <span>{searchValue}</span>
      </div>
      <ProductListSearchBar>
        <Search
          allowClear
          // value={searchValue}
          onChange={handleChangeSearchInput}
          {...props}
        />
      </ProductListSearchBar>
    </ProductListSearchInfo>
  );
};

export default memo(SearchBar);
