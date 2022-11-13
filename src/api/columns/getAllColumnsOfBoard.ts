import { sortByOrder } from 'components/heplers/sortByOrder';
import { URL_BOARDS } from 'constants/constants';
import { ColumnType } from 'types/types';

//! Get Columns in board
export async function getAllColumnsOfBoard(
  token: string,
  idBoard: string
): Promise<Array<ColumnType>> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}/columns`, {
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
    return sortByOrder(columnsList);
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
