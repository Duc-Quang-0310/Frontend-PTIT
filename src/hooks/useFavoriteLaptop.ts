import { notification } from 'antd';
import { updateFavoriteItem } from 'global/common/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useCallback, useMemo } from 'react';
import { FavoriteItem } from 'services/client.interface';

export const useFavoriteLaptop = (productId: string) => {
  const dispatch = useAppDispatch();
  const { favoriteItem, user } = useAppSelector((store) => store.auth);

  const removeOneLaptop = useCallback(
    (list: FavoriteItem[], id: string) => {
      const newList = [...list].filter((laptop) => laptop.id !== id);
      dispatch(updateFavoriteItem(newList));
      return notification.success({
        message: 'Xóa khỏi danh sách ưa thích thành công'
      });
    },
    [dispatch]
  );

  const inFavorite = useMemo(
    () =>
      favoriteItem.length && productId
        ? [...favoriteItem].some((laptop) => laptop.id === productId)
        : false,
    [favoriteItem, productId]
  );

  const handleUpdateFavoriteItem = useCallback(
    (params: FavoriteItem, type: 'change' | 'remove') => {
      const oldList = [...favoriteItem];

      //   if (!user) {
      //     return notification.error({
      //       message: 'Bạn cần đăng nhập để sử dụng chức năng này'
      //     });
      //   }

      if (type === 'remove') {
        return removeOneLaptop(oldList, params.id);
      }

      const existedLaptop = oldList.some((laptop) => laptop.id === params.id);

      if (existedLaptop) {
        return removeOneLaptop(oldList, params.id);
      }

      dispatch(updateFavoriteItem([...oldList, params]));

      return notification.success({
        message: 'Thêm vào danh sách ưa thích thành công'
      });
    },
    [dispatch, favoriteItem, removeOneLaptop, user]
  );

  return { handleUpdateFavoriteItem, inFavorite };
};
