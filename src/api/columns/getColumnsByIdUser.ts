import { URL_COLUMNS_SET } from '../../constants/constants';
import { ColumnType } from 'types/types';

//! Get Columns by UserID, where user is owner or one of invited
export async function getColumnsByIdUser(
  token: string,
  idUser: string
): Promise<Array<ColumnType>> {
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
    throw new Error(err.message);
  }
}
