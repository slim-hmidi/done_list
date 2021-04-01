export interface NewUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    password: string;
  }

export interface AuthenticationResponse {
      userId: number;
      username: string;
      token: string;
  }
