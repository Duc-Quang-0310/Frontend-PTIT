import { Divider, Pagination, Spin } from 'antd';
import { PaginationSize } from 'services/client.interface';
import {
  getAllLaptopComplete,
  getAllLaptopRequest,
  getPaginationLaptopComplete,
  getPaginationLaptopRequest
} from 'global/common/laptop/laptop.slice';
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
  console.log('checkedList', checkedList);

  const dispatch = useAppDispatch();
  const { allLaptop, laptopListPaginate } = useAppSelector(
    (store) => store.laptop
  );
  console.log('laptopListPaginate', laptopListPaginate);

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

  useEffect(() => {
    dispatch(getAllLaptopRequest());

    return () => {
      dispatch(getAllLaptopComplete([]));
      dispatch(getPaginationLaptopComplete([]));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getPaginationLaptopRequest({
        page: pageInfo.page.toString(),
        size: pageInfo.pageSize.toString() as PaginationSize
      })
    );

    return () => {
      dispatch(getPaginationLaptopComplete([]));
    };
  }, [dispatch, pageInfo.page, pageInfo.pageSize]);

  return (
    <ProductListContainer>
      <SearchBar />
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
            total={allLaptop.length}
            defaultPageSize={parseInt(PaginationSize.FIFTEEN, 10)}
          />
          <div className="product-list">
            {laptopListPaginate.length ? (
              laptopListPaginate.map((item) => (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  image={item.productImg[0]}
                  name={item.productName}
                  price={item.price}
                />
              ))
            ) : (
              <div className="spinner">
                <Spin size="large" />
              </div>
            )}
          </div>
        </div>
      </ProductListContent>
    </ProductListContainer>
  );
};

export default ProductList;
