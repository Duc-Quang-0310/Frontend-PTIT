import { yupResolver } from '@hookform/resolvers/yup';
import TextArea from 'antd/lib/input/TextArea';
import * as Yup from 'yup';
import {
  FC,
  useId,
  useMemo,
  useCallback,
  useEffect,
  memo,
  useState
} from 'react';
import { notification, Rate } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { CommentList, CommentWithoutId } from 'services/client.interface';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import CommentCard from 'components/commentCard/CommentCard';
import ButtonUI from 'components/Button/ButtonUI';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  createNewCommentActionRequest,
  deleteCommentByIdActionRequest,
  getCommentListActionRequest,
  updateCommentAfterDelete,
  updateCommentByIdActionRequest,
  updateCommentListInGlobal
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

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idComment, setIdComment] = useState<string>();
  const [clickUpdate, setClickUpdate] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const idUser = useAppSelector((globalState) => globalState.auth.user?._id);
  const { allComment, message, success, updatedComment } = useAppSelector(
    (globalState) => globalState.comment
  );

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
    clearErrors,
    setFocus,
    setValue,
    control
  } = useForm<CommentFieldValues>({
    mode: 'onChange',
    defaultValues: {
      comment: '',
      star: 5
    },
    resolver: yupResolver(schema)
  });

  const handleSubmitComment = useCallback(
    (value: CommentFieldValues) => {
      const newValue: CommentWithoutId = {
        comment: value.comment,
        laptopId: id as string,
        rating: value.star,
        userId: idUser as string
      };

      if (clickUpdate) {
        dispatch(
          updateCommentByIdActionRequest({
            commentId: idComment as string,
            params: newValue
          })
        );
        dispatch(
          updateCommentListInGlobal({
            commentId: idComment as string,
            commentList: allComment,
            params: newValue
          })
        );
        notification.success({
          message: 'Cập nhật bình luận',
          description: message
        });
        setClickUpdate(false);
        setValue('star', 5);
      } else {
        dispatch(createNewCommentActionRequest(newValue));
        notification.success({
          message: 'Thêm mới bình luận',
          description: message
        });
      }
      setValue('comment', '');
    },
    [
      allComment,
      clickUpdate,
      dispatch,
      id,
      idComment,
      idUser,
      message,
      setValue
    ]
  );

  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const handleClickConfirmDelete = () => {
    dispatch(
      deleteCommentByIdActionRequest({
        commentId: idComment as string,
        userId: idUser as string
      })
    );
    success !== null &&
      success &&
      dispatch(
        updateCommentAfterDelete({
          commentId: idComment as string,
          commentList: allComment
        })
      );
    setOpenModal(false);
    notification[success ? 'success' : 'error']({
      message: 'Xóa bình luận',
      description: message
    });
  };

  const handleGetOpenModal = (open: boolean) => {
    setOpenModal(open);
  };

  const handleGetIdComment = (commentId?: string) => {
    setIdComment(commentId);
  };

  const handleClickUpdate = (click: boolean) => {
    setClickUpdate(click);
  };

  useEffect(() => {
    if (clickUpdate && updatedComment) {
      setFocus('comment');
      setValue('star', updatedComment?.rating);
      setValue('comment', updatedComment?.comment);
    }
  }, [clickUpdate, setFocus, setValue, updatedComment]);

  useEffect(() => {
    dispatch(getCommentListActionRequest(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (errors) {
      setFocus('comment');
    }
  }, [clearErrors, errors, setFocus]);

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
              onPressEnter={handleSubmit(handleSubmitComment)}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <FlexBetween style={{ marginTop: 15 }}>
          {errors && errors?.comment && (
            <div className="error-text">{String(errors?.comment?.message)}</div>
          )}

          <ButtonUI
            content={clickUpdate ? 'Cập nhật' : 'Bình luận'}
            onClick={handleSubmit(handleSubmitComment)}
            style={{ marginLeft: 'auto' }}
          />
        </FlexBetween>
      </InputBlock>

      {[...allComment].reverse().map((commentItem: CommentList) => (
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
            date={
              commentItem.userId.updatedAt
                ? commentItem.userId.updatedAt
                : commentItem.userId.createdAt
            }
            currentID={commentItem.userId._id}
            commentUserID={commentItem._id}
            getOpenModal={handleGetOpenModal}
            getIdComment={handleGetIdComment}
            getClickUpdate={handleClickUpdate}
          />
        </CommentBlock>
      ))}

      <ModalUI
        open={openModal}
        onCancel={handleCancelModal}
        modalTitle={'Xác nhận'}
        modalColorType="purple"
        content={'Bạn có chắc muốn xóa bình luận này'}
        onProceed={handleClickConfirmDelete}
        width={500}
      />
    </div>
  );
};

export default memo(ProductUserComment);
