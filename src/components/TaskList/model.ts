import { TaskType } from 'types/types';

export type TaskListPropsType = {
  tasks: TaskType[];
  idColumn: string;
  delTask: (task: TaskType) => void;
  editTask: (task: TaskType) => void;
};
