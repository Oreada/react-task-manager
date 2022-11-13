import cls from './Task.module.scss';
import { TaskPropsType } from './model';
import { Draggable } from 'react-beautiful-dnd';
import { BUTTON_INNER } from './constants';
import { deleteTask } from 'api/tasks/deleteTask';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from 'store/model';
import { CURRENT_TOKEN } from 'constants/constants';
import { setTasks } from 'store/boardSlice';

const Task = ({ idColumn, idTask, index, delTask }: TaskPropsType) => {
  const { idBoard } = useSelector((state: IRootState) => state.board);
  // const dispatch = useDispatch<AppDispatch>();

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const deletedColumn = await deleteTask(CURRENT_TOKEN, idBoard, idColumn, idTask);
    // dispatch(setTasks({ allTasks: allTasks.filter((task) => task._id !== idTask) }));

    delTask(idTask);
    return deletedColumn;
  };

  return (
    <>
      <Draggable draggableId={idTask} index={index}>
        {(provider) => (
          <div
            className={cls.task}
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            ref={provider.innerRef}
          >
            {idTask}
            <button onClick={handleClickDeleteButton}>{BUTTON_INNER}</button>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
