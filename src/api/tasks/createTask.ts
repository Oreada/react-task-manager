import { URL_BOARDS } from '../../constants/constants';
import { TaskType, BodyForTask } from 'types/types';

//! Create Task in column
export async function createTask(
  token: string,
  idBoard: string,
  idColumn: string,
  obj: BodyForTask
): Promise<TaskType> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns/${idColumn}/tasks`, {
      method: 'POST',
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

    const task = await response.json();
    return task;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
