import { URL_COLUMNS_SET } from 'constants/constants';
import { Column } from 'types/types';

//! Get Columns by UserID
export async function getColumnsByIdUser(token: string, idUser: string): Promise<Array<Column>> {
  try {
    const response = await fetch(`${URL_COLUMNS_SET}?userId=${idUser}`, {
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

    const columnsList = await response.json();
    return columnsList;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
