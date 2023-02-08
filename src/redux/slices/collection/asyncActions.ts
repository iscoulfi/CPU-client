import { MessageType } from './../auth/types';
import {
  createCollectionParams,
  CollectionData,
  updateCollectionParams,
} from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { refreshCollections, updateCollections } from './slice';

export const createCollection = createAsyncThunk(
  'collection/createCollection',
  async ({ ...params }: createCollectionParams) => {
    try {
      const { data } = await axios.post<CollectionData>('/collections', {
        ...params,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMyCollections = createAsyncThunk(
  'collection/getMyCollections',
  async () => {
    try {
      const { data } = await axios.get<CollectionData[]>(
        '/collections/user/me'
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCollection = createAsyncThunk(
  'collection/updateCollection',
  async ({ id, title, text, imgUrl }: updateCollectionParams, { dispatch }) => {
    try {
      const { data } = await axios.put(`/collections/${id}`, {
        title,
        text,
        imgUrl,
      });
      if (data) {
        dispatch(updateCollections(data));
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCollection = createAsyncThunk(
  'collection/removeCollection',
  async (id: string, { dispatch }) => {
    try {
      const { data } = await axios.delete<MessageType>(`/collections/${id}`);
      dispatch(refreshCollections(id));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
