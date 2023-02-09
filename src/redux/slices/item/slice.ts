import { ItemSliceState } from './types';
import { Status, MessageType } from '../auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCollectionItems, removeItem } from './asyncActions';

const initialState: ItemSliceState = {
  items: [],
  message: '',
  status: Status.IDLE, // idle | loading | success | error
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    refreshItems: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(c => c._id !== action.payload);
    },
  },

  extraReducers: builder => {
    builder.addCase(getCollectionItems.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });
    builder.addCase(getCollectionItems.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      }
    });
    builder.addCase(getCollectionItems.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });

    builder.addCase(removeItem.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = Status.SUCCESS;
        state.message = action.payload.message;
      }
    });
    builder.addCase(removeItem.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });
  },
});

export const { refreshItems } = itemSlice.actions;
export default itemSlice.reducer;
