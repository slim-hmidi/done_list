import axios from 'axios';
import urls from 'constants/urls';
import {getToken} from 'utils/token';
import {AddTask, TaskCreationResponse, TaskFetchResponse} from 'types';

export const addTaskApi = async (
  task: AddTask,
): Promise<TaskCreationResponse> => {
  axios.defaults.headers.common['x-access-token'] = getToken();
  const {data} = await axios.post(urls.addTask, task);
  return data;
};

export const getAllTasksApi = async (
  queryParams: string[],
): Promise<TaskFetchResponse> => {
  axios.defaults.headers.common['x-access-token'] = getToken();
  const params = queryParams.join('&');
  const {data} = await axios.get(`${urls.getTasks}?${params}`);
  return data;
};
