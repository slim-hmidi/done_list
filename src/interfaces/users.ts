export interface TokenPayload {
  id: number;
  username: string;
  email: string;
}

export interface NewUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  birthday: string;
}
