import { sortByOrder } from 'components/helpers/sortByOrder';
import { URL_BOARDS } from '../../constants/constants';
import { TaskType } from 'types/types';

//! Get Tasks in columns
export async function getAllTasksOfColumn(
  token: string,
  idBoard: string,
  idColumn: string
): Promise<Array<TaskType>> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns/${idColumn}/tasks`, {
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
    const sort = sortByOrder<TaskType>(tasksList);
    return sort;
  } catch (e: unknown) {
    const err = e as Error;
    throw new Error(err.message);
  }
}
