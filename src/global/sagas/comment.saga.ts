import { PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import {
  createNewCommentActionComplete,
  createNewCommentActionRequest,
  deleteCommentByIdActionComplete,
  deleteCommentByIdActionRequest,
  getCommentListActionComplete,
  getCommentListActionRequest,
  resetCommentState,
  updateCommentByIdActionComplete,
  updateCommentByIdActionRequest
} from 'global/common/comment/comment.slice';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CommentList, CommentWithoutId } from 'services/client.interface';
import {
  addNewComment,
  deleteCommentById,
  getCommentList,
  updateCommentById
} from 'services/client.services';

function* createNewCommentActionSaga(action: PayloadAction<CommentWithoutId>) {
  try {
    const { onSuccess, ...other } = action.payload;

    yield put(resetCommentState());

    yield call(() => addNewComment(other));

    const res: CommentList[] = yield call(() =>
      getCommentList(action.payload.laptopId)
    );

    onSuccess?.();
    notification.success({
      message: 'Bình luận của bạn đã được ghi nhận'
    });
    yield put(
      createNewCommentActionComplete({
        message: 'Bình luận của bạn đã được ghi nhận',
        success: true,
        commentList: res
      })
    );
  } catch (error) {
    notification.success({
      message: 'Có lỗi xảy ra khi bình luận'
    });
    createNewCommentActionComplete({
      message: 'Có lỗi xảy ra khi bình luận',
      success: false,
      commentList: []
    });
  }
}

function* getCommentListActionSaga(action: PayloadAction<string>) {
  try {
    const res: CommentList[] = yield call(() => getCommentList(action.payload));
    yield put(getCommentListActionComplete(res));
  } catch (error) {
    yield put(getCommentListActionComplete([]));
  }
}

function* deleteCommentByIdActionSaga(
  action: PayloadAction<{
    commentId: string;
    userId: string;
    onSuccess?: Function;
  }>
) {
  const { commentId, userId, onSuccess } = action.payload;
  try {
    yield call(() => deleteCommentById(commentId, { userId }));
    onSuccess?.();
    notification.success({
      message: 'Xóa bình luận thành công'
    });
    yield put(
      deleteCommentByIdActionComplete({
        message: 'Xóa bình luận thành công',
        success: true
      })
    );
  } catch (error) {
    notification.error({
      message: 'Xóa bình luận thất bại, vui lòng thử lại sau'
    });
    yield put(
      deleteCommentByIdActionComplete({
        message: 'Bạn xóa bình luận thất bại, vui lòng thử lại sau',
        success: false
      })
    );
  }
}

function* updateCommentByIdActionSaga(
  action: PayloadAction<{ params: CommentWithoutId; commentId: string }>
) {
  const { commentId, params } = action.payload;
  const { onSuccess, ...other } = params;
  try {
    yield call(() => updateCommentById(commentId, other));
    onSuccess?.();
    notification.success({
      message: 'Cập nhật bình luận thành công'
    });
    yield put(
      updateCommentByIdActionComplete({
        message: 'Bạn đã cập nhật bình luận thành công',
        success: true
      })
    );
  } catch (error) {
    notification.success({
      message: 'Cập nhật bình luận thất bại, vui lòng thử lại sau'
    });
    yield put(
      updateCommentByIdActionComplete({
        message: 'Bạn cập nhật bình luận thất bại, vui lòng thử lại sau',
        success: false
      })
    );
  }
}

export default function* commentSaga() {
  yield all([
    takeLatest(createNewCommentActionRequest.type, createNewCommentActionSaga),
    takeLatest(getCommentListActionRequest.type, getCommentListActionSaga),
    takeLatest(
      deleteCommentByIdActionRequest.type,
      deleteCommentByIdActionSaga
    ),
    takeLatest(updateCommentByIdActionRequest.type, updateCommentByIdActionSaga)
  ]);
}
