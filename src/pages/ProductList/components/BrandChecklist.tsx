import { Dispatch, SetStateAction, useMemo, useState } from 'react';
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
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

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
    setIndeterminate(!!list.length && list.length < listBrand.length);
    setCheckAll(list.length === listBrand.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? (listBrand as string[]) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <BrandListContainer>
      <div className="title">Hãng</div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
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
