import { PayloadAction } from '@reduxjs/toolkit';
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
    yield put(resetCommentState());

    yield call(() => addNewComment(action.payload));

    yield put(
      createNewCommentActionComplete({
        message: 'Bạn đã bình luận thành công',
        success: true
      })
    );
  } catch (error) {
    createNewCommentActionComplete({
      message: 'Bạn đã bình luận không thành công',
      success: false
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
  action: PayloadAction<{ commentId: string; userId: string }>
) {
  const { commentId, userId } = action.payload;
  try {
    yield call(() => deleteCommentById(commentId, { userId }));
    yield put(
      deleteCommentByIdActionComplete({
        message: 'Bạn đã xóa bình luận thành công',
        success: true
      })
    );
  } catch (error) {
    yield put(
      deleteCommentByIdActionComplete({
        message: 'Bạn xóa bình luận không thành công',
        success: false
      })
    );
  }
}

function* updateCommentByIdActionSaga(
  action: PayloadAction<{ params: CommentWithoutId; commentId: string }>
) {
  const { commentId, params } = action.payload;
  try {
    yield call(() => updateCommentById(commentId, params));
    yield put(
      updateCommentByIdActionComplete({
        message: 'Bạn đã cập nhật bình luận thành công',
        success: true
      })
    );
  } catch (error) {
    yield put(
      updateCommentByIdActionComplete({
        message: 'Bạn cập nhật bình luận không thành công',
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
