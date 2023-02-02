export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export interface AuthSliceState {
  user: null | UserData;
  token: string;
  message: string;
  status: Status;
}

export interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
}
export interface LoginUserParams {
  username: string;
  password: string;
}

export type MessageType = {
  message: string;
};

export interface UserData {
  _id: string;
  username: string;
  email: string;
  password: string;
  roles: ['string'];
}

interface IUserData {
  token: string;
  message: string;
}

export interface RegisterUserData extends IUserData {
  newUser: UserData;
}

export interface LoginUserData extends IUserData {
  user: UserData;
}

export interface GetMeData {
  user: UserData;
  token: string;
}
