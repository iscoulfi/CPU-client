import { Status, MessageType } from '../auth/types';
import { CollectionSliceState } from './types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createCollection,
  getCollection,
  getMyCollections,
  updateCollection,
} from './asyncActions';

const initialState: CollectionSliceState = {
  collections: [],
  collection: null,
  message: '',
  status: Status.IDLE, // idle | loading | success | error
};

const collectionSlice = createSlice({
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
        state.status = Status.SUCCESS;
        if (action.payload.message) state.message = action.payload.message;
      }
    });
    builder.addCase(createCollection.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });

    builder.addCase(getMyCollections.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });
    builder.addCase(getMyCollections.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = Status.SUCCESS;
        state.collections = action.payload;
      }
    });
    builder.addCase(getMyCollections.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });

    builder.addCase(updateCollection.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });
    builder.addCase(updateCollection.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = Status.SUCCESS;
        state.collection = action.payload;
      }
    });
    builder.addCase(updateCollection.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });

    builder.addCase(getCollection.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });
    builder.addCase(getCollection.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = Status.SUCCESS;
        state.collection = action.payload;
      }
    });
    builder.addCase(getCollection.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });
  },
});

export default collectionSlice.reducer;
