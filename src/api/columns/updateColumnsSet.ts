import { URL_COLUMNS_SET } from 'constants/constants';
import { ColumnType, BodyForColumnsSetOrder } from 'types/types';

//! Change order of list of columns
export async function updateColumnsSet(token: string, body: Array<BodyForColumnsSetOrder>): Promise<Array<ColumnType>> {
  try {
    const response = await fetch(URL_COLUMNS_SET, {
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
    const columnsUpdatedList = await response.json();
    return columnsUpdatedList;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
