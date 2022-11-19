import { CSSProperties } from 'react';
import { TaskType } from 'types/types';
import { Style } from 'util';
import { DraggableProvided, DraggableStateSnapshot, DraggableRubric } from 'react-beautiful-dnd';

export type ColumnPropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  // tasks: string;
  addTask: (newTask: TaskType) => void;
  delColumn: (idColumn: string) => void;
  delTask: (task: TaskType) => void;
};

export type RowProps = {
  index: number;
  style: CSSProperties;
  isScrolling: boolean;
};

export type RenderTaskFuncType = (
  style: CSSProperties
) => (
  provider: DraggableProvided,
  snapshot: DraggableStateSnapshot,
  rubric: DraggableRubric
) => JSX.Element;
