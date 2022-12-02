import { URL_TASKS_SET } from '../../constants/constants';
import { TaskType } from 'types/types';

//! Get Tasks by UserID, where user is owner or one of invited
export async function getTasksByIdUser(token: string, idUser: string): Promise<Array<TaskType>> {
  try {
    const response = await fetch(`${URL_TASKS_SET}?userId=${idUser}`, {
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
