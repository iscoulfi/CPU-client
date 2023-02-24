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
  'item/removeItem',
  async ({ collId, itemId }: RemoveItemParams, { dispatch }) => {
    try {
      const { data } = await axios.delete<string>(
        `/items/delete/${collId}/${itemId}`
      );

      dispatch(getCollectionItems(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeAllItems = createAsyncThunk(
  'item/removeAllItems',
  async (collId: string) => {
    try {
      await axios.delete(`/items/remove/${collId}`);
    } catch (error) {
      console.log(error);
    }
  }
);
