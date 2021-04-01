import {ApiResponse} from './common';

export interface AuthenticatedUser {
  username: string;
  password: string;
}

export interface AuthenticationBody {
  username: string;
  userId: number;
  token: string;
}
export type AuthenticationResponse = ApiResponse<AuthenticationBody>;

export interface NewUser {
  username: string;
  password: string;
  email: string;
  birthday: string;
  firstName: string;
  lastName: string;
}

export interface HandleUserResponse {
  message: string;
  username: string;
  userId: number;
}

export interface User {
  username: string;
  userId: number;
}

export interface UserSliceState {
  error: string;
  successMessage: string;
  user: User;
  loading: Loading;
}

export interface UserPayload {
  username: string;
  userId: number;
  message: string;
}

export interface SignUpForm {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date | null;
}

export interface SignInForm {
  username: string;
  password: string;
  [x: string]: string;
}
