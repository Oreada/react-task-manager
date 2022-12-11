import { URL_BOARDS } from '../../constants/constants';
import { TaskType, BodyForTaskUpdating } from 'types/types';

//! Update Task
export async function updateTask(
  token: string,
  idBoard: string,
  idColumn: string,
  idTask: string,
  obj: BodyForTaskUpdating
): Promise<TaskType> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns/${idColumn}/tasks/${idTask}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const taskUpdated = await response.json();
    return taskUpdated;
  } catch (e: unknown) {
    const err = e as Error;
    throw err;
  }
}
