import { updateTasksSet } from 'api/tasks/updateTasksSet';
import { CURRENT_TOKEN } from 'constants/constants';
import { TaskType } from 'types/types';

export const reoderTasksApi = async (tasks: TaskType[], columnId: string): Promise<TaskType[]> =>
  await updateTasksSet(
    CURRENT_TOKEN,
    tasks.map(({ _id }, index) => {
      return {
        _id,
        order: index,
        columnId,
      };
    })
  );
