import { updateColumnsSet } from 'api/columns/updateColumnsSet';
import { CURRENT_TOKEN } from 'constants/constants';
import { ColumnType } from 'types/types';

export const reoderColumnsApi = async (columns: ColumnType[]): Promise<ColumnType[]> =>
  await updateColumnsSet(
    CURRENT_TOKEN,
    columns.map(({ _id }, index) => {
      return {
        _id,
        order: index,
      };
    })
  );
