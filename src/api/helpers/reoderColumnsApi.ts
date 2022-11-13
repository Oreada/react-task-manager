import { updateColumnsSet } from 'api/columns/updateColumnsSet';
import { CURRENT_TOKEN } from 'constants/constants';
import { ColumnType } from 'types/types';

export const reoderColumnsApi = async (columns: ColumnType[]) => {
  return await updateColumnsSet(
    CURRENT_TOKEN,
    columns.map((column, index) => {
      return {
        _id: column._id,
        order: index,
      };
    })
  );
};
