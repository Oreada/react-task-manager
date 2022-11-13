import { TaskType } from 'types/types';

export type ColumnPropsType = {
  id: string;
  title: string;
  // tasks: TaskType[];
  tasks: string;
  addTask: (newTask: TaskType) => void;
  delColumn: (idColumn: string) => void;
  delTask: (idTask: string) => void;
};
