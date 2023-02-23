import { Status } from '../auth/types';
import { createSlice } from '@reduxjs/toolkit';
import { getAll, removeUser, updateUser } from './asyncActions';
import { AdminSliceState, UsersData } from './types';

const initialUsers: UsersData[] = [
  {
    _id: '',
    username: '',
    email: '',
    roles: [''],
    statusUser: '',
    createdAt: '',
  },
];

const initialState: AdminSliceState = {
  users: initialUsers,
  status: Status.IDLE, // idle | loading | success | error
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getAll.pending, state => {
      state.status = Status.LOADING;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      if (action.payload) state.users = action.payload;
    });
    builder.addCase(getAll.rejected, state => {
      state.status = Status.ERROR;
    });

    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload) state.users = action.payload;
    });
  },
});

export default adminSlice.reducer;
