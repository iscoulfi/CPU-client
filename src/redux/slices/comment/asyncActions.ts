import { CommentData, CreateCommentParams } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ itemId, comment, author }: CreateCommentParams) => {
    try {
      const { data } = await axios.post<CommentData[]>(`/comments/${itemId}`, {
        comment,
        author,
      });
      return data;
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
