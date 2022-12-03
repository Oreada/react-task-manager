import { URL_BOARDS } from '../../constants/constants';
import { ColumnType } from 'types/types';

//! Find Column
export async function getColumn(
  token: string,
  idBoard: string,
  idColumn: string
): Promise<ColumnType> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns/${idColumn}`, {
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

    const column = await response.json();
    return column;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
