import {ApiResponse, Loading} from './common';

export interface Tag {
  id: number;
  name: string;
}
export type TagResponse = ApiResponse<Tag[]>;

export interface TagSliceState {
  tags: Tag[];
  error: string;
  loading: Loading;
}
