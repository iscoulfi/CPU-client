import {
  createCollectionParams,
  CollectionData,
  updateCollectionParams,
} from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const createCollection = createAsyncThunk(
  'collection/createCollection',
  async ({ ...params }: createCollectionParams, { dispatch }) => {
    try {
      const { data } = await axios.post<CollectionData>('/collections', {
        ...params,
      });
      dispatch(getMyCollections(data.author));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMyCollections = createAsyncThunk(
  'collection/getMyCollections',
  async (userId: string) => {
    try {
      const { data } = await axios.get<CollectionData[]>(
        `/collections/user/${userId}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCollection = createAsyncThunk(
  'collection/getCollection',
  async (id: string) => {
    try {
      const { data } = await axios.get<CollectionData>(`/collections/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCollection = createAsyncThunk(
  'collection/updateCollection',
  async (
    { id, title, text, imgUrl, adFields }: updateCollectionParams,
    { dispatch }
  ) => {
    try {
      const { data } = await axios.put<CollectionData>(`/collections/${id}`, {
        title,
        text,
        imgUrl,
        adFields,
      });
      dispatch(getMyCollections(data.author));
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
      const { data } = await axios.delete<CollectionData>(`/collections/${id}`);
      dispatch(getMyCollections(data.author));
    } catch (error) {
      console.log(error);
    }
  }
);
