export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export interface AuthSliceState {
  user: string;
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

// interface newUserData {
//   _id: string;
//   username: string;
//   email: string;
//   password: string;
//   roles: ['string'];
// }

// export interface RegisterUserData {
//   newUser: newUserData;
//   token: string;
//   message: string;
// }
