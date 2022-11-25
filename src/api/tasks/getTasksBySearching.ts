import { URL_TASKS_SET } from 'constants/constants';
import { TaskType } from 'types/types';

//! Get Tasks by search request (In title, description)
//! Поиск регистронезависимый
export async function getTasksBySearching(
  token: string,
  searchValue: string
): Promise<Array<TaskType>> {
  try {
    console.log(searchValue);

    const response = await fetch(`${URL_TASKS_SET}?search=${searchValue}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const tasksList = await response.json();
    console.log(tasksList);

    return tasksList;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
