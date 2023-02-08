import { RootState } from './../../store';
import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, getMe } from './asyncActions';
import { Status, AuthSliceState, MessageType } from './types';

const initialState: AuthSliceState = {
  user: null,
  token: '',
  message: '',
  status: Status.IDLE, // idle | loading | success | error
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = '';
      state.message = '';
      state.status = Status.IDLE;
    },
    reduceMessage: state => {
      state.message = '';
    },
  },

  extraReducers: builder => {
    //Register
    builder.addCase(registerUser.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.message = action.payload.message;
        state.user = action.payload.newUser;
        state.token = action.payload.token;
        state.status = Status.SUCCESS;
      }
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });

    //Login
    builder.addCase(loginUser.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = Status.SUCCESS;
      }
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });

    // Check auth
    builder.addCase(getMe.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });

    builder.addCase(getMe.fulfilled, (state, action) => {
      if (action.payload) {
        state.message = '';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = Status.SUCCESS;
      }
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });
  },
});

export const checkIsAuth = (state: RootState) => Boolean(state.auth.token);
export const { logout, reduceMessage } = authSlice.actions;
export default authSlice.reducer;
