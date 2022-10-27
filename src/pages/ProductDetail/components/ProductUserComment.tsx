import { yupResolver } from '@hookform/resolvers/yup';
import TextArea from 'antd/lib/input/TextArea';
import * as Yup from 'yup';
import { FC, useId, useMemo, useCallback, useEffect, memo } from 'react';
import { notification, Rate } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { orderBy } from 'lodash';
import { CommentList, CommentWithoutId } from 'services/client.interface';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import CommentCard from 'components/commentCard/CommentCard';
import ButtonUI from 'components/Button/ButtonUI';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  createNewCommentActionRequest,
  deleteCommentByIdActionRequest,
  getCommentListActionComplete,
  getCommentListActionRequest,
  setDeletedComment,
  setUpdatedComment,
  updateCommentByIdActionRequest
} from 'global/common/comment/comment.slice';
import ModalUI from 'components/Modal/ModalUI';
import { CommentBlock, InputBlock } from '../style/LaptopDetail';

interface ProductUserCommentProps {
  id?: string;
}

interface CommentFieldValues {
  comment: string;
  star: 1 | 2 | 3 | 4 | 5;
}

const ProductUserComment: FC<ProductUserCommentProps> = ({ id }) => {
  const uniqueId = useId();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((globalState) => globalState.auth);
  const { allComment, updatedComment, loading, deletedComment } =
    useAppSelector((globalState) => globalState.comment);

  const sortedComment = useMemo(() => {
    if (allComment.length) {
      if (allComment.length === 1) {
        return allComment;
      }

      return orderBy(allComment, ['updatedAt'], ['desc']);
    }

    return [];
  }, [allComment]);

  const schema = useMemo(
    () =>
      Yup.object().shape({
        comment: Yup.string()
          .trim()
          .required('Bình luận không được để trống')
          .min(1, 'Bình luận quá ngắn')
          .max(400, 'Bình luận quá dài'),
        rating: Yup.number().min(1).max(5)
      }),
    []
  );

  const {
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    control,
    reset
  } = useForm<CommentFieldValues>({
    mode: 'onChange',
    defaultValues: {
      comment: '',
      star: 3
    },
    resolver: yupResolver(schema)
  });

  const handleSubmitComment = useCallback(
    (value: CommentFieldValues) => {
      if (user && id) {
        const convertedValue: CommentWithoutId = {
          comment: value.comment,
          laptopId: id,
          rating: value.star,
          userId: String(user._id),
          updatedAt: new Date()
        };

        if (updatedComment) {
          dispatch(
            updateCommentByIdActionRequest({
              commentId: updatedComment._id,
              params: {
                ...convertedValue,
                onSuccess: () => {
                  const updatedListComment: CommentList[] = [...allComment].map(
                    (comment) => {
                      if (comment._id === updatedComment._id) {
                        return {
                          _id: comment._id,
                          comment: value.comment,
                          laptopId: comment.laptopId,
                          rating: value.star,
                          userId: comment.userId,
                          updatedAt: new Date().toISOString(),
                          userProfile: comment?.userProfile
                        };
                      }
                      return comment;
                    }
                  );
                  dispatch(
                    getCommentListActionComplete(
                      orderBy(updatedListComment, ['updatedAt'], ['desc'])
                    )
                  );
                  dispatch(setUpdatedComment(null));
                  reset();
                }
              }
            })
          );
        } else {
          dispatch(
            createNewCommentActionRequest({
              ...convertedValue,
              onSuccess: () => {
                reset();
                dispatch(getCommentListActionRequest(id));
              }
            })
          );
        }
      }
    },
    [allComment, dispatch, id, reset, updatedComment, user]
  );

  useEffect(() => {
    if (updatedComment) {
      setValue('star', updatedComment?.rating);
      setValue('comment', updatedComment?.comment);
      setFocus('comment');
    } else {
      setValue('star', 3);
      setValue('comment', '');
    }
  }, [setFocus, setValue, updatedComment]);

  const handlePreSubmit = useCallback(() => {
    if (!user) {
      return notification.error({
        message: 'Bạn cần đăng nhập để sử dụng chức năng này'
      });
    }

    handleSubmit(handleSubmitComment)();
  }, [handleSubmit, handleSubmitComment, user]);

  const handleAbortUpdate = useCallback(() => {
    dispatch(setUpdatedComment(null));
  }, [dispatch]);

  const handleDeleteComment = useCallback(() => {
    if (deletedComment && user) {
      dispatch(
        deleteCommentByIdActionRequest({
          commentId: deletedComment._id,
          userId: user._id,
          onSuccess: () => {
            const newCommentList = [...allComment].filter(
              (each) => each._id !== deletedComment._id
            );
            dispatch(
              getCommentListActionComplete(
                orderBy(newCommentList, ['updatedAt'], ['desc'])
              )
            );
            dispatch(setDeletedComment(null));
          }
        })
      );
    }
  }, [allComment, deletedComment, dispatch, user]);

  useEffect(() => {
    if (errors) {
      setFocus('comment');
    }
  }, [errors, setFocus]);

  useEffect(
    () => () => {
      dispatch(setUpdatedComment(null));
      dispatch(setDeletedComment(null));
    },
    [dispatch]
  );

  return (
    <div key={uniqueId}>
      <InputBlock>
        <FlexBetween>
          <h3>Đánh giá</h3>
          <Controller
            name="star"
            control={control}
            render={({ field: { value, onChange, ref } }) => (
              <Rate ref={ref} value={value} onChange={onChange} />
            )}
          />
        </FlexBetween>
        <Controller
          name="comment"
          control={control}
          render={({ field: { value, onChange, ref } }) => (
            <TextArea
              ref={ref}
              rows={5}
              autoSize={false}
              allowClear
              placeholder="Nhập bình luận của bạn"
              onPressEnter={handlePreSubmit}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <FlexBetween style={{ marginTop: 15 }}>
          {errors && errors?.comment && (
            <div className="error-text">{String(errors?.comment?.message)}</div>
          )}

          <>
            <ButtonUI
              content={updatedComment ? 'Cập nhật' : 'Bình luận'}
              onClick={handlePreSubmit}
              style={{ marginLeft: 'auto' }}
              loading={loading}
            />

            {updatedComment && (
              <ButtonUI
                content="Hủy"
                onClick={handleAbortUpdate}
                style={{ marginLeft: 12 }}
                loading={loading}
              />
            )}
          </>
        </FlexBetween>
      </InputBlock>

      {sortedComment.map((commentItem: CommentList) => (
        <CommentBlock key={commentItem._id}>
          <CommentCard
            authorName={`${commentItem.userProfile?.[0]?.firstName} ${commentItem.userProfile?.[0]?.lastName}`}
            content={commentItem.comment}
            userAvatar={`${commentItem.userProfile?.[0]?.avatar}`}
            starRate={commentItem.rating}
            disableStar
            style={{
              height: 130
            }}
            imgWrapperWidth="100px"
            date={commentItem?.updatedAt}
            currentID={commentItem._id}
            commentUserID={commentItem.userId._id}
          />
        </CommentBlock>
      ))}

      <ModalUI
        open={!!deletedComment}
        onCancel={() => dispatch(setDeletedComment(null))}
        modalTitle={'Xác nhận xóa bình luận'}
        modalColorType="purple"
        content={'Bạn có chắc muốn xóa bình luận này'}
        width={500}
        onProceed={handleDeleteComment}
      />
    </div>
  );
};

export default memo(ProductUserComment);
