import { URL_ALL_BOARDS } from 'constants/constants';
import { Task, BodyForTaskUpdating } from 'types/types';

//! Update Task
export async function updateTask(
  token: string,
  idBoard: string,
  idColumn: string,
  idTask: string,
  obj: BodyForTaskUpdating
): Promise<Task> {
  try {
    const response = await fetch(
      `${URL_ALL_BOARDS}/${idBoard}/columns/${idColumn}/tasks/${idTask}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const taskUpdated = await response.json();
    return taskUpdated;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
