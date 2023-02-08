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
}

export interface CollectionData {
  title: string;
  topic: string;
  text: string;
  imgUrl: string;
  adField: string;
  author: string;
  message?: string;
  _id: string;
  items: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectionSliceState {
  collections: [] | CollectionData[];
  message: string;
  status: Status;
}
