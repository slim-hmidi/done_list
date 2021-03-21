import TaskTag from './task-tag.models';

export default class TaskTagService {
    private model;

    constructor() {
      this.model = TaskTag;
    }

    public async createTaskTagLink(taskId: number, tagId: number, trx?: any) {
      const createdTaskTag = await this.model.query(trx).insert({
        task_id: taskId,
        tag_id: tagId,
      });

      return createdTaskTag;
    }
}
