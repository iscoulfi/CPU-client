import { UsersData, updateUserProps } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

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
  async (id: string) => {
    try {
      const { data } = await axios.delete<{ id: string }>(`/auth/${id}`);
      return data.id;
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
