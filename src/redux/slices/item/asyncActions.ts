import { ItemData, RemoveItemParams } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getCollectionItems = createAsyncThunk(
  'item/getCollectionItems',
  async (collId: string) => {
    try {
      const { data } = await axios.get<ItemData[]>(`/items/coll/${collId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getItem = createAsyncThunk('item/getItem', async (id: string) => {
  try {
    const { data } = await axios.get<ItemData>(`/items/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removeItem = createAsyncThunk(
  'item/removeItems',
  async ({ collId, itemId }: RemoveItemParams) => {
    try {
      const { data } = await axios.delete<string>(`/items/${collId}/${itemId}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
