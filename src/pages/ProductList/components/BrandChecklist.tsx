import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useAppSelector } from 'hooks/redux';
import { uniqBy } from 'lodash';
import { BrandListContainer } from '../ProductList.styles';

const CheckboxGroup = Checkbox.Group;

interface BrandChecklistProps {
  checkedList: CheckboxValueType[];
  setCheckedList: Dispatch<SetStateAction<CheckboxValueType[]>>;
}

const BrandChecklist = ({
  checkedList,
  setCheckedList
}: BrandChecklistProps) => {
  const { allLaptop } = useAppSelector((store) => store.laptop);

  const listBrand = useMemo(() => {
    if (allLaptop.length) {
      return uniqBy(allLaptop, (laptop) => laptop.brand).map(
        (laptop) => laptop.brand
      );
    }
    return [];
  }, [allLaptop]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? (listBrand as string[]) : []);
  };

  useEffect(() => {
    if (listBrand.length) {
      setCheckedList(listBrand as string[]);
    }
  }, [listBrand, setCheckedList]);

  return (
    <BrandListContainer>
      <div className="title">Hãng</div>
      <Checkbox
        indeterminate={checkedList.length >= 1}
        onChange={onCheckAllChange}
        checked={checkedList.length === listBrand.length}
      >
        Tất cả
      </Checkbox>
      <CheckboxGroup
        options={listBrand as string[]}
        value={checkedList}
        onChange={onChange}
      />
    </BrandListContainer>
  );
};

export default BrandChecklist;
