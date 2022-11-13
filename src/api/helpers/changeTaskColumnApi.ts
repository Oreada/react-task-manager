import { updateTask } from 'api/tasks/updateTask';
import { CURRENT_TOKEN } from 'constants/constants';
import { TaskType } from 'types/types';

export const changeTaskColumnApi = async (
  item: TaskType,
  idBoard: string,
  idColumn: string,
  order: number
) => {
  const result = await updateTask(CURRENT_TOKEN, idBoard, idColumn, item._id, {
    title: item.title,
    order: order,
    description: item.description,
    columnId: idColumn,
    userId: item.userId,
    users: item.users,
  });

  return result;
};
