import { DraggableProvided } from 'react-beautiful-dnd';
import { TaskType } from 'types/types';

// export type TaskPropsType = {
//   idTask: string;
//   idColumn: string;
//   // index: number;
//   delTask: (idTask: string) => void;
// };

export type TaskPropsType = {
  idTask: string;
  idColumn: string;
  delTask: (task: TaskType) => void;
  isDragging: boolean;
  provider: DraggableProvided;
  isClone?: boolean;
  isGroupedOver?: boolean;
  style: Object;
  index?: number;
};
