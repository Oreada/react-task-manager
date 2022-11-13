import { updateTasksSet } from 'api/tasks/updateTasksSet';
import { CURRENT_TOKEN } from 'constants/constants';
import { TaskType } from 'types/types';

export const reoderTasksApi = async (tasks: TaskType[], columnId: string) => {
  const newTasks = await updateTasksSet(
    CURRENT_TOKEN,
    tasks.map((task, index) => {
      return {
        _id: task._id,
        order: index,
        columnId,
      };
    })
  );

  return newTasks;
};
