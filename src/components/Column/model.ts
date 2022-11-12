import { TaskType } from 'types/types';

export type ColumnPropsType = {
  id: string;
  title: string;
  // tasks: TaskType[];
  addTask: (newTask: TaskType) => void;
};
