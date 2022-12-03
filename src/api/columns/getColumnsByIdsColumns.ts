import { URL_COLUMNS_SET } from '../../constants/constants';
import { ColumnType } from 'types/types';

//! Get Columns by list of columnId
//! Если передать неверный ID в списке, ошибки не будет, получим Columns только по верным ID
export async function getColumnsByIdsColumns(
  token: string,
  idsColumns: Array<string>
): Promise<Array<ColumnType>> {
  try {
    const queryFormatted = JSON.stringify(idsColumns);

    const response = await fetch(`${URL_COLUMNS_SET}?ids=${queryFormatted}`, {
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
