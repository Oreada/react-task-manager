import { URL_TASKS_SET } from '../../constants/constants';
import { TaskType, BodyForTasksSetOrder } from 'types/types';

//! Change order of list of tasks
export async function updateTasksSet(
  token: string,
  body: Array<BodyForTasksSetOrder>
): Promise<Array<TaskType>> {
  try {
    const response = await fetch(URL_TASKS_SET, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const tasksUpdatedList = await response.json();
    return tasksUpdatedList;
  } catch (e: unknown) {
    const err = e as Error;
    throw err;
  }
}
