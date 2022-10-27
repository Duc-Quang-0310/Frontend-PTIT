import Rating from 'components/Rating/Rating';
import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useId,
  useMemo,
  useState
} from 'react';
import { ColorPalette } from 'constants/style.constant';
import moment from 'helpers/moment';
import Tooltip from 'antd/es/tooltip';
import { Empty, Popover, Spin } from 'antd';
import StackUI from 'components/Stack/StackUI';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  setDeletedComment,
  setUpdatedComment
} from 'global/common/comment/comment.slice';
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
  getOpenModal?: (open: boolean) => void;
  getIdComment?: (id?: string) => void;
  getClickUpdate?: (click: boolean) => void;
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
    ...other
  } = props;
  const uniqueKey = useId();
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { allComment } = useAppSelector((state) => state.comment);
  const { user } = useAppSelector((globalState) => globalState.auth);

  const handleClickPopoverWithAction = useCallback(
    (action: 'update' | 'delete') => {
      const currentItem = allComment.find((each) => each?._id === currentID);
      if (currentItem) {
        if (action === 'update') {
          return dispatch(setUpdatedComment(currentItem));
        }
        dispatch(setDeletedComment(currentItem));
      }
    },
    [allComment, currentID, dispatch]
  );

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
          onClick={() => handleClickPopoverWithAction('update')}
        />
        <StackUI
          width={160}
          icon={<DeleteOutlined />}
          content="Xóa"
          onClick={() => handleClickPopoverWithAction('delete')}
        />
      </>
    );
  }, [commentUserID, handleClickPopoverWithAction]);

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
                  disabled={disableStar || currentID === commentUserID}
                  style={{ color: ColorPalette.purpleMain }}
                  value={starRate}
                />
                <Tooltip title={content}>
                  <BoldTitle>"{content}"</BoldTitle>
                </Tooltip>
              </TopSection>

              <FlexBetween>
                <BoldAuthor>{authorName}</BoldAuthor>
                <DateTitle>
                  {moment(date).format('Do MMM, YYYY, HH:mm:ss')}
                </DateTitle>
              </FlexBetween>
            </>
          )}
        </div>
      </ContentWrapper>
      {user && commentUserID === user._id && (
        <Popover
          content={tooltipMoreMemo}
          placement="left"
          trigger="click"
          open={openPopover}
          onOpenChange={(visible) => setOpenPopover(visible)}
        >
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
      )}
    </CommentCardContainer>
  );
});

CommentCard.displayName = 'CommentCard';
export default CommentCard;
