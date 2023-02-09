import { Status } from './../auth/types';

export interface createCollectionParams {
  title: string;
  topic: string;
  text: string;
  imgUrl: string;
  adFields: [string, string][];
}

export interface updateCollectionParams {
  title: string;
  text: string;
  imgUrl: string;
  id: string;
  adFields: [string, string][];
}

export interface CollectionData {
  title: string;
  topic: string;
  text: string;
  imgUrl: string;
  adFields: [string, string][];
  author: string;
  message?: string;
  _id: string;
  items: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectionSliceState {
  collections: [] | CollectionData[];
  collection: null | CollectionData;
  message: string;
  status: Status;
}
