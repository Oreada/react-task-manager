import { DraggableProvided } from 'react-beautiful-dnd';
import { TaskType } from 'types/types';

export type TaskPropsType = {
  task: TaskType;
  idColumn: string;
  delTask: (task: TaskType) => void;
  editTask?: (task: TaskType) => void;
  isDragging?: boolean;
  provider?: DraggableProvided;
  isClone?: boolean;
  index?: number;
};
