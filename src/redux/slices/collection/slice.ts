import { Status, MessageType } from '../auth/types';
import { CollectionSliceState } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { createCollection } from './asyncActions';

const initialState: CollectionSliceState = {
  collection: null,
  message: '',
  status: Status.IDLE, // idle | loading | success | error
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(createCollection.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });

    builder.addCase(createCollection.fulfilled, (state, action) => {
      if (action.payload) {
        state.message = action.payload.message;
        state.collection = action.payload;
        state.status = Status.SUCCESS;
      }
    });

    builder.addCase(createCollection.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });
  },
});

export default collectionSlice.reducer;
