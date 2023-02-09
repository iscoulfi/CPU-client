import { MessageType } from './../auth/types';
import { ItemData, RemoveItemParams } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { refreshItems } from './slice';

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

export const removeItem = createAsyncThunk(
  'item/removeItems',
  async ({ collId, itemId }: RemoveItemParams, { dispatch }) => {
    try {
      const { data } = await axios.delete<MessageType>(
        `/items/${collId}/${itemId}`
      );
      dispatch(refreshItems(itemId));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
