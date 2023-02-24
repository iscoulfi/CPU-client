import { Status } from './../auth/types';

export interface createCollectionParams {
  userId: string;
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

export interface removeCollectionParams {
  id: string;
  url: string;
}

export interface removeAllCollectionsParams {
  id: string;
  urls: string[];
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
