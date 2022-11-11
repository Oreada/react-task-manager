import { URL_TASKS_SET } from 'constants/constants';
import { Task } from 'types/types';

//! Get Tasks by list of taskId
//! Если передать неверный ID в списке, ошибки не будет, получим Tasks только по верным ID
export async function getTasksByIdsTasks(
  token: string,
  idsTasks: Array<string>
): Promise<Array<Task>> {
  try {
    const queryFormatted = JSON.stringify(idsTasks);

    const response = await fetch(`${URL_TASKS_SET}?ids=${queryFormatted}`, {
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

    const tasksList = await response.json();
    return tasksList;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
