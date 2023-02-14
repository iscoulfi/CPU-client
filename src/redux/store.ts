import { configureStore } from '@reduxjs/toolkit';
import collectionSlice from './slices/collection/slice';
import authSlice from './slices/auth/slice';
import itemSlice from './slices/item/slice';
import commentSlice from './slices/comment/slice';
import adminSlice from './slices/admin/slice';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    collection: collectionSlice,
    item: itemSlice,
    comment: commentSlice,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
