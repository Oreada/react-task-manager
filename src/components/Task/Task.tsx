import { TaskPropsType } from './model';
import { DraggableProvided } from 'react-beautiful-dnd';
import { BUTTON_INNER } from './constants';
import { deleteTask } from 'api/tasks/deleteTask';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { CSSProperties } from 'react';
import { TaskType } from 'types/types';

// function getStyle(provided: DraggableProvided, style: CSSProperties) {
//   if (!style) {
//     return provided.draggableProps.style;
//   }

//   return {
//     ...provided.draggableProps.style,
//     ...style,
//   };
// }

const Task = ({ idColumn, idTask, delTask, provider, style }: TaskPropsType) => {
  const { idBoard } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<TaskType | void> => {
    event.preventDefault();

    if (token) {
      const deletedTask = await deleteTask(token, idBoard, idColumn, idTask);

      delTask(deletedTask);
      return deletedTask;
    }
  };

  return (
    <div
      {...provider.draggableProps}
      {...provider.dragHandleProps}
      ref={provider.innerRef}
      style={provider.draggableProps.style}
    >
      <div>{idTask}</div>
      <button onClick={handleClickDeleteButton}>{BUTTON_INNER}</button>
    </div>
  );
};

export default Task;
