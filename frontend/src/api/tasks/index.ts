import axios from "axios";
import urls from "../constants";
import { getToken } from "../utils";

export interface Task {
  title: string;
  description: string;
  realisationDate: string;
  tagId: number;
}

export interface ReturnedTask {
  id: number;
  title: string;
  description: string;
  realisationDate: string;
  tags: [{
    id: number;
    name: string;
  }];
}

export interface AddTask extends Task {
  userId: number;
}

export interface PostTaskResponse {
  message: string;
  data: ReturnedTask;
}

export interface GetTasksResponse {
  message: string;
  data: ReturnedTask[];
}

export const addTaskApi = async (task: AddTask): Promise<PostTaskResponse> => {
  axios.defaults.headers.common["x-access-token"] = getToken();
  const { data } = await axios.post(urls.addTask, task);
  return data;
};

export const getAllTasksApi = async (
  queryParams: string[],
): Promise<GetTasksResponse> => {
  axios.defaults.headers.common["x-access-token"] = getToken();
  const params = queryParams.join("&");
  const { data } = await axios.get(`${urls.getTasks}?${params}`);
  return data;
};
