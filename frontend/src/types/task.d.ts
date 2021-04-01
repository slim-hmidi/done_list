import {ApiResponse, Loading} from './common';

export interface Task {
  title: string;
  description: string;
  realisationDate: string;
  tagId: number;
}

export interface TaskBody {
  id: number;
  title: string;
  description: string;
  realisationDate: string;
  tags: [
    {
      id: number;
      name: string;
    },
  ];
}

export interface AddTask extends Task {
  userId: number;
}

export type TaskCreationResponse = ApiResponse<TaskBody>;
export type TaskFetchResponse = ApiResponse<TaskBody[]>;

export interface TaskSliceState {
  error: string;
  successMessage: string;
  tasks: TaskBody[];
  loading: Loading;
}

export interface TaskForm {
  title: string;
  description: string;
  tagId: number;
  realisationDate: Date;
}
