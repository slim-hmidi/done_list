import axios from 'axios';
import urls from '../constants';

export interface AuthenticatedUser {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  message: string;
  data: {
    username: string;
    userId: number;
    token: string;
  };
}
export interface NewUser {
  username: string;
  password: string;
  email: string;
  birthday: string;
  firstName: string;
  lastName: string;
}

const signInApi = async (
  user: AuthenticatedUser,
): Promise<AuthenticationResponse> => {
  const {data} = await axios.post(urls.signIn, user);

  return data;
};

const signUpApi = async (user: NewUser): Promise<AuthenticationResponse> => {
  const {data} = await axios.post(urls.signUp, user);

  return data;
};

export {signInApi, signUpApi};
