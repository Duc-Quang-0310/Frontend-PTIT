import { Divider, Pagination } from 'antd';
import { Laptop, PaginationSize } from 'services/client.interface';
import EmptyUI from 'components/Empty/EmptyUI';
import { getAllLaptopRequest } from 'global/common/laptop/laptop.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect, useMemo, useState } from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import { ProductListContainer, ProductListContent } from './ProductList.styles';
import BrandChecklist from './components/BrandChecklist';

const ProductList = () => {
  const [pageInfo, setPageInfo] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: parseInt(PaginationSize.FIFTEEN, 10)
  });
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const { allLaptop } = useAppSelector((store) => store.laptop);

  const handleChangePagination = (page: number, pageSize: number) => {
    setPageInfo({ page, pageSize });
  };

  const listValueOnFilterPageSize = useMemo(() => {
    const listLabel: number[] = [];
    for (const [, value] of Object.entries(PaginationSize)) {
      listLabel.push(parseInt(value, 10));
    }
    return listLabel;
  }, []);

  const productListByFilter = useMemo(() => {
    const resByFilter: Laptop[] = [];
    allLaptop.forEach((laptopItem: Laptop) => {
      checkedList.forEach((brandItem: CheckboxValueType) => {
        if (laptopItem.brand === brandItem) resByFilter.push(laptopItem);
      });
    });

    const res: Laptop[] = [];
    resByFilter.forEach((laptopItem: Laptop) => {
      if (
        laptopItem.productName.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        res.push(laptopItem);
      }
    });

    return res;
  }, [allLaptop, checkedList, searchValue]);

  useEffect(() => {
    dispatch(getAllLaptopRequest());
  }, [dispatch]);

  return (
    <ProductListContainer>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        totalValue={productListByFilter.length}
      />
      <Divider />
      <ProductListContent>
        <BrandChecklist
          checkedList={checkedList}
          setCheckedList={setCheckedList}
        />
        <div className="main-content">
          <Pagination
            pageSizeOptions={listValueOnFilterPageSize}
            onChange={(page, pageSize) =>
              handleChangePagination(page, pageSize)
            }
            total={productListByFilter.length}
            defaultPageSize={parseInt(PaginationSize.FIFTEEN, 10)}
            current={pageInfo.page}
          />
          <div className="product-list">
            {productListByFilter.length ? (
              productListByFilter
                .slice(
                  (pageInfo.page - 1) * pageInfo.pageSize,
                  (pageInfo.page - 1) * pageInfo.pageSize + pageInfo.pageSize
                )
                .map(
                  (item) =>
                    item && (
                      <ProductCard
                        key={item._id}
                        id={item._id}
                        image={item.productImg[0]}
                        name={item.productName}
                        price={item.price}
                      />
                    )
                )
            ) : (
              <div className="spinner">
                <EmptyUI />
              </div>
            )}
          </div>
        </div>
      </ProductListContent>
    </ProductListContainer>
  );
};

export default ProductList;
