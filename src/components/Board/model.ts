import { TaskType } from 'types/types';

export type TasksByColumnsType = {
  [key: string]: TaskType[];
};

export type BoardProps = {
  title: string;
};
