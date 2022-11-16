import { TaskPropsType } from './model';
import { DraggableProvided } from 'react-beautiful-dnd';
import { BUTTON_INNER } from './constants';
import { deleteTask } from 'api/tasks/deleteTask';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { CURRENT_TOKEN } from 'constants/constants';
import { CSSProperties } from 'react';
import { TaskType } from 'types/types';

function getStyle(provided: DraggableProvided, style: CSSProperties) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

const Task = (
  { idColumn, idTask, delTask, provider, style }: TaskPropsType,
  ref: React.LegacyRef<HTMLDivElement>
) => {
  const { idBoard } = useSelector((state: IRootState) => state.board);

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<TaskType> => {
    event.preventDefault();

    const deletedTask = await deleteTask(CURRENT_TOKEN, idBoard, idColumn, idTask);

    delTask(deletedTask);
    return deletedTask;
  };

  return (
    <div
      {...provider.draggableProps}
      {...provider.dragHandleProps}
      ref={provider.innerRef}
      style={getStyle(provider, style)}
    >
      <div ref={ref}>{idTask}</div>
      <button onClick={handleClickDeleteButton}>{BUTTON_INNER}</button>
    </div>
  );
};

export default Task;
