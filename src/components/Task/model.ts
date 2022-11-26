import { CSSProperties } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { TaskType } from 'types/types';

// export type TaskPropsType = {
//   idTask: string;
//   idColumn: string;
//   // index: number;
//   delTask: (idTask: string) => void;
// };

export type TaskPropsType = {
  task: TaskType;
  // idTask: string;
  idColumn: string;
  delTask: (task: TaskType) => void;
  isDragging?: boolean;
  provider?: DraggableProvided;
  isClone?: boolean;
  style: CSSProperties;
  index?: number;
  // titleTask: string;
  // descriptionTask: string;
  // orderTask: number;
  // ownerTask: string;
  // usersOfTask: Array<string>;
};
