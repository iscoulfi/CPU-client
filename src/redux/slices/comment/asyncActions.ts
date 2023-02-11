import { CommentData, CreateCommentParams } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { refreshComments } from './slice';

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ itemId, comment, author }: CreateCommentParams, { dispatch }) => {
    try {
      const { data } = await axios.post<CommentData>(`/comments/${itemId}`, {
        comment,
        author,
      });
      dispatch(refreshComments(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getItemComments = createAsyncThunk(
  'comment/getItemComments',
  async (itemId: string) => {
    try {
      const { data } = await axios.get<CommentData[]>(
        `/items/comments/${itemId}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
