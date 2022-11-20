import { TasksByColumnsType } from 'components/Board/model';
import { ColumnType, TaskType } from 'types/types';
import { sortByOrder } from '../components/helpers/sortByOrder';

export const getTaskByColumn = (tasks: TaskType[], columns: ColumnType[]): TasksByColumnsType => {
  const columnsId = columns.map(({ _id }) => _id);

  const taskByColumns: TasksByColumnsType = columnsId.reduce(
    (acc, id) => ({
      ...acc,
      [id]: sortByOrder(tasks.filter(({ columnId }) => columnId === id)),
    }),
    {}
  );
  return taskByColumns;
};
