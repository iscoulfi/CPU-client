import { createCollectionParams, CollectionData } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const createCollection = createAsyncThunk(
  'collection/createCollection',
  async ({
    title,
    topic,
    description,
    imgUrl,
    adFields,
  }: createCollectionParams) => {
    try {
      const { data } = await axios.post<CollectionData>('/collections', {
        title,
        topic,
        text: description,
        imgUrl,
        adFields,
      });

      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
