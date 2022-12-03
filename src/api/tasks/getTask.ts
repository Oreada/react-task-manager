import { URL_BOARDS } from '../../constants/constants';
import { TaskType } from 'types/types';

//! Find Task
export async function getTask(
  token: string,
  idBoard: string,
  idColumn: string,
  idTask: string
): Promise<TaskType> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns/${idColumn}/tasks/${idTask}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const task = await response.json();
    return task;
  } catch (e: unknown) {
    const err = e as Error;
    throw err;
  }
}
