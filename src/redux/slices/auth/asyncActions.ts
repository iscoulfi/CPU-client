import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterUserParams, LoginUserParams } from './types';
import axios from '../../../utils/axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }: RegisterUserParams) => {
    try {
      const { data } = await axios.post('/auth/register', {
        username,
        email,
        password,
      });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('id', data.newUser.roles[0]);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: LoginUserParams) => {
    try {
      const { data } = await axios.post('/auth/login', {
        username,
        password,
      });

      if (data.token) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('role', data.user.roles[0]);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');

    return data;
  } catch (error) {
    console.log(error);
  }
});
