import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentList, CommentWithoutId } from 'services/client.interface';

interface CommentState {
  allComment: CommentList[];
  updatedComment: CommentList | null;
  deletedComment: CommentList | null;
  message: string;
  success: boolean | null;
  loading: boolean;
}

const initialState: CommentState = {
  allComment: [],
  updatedComment: null,
  deletedComment: null,
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
      updatedComment: null,
      message: '',
      success: null,
      loading: false
    }),
    updateCommentAfterDelete: (
      state: CommentState,
      action: PayloadAction<{ commentId: string; commentList: CommentList[] }>
    ) => {
      const { commentId, commentList } = action.payload;
      const res = commentList.filter(
        (commentItem: CommentList) => commentItem._id !== commentId
      );
      return {
        ...state,
        allComment: res,
        loading: false
      };
    },
    getCommentById: (
      state: CommentState,
      action: PayloadAction<{ commentId: string; commentList: CommentList[] }>
    ) => {
      const { commentId, commentList } = action.payload;
      let res: CommentList | null = null;
      commentList.forEach((commentItem: CommentList) => {
        if (commentItem._id === commentId) res = commentItem;
      });
      return {
        ...state,
        updatedComment: res,
        loading: false
      };
    },
    updateCommentListInGlobal: (
      state: CommentState,
      action: PayloadAction<{
        commentId: string;
        commentList: CommentList[];
        params: CommentWithoutId;
      }>
    ) => {
      const { commentId, commentList, params } = action.payload;
      const res: CommentList[] = commentList.map((commentItem: CommentList) => {
        if (commentItem._id === commentId) {
          return {
            ...commentItem,
            rating: params.rating,
            comment: params.comment
          };
        }
        return commentItem;
      });
      return {
        ...state,
        allComment: res,
        loading: false
      };
    },
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
      action: PayloadAction<{
        commentId: string;
        userId: string;
        onSuccess?: Function;
      }>
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
    }),
    setUpdatedComment: (
      state: CommentState,
      action: PayloadAction<CommentList | null>
    ) => ({
      ...state,
      updatedComment: action.payload
    }),
    setDeletedComment: (
      state: CommentState,
      action: PayloadAction<CommentList | null>
    ) => ({
      ...state,
      deletedComment: action.payload
    })
  }
});

export const {
  resetCommentState,
  getCommentById,
  updateCommentAfterDelete,
  updateCommentListInGlobal,
  createNewCommentActionRequest,
  createNewCommentActionComplete,
  getCommentListActionRequest,
  getCommentListActionComplete,
  deleteCommentByIdActionRequest,
  deleteCommentByIdActionComplete,
  updateCommentByIdActionRequest,
  updateCommentByIdActionComplete,
  setUpdatedComment,
  setDeletedComment
} = commentSlice.actions;

export default commentSlice.reducer;
