import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentList, CommentWithoutId } from 'services/client.interface';

interface CommentState {
  allComment: CommentList[];
  message: string;
  success: boolean | null;
  loading: boolean;
}

const initialState: CommentState = {
  allComment: [],
  message: '',
  success: null,
  loading: false
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetCommentState: (state: CommentState) => ({
      ...state,
      allComment: [],
      message: '',
      success: null,
      loading: false
    }),
    createNewCommentActionRequest: (
      state: CommentState,
      action: PayloadAction<CommentWithoutId>
    ) => ({
      ...state,
      loading: true
    }),
    createNewCommentActionComplete: (
      state: CommentState,
      action: PayloadAction<{
        success: boolean;
        message: string;
        commentList: CommentList[];
      }>
    ) => ({
      ...state,
      loading: false,
      allComment: action.payload.commentList,
      message: action.payload.message,
      success: action.payload.success
    }),
    getCommentListActionRequest: (
      state: CommentState,
      action: PayloadAction<string>
    ) => ({
      ...state,
      loading: true
    }),
    getCommentListActionComplete: (
      state: CommentState,
      action: PayloadAction<CommentList[]>
    ) => ({
      ...state,
      allComment: action.payload,
      loading: false
    }),
    deleteCommentByIdActionRequest: (
      state: CommentState,
      action: PayloadAction<{ commentId: string; userId: string }>
    ) => ({
      ...state,
      loading: true
    }),
    deleteCommentByIdActionComplete: (
      state: CommentState,
      action: PayloadAction<{
        message: string;
        success: boolean;
      }>
    ) => ({
      ...state,
      loading: false,
      message: action.payload.message,
      success: action.payload.success
    }),
    updateCommentByIdActionRequest: (
      state: CommentState,
      action: PayloadAction<{ params: CommentWithoutId; commentId: string }>
    ) => ({
      ...state,
      loading: true
    }),
    updateCommentByIdActionComplete: (
      state: CommentState,
      action: PayloadAction<{ message: string; success: boolean }>
    ) => ({
      ...state,
      loading: false,
      message: action.payload.message,
      success: action.payload.success
    })
  }
});

export const {
  resetCommentState,
  createNewCommentActionRequest,
  createNewCommentActionComplete,
  getCommentListActionRequest,
  getCommentListActionComplete,
  deleteCommentByIdActionRequest,
  deleteCommentByIdActionComplete,
  updateCommentByIdActionRequest,
  updateCommentByIdActionComplete
} = commentSlice.actions;

export default commentSlice.reducer;
