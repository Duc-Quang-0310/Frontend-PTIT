import Rating from 'components/Rating/Rating';
import {
  Dispatch,
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  SetStateAction,
  useCallback,
  useId,
  useMemo
} from 'react';
import { ColorPalette } from 'constants/style.constant';
import moment from 'helpers/moment';
import Tooltip from 'antd/es/tooltip';
import { Empty, Popover, Spin } from 'antd';
import StackUI from 'components/Stack/StackUI';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import {
  CommentCardContainer,
  ImageWrapper,
  ContentWrapper,
  TopSection,
  FlexBetween,
  BoldTitle,
  DateTitle,
  BoldAuthor
} from './CommentCard.style';

interface CommentCardProps extends HTMLAttributes<HTMLDivElement> {
  userAvatar: string;
  content: string;
  authorName: string;
  date?: string | Date;
  starRate?: number;
  loading?: boolean;
  currentID?: string;
  commentUserID?: string;
  disableStar?: boolean;
  imgWrapperWidth?: string;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  setIdComment?: Dispatch<SetStateAction<string | undefined>>;
}

const CommentCard = forwardRef<any, CommentCardProps>((props, ref) => {
  const {
    userAvatar,
    content,
    authorName,
    date = new Date(),
    starRate = 0,
    currentID,
    commentUserID,
    loading,
    disableStar = false,
    imgWrapperWidth,
    setOpenModal,
    setIdComment,
    ...other
  } = props;
  const uniqueKey = useId();

  const handleChangeStar = useCallback((star: number) => {
    // TODO: Call API change Rating
  }, []);

  const handleClickEditBtn = (e: MouseEvent<HTMLDivElement>) => {
    console.log('e', e);
  };

  const handleClickDeleteBtn = () => {
    setOpenModal && setOpenModal(true);
    setIdComment && setIdComment(commentUserID);
  };

  const tooltipMoreMemo = useMemo(() => {
    if (!commentUserID) {
      return null;
    }
    return (
      <>
        <StackUI
          width={160}
          icon={<EditOutlined />}
          content="Sửa"
          onClick={(e) => console.log(e)}
        />
        <StackUI
          width={160}
          icon={<DeleteOutlined />}
          content="Xóa"
          onClick={handleClickDeleteBtn}
        />
      </>
    );
  }, [commentUserID, handleClickDeleteBtn]);

  return (
    <CommentCardContainer
      ref={ref}
      {...other}
      key={`${uniqueKey}-${authorName}-${date}`}
    >
      <ImageWrapper itemProp={imgWrapperWidth}>
        {!loading ? (
          <img alt={userAvatar} src={userAvatar} />
        ) : (
          <Spin style={{ margin: 'auto' }} size="large" />
        )}
      </ImageWrapper>
      <ContentWrapper>
        <div>
          {loading ? (
            <Empty style={{ margin: 'auto' }} />
          ) : (
            <>
              <TopSection>
                <Rating
                  handleOnChangeStar={handleChangeStar}
                  disabled={disableStar || currentID === commentUserID}
                  style={{ color: ColorPalette.purpleMain }}
                  defaultValue={starRate}
                />
                <Tooltip title={content}>
                  <BoldTitle>"{content}"</BoldTitle>
                </Tooltip>
              </TopSection>

              <FlexBetween>
                <BoldAuthor>{authorName}</BoldAuthor>
                <DateTitle>{moment(date).format('Do MMM, YYYY')}</DateTitle>
              </FlexBetween>
            </>
          )}
        </div>
      </ContentWrapper>
      <Popover content={tooltipMoreMemo} placement="left" trigger="click">
        <MoreOutlined
          style={{
            cursor: 'pointer',
            fontSize: 18,
            color: ColorPalette.gray_3_1,
            position: 'absolute',
            top: 10,
            right: 25,
            userSelect: 'none'
          }}
        />
      </Popover>
    </CommentCardContainer>
  );
});

CommentCard.displayName = 'CommentCard';
export default CommentCard;
