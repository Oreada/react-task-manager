export type TaskPropsType = {
  idTask: string;
  idColumn: string;
  index: number;
  delTask: (idTask: string) => void;
};
