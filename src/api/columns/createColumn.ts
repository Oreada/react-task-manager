import { URL_BOARDS } from '../../constants/constants';
import { BodyForColumn, ColumnType } from 'types/types';

//! Create Column in board
export async function createColumn(
  token: string,
  idBoard: string,
  obj: BodyForColumn
): Promise<ColumnType> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns`, {
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

    const column = await response.json();
    return column;
  } catch (e: unknown) {
    const err = e as Error;
    throw new Error(err.message);
  }
}
