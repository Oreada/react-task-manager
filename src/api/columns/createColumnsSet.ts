import { URL_COLUMNS_SET } from '../../constants/constants';
import { BodyForColumnsSet, ColumnType } from 'types/types';

//! Create set of Columns
export async function createColumnsSet(
  token: string,
  body: Array<BodyForColumnsSet>
): Promise<Array<ColumnType>> {
  try {
    const response = await fetch(URL_COLUMNS_SET, {
      method: 'POST',
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

    const columnsList = await response.json();
    return columnsList;
  } catch (e: unknown) {
    const err = e as Error;
    throw err;
  }
}
