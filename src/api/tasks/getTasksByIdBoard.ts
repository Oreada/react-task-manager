import { URL_TASKS_SET } from '../../constants/constants';
import { TaskType } from 'types/types';

//! Get Tasks in selected Board
export async function getTasksByIdBoard(token: string, idBoard: string): Promise<Array<TaskType>> {
  try {
    const response = await fetch(`${URL_TASKS_SET}/${idBoard}`, {
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
    throw err;
  }
}
