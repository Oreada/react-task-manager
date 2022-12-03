import { URL_BOARDS } from '../../constants/constants';
import { BodyForColumn, ColumnType } from 'types/types';

//! Update Column
export async function updateColumn(
  token: string,
  idBoard: string,
  idColumn: string,
  obj: BodyForColumn
): Promise<ColumnType> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns/${idColumn}`, {
      method: 'PUT',
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

    const columnUpdated = await response.json();
    return columnUpdated;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
