export interface ApiResponse<T> {
  message: string;
  data: T;
}

export enum LoadingStatus {
  idle = 'idle',
  resolved = 'resolved',
  rejected = 'rejected',
  pending = 'pending',
}

export interface TouchedFields {
  [key: string]: boolean;
}

export interface ErrorFields {
  [key: string]: string;
}
