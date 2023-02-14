import { Status } from '../auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getItemComments } from './asyncActions';
import { CommentSliceState, CommentData } from './types';

const initialComments: CommentData[] = [
  {
    _id: '',
    comment: '',
    author: '',
    authorId: '',
    createdAt: '',
  },
];

const initialState: CommentSliceState = {
  comments: initialComments,
  status: Status.IDLE, // idle | loading | success | error
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    refreshComments: (state, action: PayloadAction<CommentData>) => {
      state.comments = [action.payload, ...state.comments];
    },
  },

  extraReducers: builder => {
    builder.addCase(createComment.pending, state => {
      state.status = Status.LOADING;
    });
    builder.addCase(createComment.fulfilled, state => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(createComment.rejected, state => {
      state.status = Status.ERROR;
    });

    builder.addCase(getItemComments.pending, state => {
      state.status = Status.LOADING;
    });
    builder.addCase(getItemComments.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      if (action.payload) state.comments = action.payload;
    });
    builder.addCase(getItemComments.rejected, (state, action) => {
      state.status = Status.ERROR;
    });
  },
});

export const { refreshComments } = commentSlice.actions;
export default commentSlice.reducer;
