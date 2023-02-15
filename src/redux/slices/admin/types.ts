import { Status } from '../auth/types';

export interface AdminSliceState {
  users: UsersData[];
  status: Status;
}

export interface UsersData {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  statusUser: string;
  createdAt: string;
}

export interface blockUserProps {
  username: string;
  statusUser: string;
}