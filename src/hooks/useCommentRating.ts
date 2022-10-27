import { notification } from 'antd';
import { sampleSize } from 'lodash';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { CommentReturnExtend } from 'services/client.interface';
import { getCommentRatingMoreThan4 } from 'services/client.services';

export const useCommentRating = (randomSize = 2, reloadFetch = false) => {
  const [goodRating, setGoodRating] = useState<CommentReturnExtend[]>([]);
  const [loading, setLoading] = useState(false);

  const sortedComment = useMemo(() => {
    if (goodRating.length && !reloadFetch) {
      const randomData = sampleSize(goodRating, randomSize);
      return randomData.map((item) => ({
        authorName:
          `${item?.profile?.firstName} ${item?.profile?.lastName}` || '',
        content: item?.comment || '',
        userAvatar: item?.profile?.avatar || '',
        starRate: item?.rating,
        id: item?._id
      }));
    }
    return [];
  }, [goodRating, randomSize, reloadFetch]);

  const fetchRating = useCallback(() => {
    setLoading(true);
    getCommentRatingMoreThan4()
      .then((data) => {
        setGoodRating(data);
      })
      .catch((e) => {
        notification.error({
          message: e.response.message
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (reloadFetch || !goodRating.length) {
      fetchRating();
    }
  }, [fetchRating, goodRating.length, reloadFetch]);

  return { sortedComment, loading };
};
