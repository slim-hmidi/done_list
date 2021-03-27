import MainService from '../main/main.service';
import Tag from './tag.models';
import { successMessages } from 'constants/httpUtils';
import { ApiResponse } from 'types/common';
import { TagResponse } from './tag.interfaces';

export default class TagService extends MainService {
    private model;

    constructor() {
      super();
      this.model = Tag;
    }

    public async getAllTags(): Promise<ApiResponse<TagResponse[]>> {
      try {
        const fetchedTags = await this.model.query();

        return {
          message: successMessages.tagFetchSuccess,
          data: fetchedTags as ApiResponse<TagResponse[]>['data'],
        };
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }
}
