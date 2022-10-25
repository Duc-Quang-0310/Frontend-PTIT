import { yupResolver } from '@hookform/resolvers/yup';
import TextArea from 'antd/lib/input/TextArea';
import * as Yup from 'yup';
import CommentCard from 'components/commentCard/CommentCard';
import ButtonUI from 'components/Button/ButtonUI';
import {
  FC,
  useId,
  useMemo,
  useCallback,
  useEffect,
  memo,
  useState
} from 'react';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import { notification, Rate } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { CommentList, CommentWithoutId } from 'services/client.interface';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  createNewCommentActionRequest,
  deleteCommentByIdActionRequest,
  getCommentListActionRequest
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

  const dispatch = useAppDispatch();
  const idUser = useAppSelector((globalState) => globalState.auth.user?._id);
  const { allComment, message, success } = useAppSelector(
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

      dispatch(createNewCommentActionRequest(newValue));
    },
    [dispatch, id, idUser]
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
    setOpenModal(false);
    notification[success ? 'success' : 'error']({
      message: 'Xóa bình luận',
      description: message
    });
  };

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
            content="Bình luận"
            onClick={handleSubmit(handleSubmitComment)}
            style={{ marginLeft: 'auto' }}
          />
        </FlexBetween>
      </InputBlock>

      {allComment.map((commentItem: CommentList) => (
        <CommentBlock key={commentItem._id}>
          <CommentCard
            authorName={`${commentItem.userProfile?.[0]?.lastName} ${commentItem.userProfile?.[0]?.firstName}`}
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
            commentUserID={commentItem._id}
            setOpenModal={setOpenModal}
            setIdComment={setIdComment}
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
