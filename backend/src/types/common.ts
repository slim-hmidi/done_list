export interface ApiResponse<T> {
    message: string;
    data: T;
}

export interface TokenPayload {
    id: number;
    username: string;
    email: string;
  }
