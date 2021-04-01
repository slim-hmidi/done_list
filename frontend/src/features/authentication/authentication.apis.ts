import axios from 'axios';
import urls from 'constants/urls';
import {AuthenticationResponse, AuthenticatedUser, NewUser} from 'types';

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
