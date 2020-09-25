import axios from "redaxios";
import urls from "../constants";

export interface AuthenticatedUser {
  username: string;
  password: string;
}

interface RegistredUser {
  username: string;
  password: string;
  email: string;
  birthday: string;
  firstName: string;
  lastName: string;
}

const signInApi = async (user: AuthenticatedUser) => {
  const { data } = await axios.post(urls.signIn, {
    method: "POST",
    body: JSON.stringify(user),
  });

  return data;
};

const signUpApi = async (user: RegistredUser) => {
  const { data } = await axios.post(urls.signUp, {
    method: "POST",
    body: JSON.stringify(user),
  });

  return data;
};

export {
  signInApi,
  signUpApi,
};
