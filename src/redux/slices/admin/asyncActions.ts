import { UsersData, updateUserProps } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { removeAllCollections } from '../collection/asyncActions';

export const getAll = createAsyncThunk('admin/getAll', async () => {
  try {
    const { data } = await axios.get<{ users: UsersData[] }>('/auth/all');

    return data.users;
  } catch (error) {
    console.log(error);
  }
});

export const removeUser = createAsyncThunk(
  'admin/removeUser',
  async (id: string, { dispatch }) => {
    try {
      const { data } = await axios.delete<string[]>(`/auth/${id}`);

      dispatch(removeAllCollections({ id, urls: data }));

      return id;
    } catch (e) {
      console.log(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ userId, prop }: updateUserProps) => {
    try {
      const { data } = await axios.put<UsersData[]>(`/auth/${userId}`, {
        prop,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
