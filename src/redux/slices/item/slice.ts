import { ItemSliceState, ItemData } from './types';
import { Status, MessageType } from '../auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCollectionItems, getItem, removeItem } from './asyncActions';

const initialItem = {
  _id: '',
  title: '',
  tags: [''],
  coll: '',
  likes: '',
  comments: [''],
  createdAt: '',
};

const initialState: ItemSliceState = {
  items: [],
  item: initialItem,
  message: '',
  status: Status.IDLE, // idle | loading | success | error
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<ItemData>) => {
      state.item = action.payload;
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

    builder.addCase(getItem.pending, state => {
      state.message = '';
      state.status = Status.LOADING;
    });
    builder.addCase(getItem.fulfilled, (state, action) => {
      if (action.payload) {
        state.status = Status.SUCCESS;
        state.item = action.payload;
      }
    });
    builder.addCase(getItem.rejected, (state, action) => {
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
        state.items = state.items.filter(c => c._id !== action.payload);
      }
    });
    builder.addCase(removeItem.rejected, (state, action) => {
      state.message = (action.payload as MessageType).message;
      state.status = Status.ERROR;
    });
  },
});

export const { setItem } = itemSlice.actions;
export default itemSlice.reducer;
