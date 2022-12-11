import { CSSProperties } from 'react';
import { TaskType } from 'types/types';
import { DraggableProvided, DraggableStateSnapshot, DraggableRubric } from 'react-beautiful-dnd';

export type ColumnPropsType = {
  id: string;
  title: string;
  index: number;
  order: number;
  addTask: (newTask: TaskType) => void;
  delColumn: (idColumn: string) => void;
  delTask: (task: TaskType) => void;
  editTask: (task: TaskType) => void;
};

export type RenderTaskFuncType = (
  style: CSSProperties
) => (
  provider: DraggableProvided,
  snapshot: DraggableStateSnapshot,
  rubric: DraggableRubric
) => JSX.Element;
