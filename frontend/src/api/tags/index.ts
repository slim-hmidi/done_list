import axios from "axios";
import urls from "../constants";

export interface Tag {
  id: number;
  name: string;
}
export interface TagResponse {
  message: string;
  data: Tag[];
}

const getAllTagsApi = async (): Promise<TagResponse> => {
  const { data } = await axios.get(urls.getTags);
  return data;
};

export { getAllTagsApi };
