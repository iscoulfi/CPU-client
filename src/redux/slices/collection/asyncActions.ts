import { removeAllItems } from '../item/asyncActions';
import {
  createCollectionParams,
  CollectionData,
  updateCollectionParams,
  removeCollectionParams,
  removeAllCollectionsParams,
} from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { storage } from '../../../assets/firebase';
import { deleteObject, ref } from 'firebase/storage';

export const createCollection = createAsyncThunk(
  'collection/createCollection',
  async ({ ...params }: createCollectionParams, { dispatch }) => {
    try {
      const { data } = await axios.post<CollectionData>('/collections', {
        ...params,
      });
      dispatch(getMyCollections(data.author));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMyCollections = createAsyncThunk(
  'collection/getMyCollections',
  async (userId: string) => {
    try {
      const { data } = await axios.get<CollectionData[]>(
        `/collections/user/${userId}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCollection = createAsyncThunk(
  'collection/getCollection',
  async (id: string) => {
    try {
      const { data } = await axios.get<CollectionData>(`/collections/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCollection = createAsyncThunk(
  'collection/updateCollection',
  async (
    { id, title, text, imgUrl, adFields }: updateCollectionParams,
    { dispatch }
  ) => {
    try {
      const { data } = await axios.put<CollectionData>(`/collections/${id}`, {
        title,
        text,
        imgUrl,
        adFields,
      });
      dispatch(getMyCollections(data.author));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCollection = createAsyncThunk(
  'collection/removeCollection',
  async ({ id, url }: removeCollectionParams, { dispatch }) => {
    if (url) {
      let fileRef = ref(storage, url);
      deleteObject(fileRef);
    }
    try {
      const { data } = await axios.delete<CollectionData>(
        `/collections/delete/${id}`
      );
      dispatch(getMyCollections(data.author));
      dispatch(removeAllItems(id));
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeAllCollections = createAsyncThunk(
  'collection/removeAllCollections',
  async ({ id, urls }: removeAllCollectionsParams) => {
    urls.forEach(url => {
      if (url) {
        let fileRef = ref(storage, url);
        deleteObject(fileRef);
      }
    });
    try {
      await axios.delete(`/collections/remove/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
);
