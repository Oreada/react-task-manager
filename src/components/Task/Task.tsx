import cls from './Task.module.scss';
import { TaskPropsType } from './model';
import { Draggable } from 'react-beautiful-dnd';
import { DRAGGABLE_ID_TASK } from './constants';

const Task = ({ idColumn, idTask }: TaskPropsType) => {
  return (
    <Draggable draggableId={idColumn + DRAGGABLE_ID_TASK + idTask} index={Number(idTask)}>
      {(provider) => (
        <div
          className={cls.task}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
        >
          {idTask + idColumn}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
