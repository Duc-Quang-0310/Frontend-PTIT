import { Col, Row } from 'antd';
import CommentCard from 'components/commentCard/CommentCard';
import { Logo } from 'components/Images/Logo';
import { useCommentRating } from 'hooks/useCommentRating';
import { FC, memo, useMemo } from 'react';
import { UserFeedBackContainer } from '../style/UserFeedback';
import '../style/UserFeedback.css';

const UserFeedback: FC = () => {
  const { sortedComment, loading } = useCommentRating();

  const DEFAULT_VALUE = useMemo(
    () => (
      <>
        <Col xxl={10} xl={12} lg={24} className="user-feedback">
          <CommentCard
            authorName="Jenny Wilson"
            content="We love Discovery Our designers were using it for their projects, so we already knew what kind of design they want."
            userAvatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            starRate={5}
          />
        </Col>
        <Col
          xxl={10}
          xl={12}
          lg={24}
          style={{ marginLeft: 'auto' }}
          className="user-feedback"
        >
          <CommentCard
            authorName="Kenny Wilson"
            content="We love Discovery Our designers were using it for their projects, so we already knew what kind of design they want."
            userAvatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            starRate={5}
            disableStar
          />
        </Col>
      </>
    ),
    []
  );

  return (
    <UserFeedBackContainer key="UserFeedBackContainer">
      <p>3940+ Người dùng đã mua sản phẩm</p>
      <h2>
        Hãy nghe đánh giá của khách hàng trước khi
        <br /> trải nghiệm dịch vụ tại{' '}
        <Logo blockHeight={30} blockWidth={200} />
      </h2>
      <Row style={{ justifyContent: 'space-evenly' }}>
        {sortedComment.length && !loading
          ? sortedComment.map((comment) => (
              <Col
                xxl={10}
                xl={12}
                lg={24}
                className="user-feedback"
                key={comment.id}
              >
                <CommentCard
                  authorName={comment.authorName}
                  content={comment.content}
                  userAvatar={comment.userAvatar}
                  starRate={comment.starRate}
                />
              </Col>
            ))
          : DEFAULT_VALUE}
      </Row>
    </UserFeedBackContainer>
  );
};

export default memo(UserFeedback);
