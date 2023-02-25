import { Status } from '../auth/types';

export type CreateCommentParams = {
  itemId: string;
  comment: string;
};

export interface CommentSliceState {
  comments: CommentData[];
  status: Status;
}

export interface CommentData {
  _id: string;
  comment: string;
  authorId: string;
  author: string;
  createdAt: string;
}
