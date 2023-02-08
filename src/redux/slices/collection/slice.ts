import { Status, MessageType } from '../auth/types';
import { CollectionSliceState, CollectionData } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createCollection,
  getMyCollections,
  removeCollection,
  updateCollection,
} from './asyncActions';

const initialState: CollectionSliceState = {
  collections: [],
  message: '',
  status: Status.IDLE, // idle | loading | success | error
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    refreshCollections: (state, action: PayloadAction<string>) => {
      state.collections = state.collections.filter(
        c => c._id !== action.payload
      );
    },
    updateCollections: (state, action: PayloadAction<CollectionData>) => {
      const i = state.collections.findIndex(c => c._id === action.payload._id);
      state.collections.splice(i, 1, action.payload);
    },
  },

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

    builder.addCase(removeCollection.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });
    builder.addCase(removeCollection.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = Status.SUCCESS;
        state.message = action.payload.message;
      }
    });
    builder.addCase(removeCollection.rejected, (state, action) => {
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
        state.message = action.payload.message;
      }
    });
    builder.addCase(updateCollection.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });
  },
});

export const { refreshCollections, updateCollections } =
  collectionSlice.actions;
export default collectionSlice.reducer;
