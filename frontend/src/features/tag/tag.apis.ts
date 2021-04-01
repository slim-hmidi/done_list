import axios from 'axios';
import urls from 'constants/urls';
import {TagResponse} from 'types';

const getAllTagsApi = async (): Promise<TagResponse> => {
  const {data} = await axios.get(urls.getTags);
  return data;
};

export {getAllTagsApi};
