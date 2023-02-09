import { Status } from './../auth/types';

export interface ItemData {
  _id: string;
  title: string;
  tags: string[];
  coll: string;
  likes: string;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  message?: string;
}

export interface ItemSliceState {
  items: [] | ItemData[];
  message: string;
  status: Status;
}

export type RemoveItemParams = {
  collId: string;
  itemId: string;
};
