import Rating from 'components/Rating/Rating';
import { forwardRef, HTMLAttributes, useCallback, useId } from 'react';
import { ColorPalette } from 'constants/style.constant';
import moment from 'helpers/moment';
import Tooltip from 'antd/es/tooltip';
import { Empty, Spin } from 'antd';
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
    ...other
  } = props;
  const uniqueKey = useId();

  const handleChangeStar = useCallback((star: number) => {
    // TODO: Call API change Rating
  }, []);

  return (
    <CommentCardContainer
      ref={ref}
      {...other}
      key={`${uniqueKey}-${authorName}-${date}`}
    >
      <ImageWrapper>
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
    </CommentCardContainer>
  );
});

CommentCard.displayName = 'CommentCard';
export default CommentCard;
