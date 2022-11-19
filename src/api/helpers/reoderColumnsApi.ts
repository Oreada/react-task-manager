import { updateColumnsSet } from 'api/columns/updateColumnsSet';
import { ColumnType } from 'types/types';

export const reoderColumnsApi = async (columns: ColumnType[], token: string): Promise<ColumnType[]> =>
  await updateColumnsSet(
    token,
    columns.map(({ _id }, index) => {
      return {
        _id,
        order: index,
      };
    })
  );
