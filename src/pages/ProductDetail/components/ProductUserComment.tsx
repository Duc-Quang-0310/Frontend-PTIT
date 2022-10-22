import { yupResolver } from '@hookform/resolvers/yup';
import TextArea from 'antd/lib/input/TextArea';
import * as Yup from 'yup';
import CommentCard from 'components/commentCard/CommentCard';
import ButtonUI from 'components/Button/ButtonUI';
import { FC, useId, useMemo, useCallback, useEffect, memo } from 'react';
import { FlexBetween } from 'components/commentCard/CommentCard.style';
import { Rate } from 'antd';
import { FieldValues, useForm, Controller } from 'react-hook-form';
import { CommentBlock, InputBlock } from '../style/LaptopDetail';

interface ProductUserCommentProps {
  id?: string;
}

const ProductUserComment: FC<ProductUserCommentProps> = ({ id }) => {
  const uniqueId = useId();

  const schema = useMemo(
    () =>
      Yup.object().shape({
        comment: Yup.string()
          .trim()
          .min(1, 'Bình luận quá ngắn')
          .max(400, 'Bình luận quá dài')
          .required('Bình luận không được để trống'),
        star: Yup.number().min(0).max(5)
      }),
    []
  );

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    setFocus,
    control
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      comment: '',
      star: 3
    },
    resolver: yupResolver(schema)
  });

  const handleSubmitComment = useCallback((value: any) => {
    // Call API
  }, []);

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
              onPressEnter={() => handleSubmit(handleSubmitComment)}
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
            onClick={() => handleSubmit(handleSubmitComment)}
            style={{ marginLeft: 'auto' }}
          />
        </FlexBetween>
      </InputBlock>
      <CommentBlock>
        <CommentCard
          authorName="Kenny Wilson"
          content="We love Discovery Our designers were using it for their projects, so we already knew what kind of design they want."
          userAvatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          starRate={5}
          disableStar
          style={{
            height: 130
          }}
          imgWrapperWidth="100px"
        />
      </CommentBlock>
    </div>
  );
};

export default memo(ProductUserComment);
