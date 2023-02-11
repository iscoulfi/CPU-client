import { Status } from './../auth/types';

interface Map {
  [key: string]: string | undefined | string[];
}
export interface ItemData extends Map {
  _id: string;
  title: string;
  tags: string[];
  coll: string;
  likes: string;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  message?: string;
  number1?: string;
  number2?: string;
  number3?: string;
  string1?: string;
  string2?: string;
  string3?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  date1?: string;
  date2?: string;
  date3?: string;
  checkbox1?: string;
  checkbox2?: string;
  checkbox3?: string;
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
