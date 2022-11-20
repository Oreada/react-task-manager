import { ColumnType, TaskType } from 'types/types';

export const reorderItems = <Type extends ColumnType | TaskType>(
  array: Type[],
  currentIndex: number,
  destinationIndex: number
) => {
  const result = [...array];
  const [removed] = result.splice(currentIndex, 1);

  result.splice(destinationIndex, 0, removed);

  return result.map((item, index) => ({ ...item, order: index }));
};
