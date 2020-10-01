import axios from "axios";
import urls from "../constants";
import { getToken } from "../utils";

export interface Task {
  title: string;
  description: string;
  realisationDate: string;
  tagId: number;
}

export interface AddTask extends Task {
  userId: number;
}

export interface TaskResponse {
  message: string;
  data: Task;
}

export const addTaskApi = async (task: AddTask): Promise<TaskResponse> => {
  axios.defaults.headers.common["x-access-token"] = getToken();
  const { data } = await axios.post(urls.addTask, task);
  return data;
};
