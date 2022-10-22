import { getAllLaptopRequest } from 'global/common/laptop/laptop.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';

export const useLaptop = (randomSize = 4) => {
  const dispatch = useAppDispatch();
  const { allLaptop } = useAppSelector((store) => store.laptop);

  const randomProduct = useMemo(() => {
    if (allLaptop.length !== 0) {
      return _.sampleSize(allLaptop, randomSize);
    }
    return [];
  }, [allLaptop, randomSize]);

  useEffect(() => {
    dispatch(getAllLaptopRequest());
  }, [dispatch]);

  return { randomProduct };
};
