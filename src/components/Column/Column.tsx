import { BODY, BUTTON_INNER, DROPPABLE_TYPE_COLUMN } from './constants';
import cls from './Column.module.scss';
import Task from 'components/Task/Task';
import { Droppable, DropResult } from 'react-beautiful-dnd';
import { ColumnPropsType } from './model';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from 'store/model';
import { CURRENT_TOKEN } from 'constants/constants';
import { memo, useEffect, useState } from 'react';
import { createTask } from 'api/tasks/createTask';
import { TaskType } from 'types/types';
import { setColumns, setTasks } from 'store/boardSlice';
import { getAllTasksOfColumn } from 'api/tasks/getAllTasksOfColumn';

const Column = memo(({ id, title, addTask, tasks }: ColumnPropsType) => {
  // console.log(tasks);
  // const [tasks, setTasks] = useState<TaskType[]>([]);
  const { idBoard } = useSelector((state: IRootState) => state.board);
  // const dispatch = useDispatch<AppDispatch>();
  // const { allTasks } = useSelector((state: IRootState) => state.board);

  // useEffect(() => {
  //   const getColumnTasks = async () => {
  //     setTasks(await getAllTasksOfColumn(CURRENT_TOKEN, idBoard, id));
  //   };

  //   getColumnTasks();
  // }, [id, idBoard]);

  // useEffect(() => {
  //   const getColumnTasks = async () => {
  //     setTasks(await getAllTasksOfColumn(CURRENT_TOKEN, idBoard, id));
  //   };

  //   if (isRendering) {
  //     getColumnTasks();
  //   }
  // }, [id, idBoard, isRendering]);
  // useEffect(() => {
  //   dispatch(
  //     setColumns({
  //       columns: columns.map((column) => (column._id === id ? { ...column, tasks } : column)),
  //     })
  //   );
  // }, [tasks, id, dispatch]);

  const handleClickCreateButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const newTask = await createTask(CURRENT_TOKEN, idBoard, id, {
      ...BODY,
      order: tasks.length,
    });
    // setTasks([...tasks, newTask]);
    // dispatch(setTasks({ allTasks: [...allTasks, newTask] }));
    addTask(newTask);
  };

  return (
    <Droppable droppableId={id} type={DROPPABLE_TYPE_COLUMN}>
      {(provider) => (
        <div className={cls.column} ref={provider.innerRef} {...provider.droppableProps}>
          <h3>{title}</h3>
          <div className={cls.list}>
            {tasks.map(({ _id }, index) => (
              <Task key={_id} idColumn={id} idTask={_id} index={index} />
            ))}
            {provider.placeholder}
          </div>
          <button onClick={handleClickCreateButton}>{BUTTON_INNER}</button>
        </div>
      )}
    </Droppable>
  );
});

export default memo(Column);
