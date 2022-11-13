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
import { deleteColumn } from 'api/columns/deleteColumn';

const Column = memo(
  ({ id, title, addTask, delColumn, delTask, tasks: defaultTasks }: ColumnPropsType) => {
    const tasks = JSON.parse(defaultTasks) as TaskType[];
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
      return newTask;
    };

    const handleClickDeleteButton = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();
      const deletedColumn = await deleteColumn(CURRENT_TOKEN, idBoard, id);
      // dispatch(setColumns({ columns: columns.filter((column) => column._id !== id) }));

      delColumn(id);
      return deletedColumn;
    };

    return (
      <div className={cls.column}>
        <h3>{title}</h3>
        <div className={cls.list}>
          <Droppable droppableId={id} type={DROPPABLE_TYPE_COLUMN}>
            {(provider) => (
              <div ref={provider.innerRef} {...provider.droppableProps}>
                <div>
                  {tasks.map(({ _id }, index) => (
                    <Task key={_id} idColumn={id} idTask={_id} index={index} delTask={delTask} />
                  ))}
                  {provider.placeholder}
                </div>
                <button onClick={handleClickCreateButton}>{BUTTON_INNER.createTask}</button>
                <button onClick={handleClickDeleteButton}>{BUTTON_INNER.deleteColumn}</button>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  }
);

export default memo(Column);
