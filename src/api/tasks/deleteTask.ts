import { URL_BOARDS } from 'constants/constants';
import { Task } from 'types/types';

//! Delete Task
export async function deleteTask(
  token: string,
  idBoard: string,
  idColumn: string,
  idTask: string
): Promise<Task> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns/${idColumn}/tasks/${idTask}`, {
      method: 'DELETE',
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
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
