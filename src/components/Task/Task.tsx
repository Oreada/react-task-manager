import cls from './Task.module.scss';
import { TaskPropsType } from './model';
import { Draggable } from 'react-beautiful-dnd';
import { DRAGGABLE_ID_TASK } from './constants';

const Task = ({ idColumn, idTask, index }: TaskPropsType) => {
  return (
    <Draggable draggableId={idTask} index={index}>
      {(provider) => (
        <div
          className={cls.task}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
          ref={provider.innerRef}
        >
          {idTask}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
