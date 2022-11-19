import { updateTasksSet } from 'api/tasks/updateTasksSet';
import { TaskType } from 'types/types';

export const reoderTasksApi = async (tasks: TaskType[], columnId: string, token: string): Promise<TaskType[]> =>
  await updateTasksSet(
    token,
    tasks.map(({ _id }, index) => {
      return {
        _id,
        order: index,
        columnId,
      };
    })
  );
