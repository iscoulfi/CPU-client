import { AdditionalFields } from './../../../types/appinterface';
import { Status } from './../auth/types';

export interface createCollectionParams {
  title: string;
  topic: string;
  description: string;
  imgUrl: string;
  adFields: AdditionalFields;
}

export interface CollectionData {
  title: string;
  topic: string;
  text: string;
  imgUrl: string;
  adField: string;
  author: string;
  message: string;
}

export interface CollectionSliceState {
  collection: null | CollectionData;
  message: string;
  status: Status;
}
