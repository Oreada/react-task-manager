import Column from 'components/Column/Column';
import cls from './Board.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DROPPABLE_DIRECTION_BOARD, DROPPABLE_ID_BOARD, DROPPABLE_TYPE_BOARD } from './constants';
import { DROPPABLE_TYPE_COLUMN } from 'components/Column/constants';
import { DropResult } from 'react-beautiful-dnd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from 'store/model';
import { getBoardData, setBoardId, setColumns, setTasks } from 'store/boardSlice';
import { CURRENT_TOKEN } from 'constants/constants';
import { ColumnType, TaskType } from 'types/types';
import { updateColumnsSet } from 'api/columns/updateColumnsSet';
import { updateTasksSet } from 'api/tasks/updateTasksSet';
import { getTasksByIdBoard } from 'api/tasks/getTasksByIdBoard';
import { getAllColumnsOfBoard } from 'api/columns/getAllColumnsOfBoard';
import { createTask } from 'api/tasks/createTask';
import { updateTask } from 'api/tasks/updateTask';
import { isExternalModuleNameRelative } from 'typescript';
import { reoderTasksApi } from 'api/helpers/reoderTasksApi';
import { reoderColumnsApi } from 'api/helpers/reoderColumnsApi';
import { changeTaskColumnApi } from 'api/helpers/changeTaskColumnApi';
import { sortByOrder } from 'components/heplers/sortByOrder';
import { reorderItems } from 'components/heplers/reorderItems';

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { idBoard } = useSelector((state: IRootState) => state.board);
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [columns, setAllColumns] = useState<ColumnType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const getTaskOfBoard = async () => {
        setAllTasks(await getTasksByIdBoard(CURRENT_TOKEN, id));
      };

      const getColumnsOfBoard = async () => {
        setAllColumns(await getAllColumnsOfBoard(CURRENT_TOKEN, id));
      };

      const getResult = async () => {
        setIsLoading(true);
        await Promise.all([getTaskOfBoard(), getColumnsOfBoard()]);
        setIsLoading(false);
      };
      getResult();

      dispatch(setBoardId({ idBoard: id }));
      // dispatch(getBoardData({ token: CURRENT_TOKEN, idBoard: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (columns.length) {
      reoderColumnsApi(columns);
    }
  }, [columns]);

  const addTaskMemo = useCallback((newTask: TaskType) => {
    const addTask = (newTask: TaskType) => {
      // dispatch(setTasks({ allTasks: [...allTasks, newTask] }));
      setAllTasks((prevTasks) => {
        return [...prevTasks, newTask];
      });
    };

    addTask(newTask);
  }, []);

  const taskByColumnsMemo = useMemo(() => {
    const columnsId = columns.map((column) => column._id);
    const taskByColumns: { [key: string]: TaskType[] } = columnsId.reduce(
      (acc, id) => ({
        ...acc,
        [id]: allTasks.filter((task) => task.columnId === id),
      }),
      {}
    );
    return taskByColumns;
  }, [columns, allTasks]);

  const handleDragEnd = async (result: DropResult) => {
    const {
      destination,
      source: { index: sourceIndex, droppableId: sourceColumnId },
      type,
    } = result;

    if (!destination) {
      return;
    }

    const { droppableId: destColemnId, index: destIndex } = destination;

    if (type === DROPPABLE_TYPE_BOARD) {
      // dispatch(setColumns({ allColumns: reorderItems<ColumnType>(columns, sourceIndex, destIndex) }));
      setAllColumns(reorderItems<ColumnType>(columns, sourceIndex, destIndex));
      return;
    }

    if (type === DROPPABLE_TYPE_COLUMN) {
      if (sourceColumnId === destColemnId) {
        const newTasks = reorderItems<TaskType>(
          taskByColumnsMemo[sourceColumnId],
          sourceIndex,
          destination.index
        );
        reoderTasksApi(newTasks, sourceColumnId);

        setAllTasks(
          Object.values({
            ...taskByColumnsMemo,
            [sourceColumnId]: newTasks,
          }).flat()
        );
        return;
      }

      const newSourceTasks = [...taskByColumnsMemo[sourceColumnId]];
      const newDestTasks = [...taskByColumnsMemo[destColemnId]];

      const [removed] = newSourceTasks.splice(sourceIndex, 1);
      changeTaskColumnApi(removed, idBoard, destColemnId, destIndex);

      const newRemoved = { ...removed, columnId: destColemnId };
      newDestTasks.splice(destIndex, 0, newRemoved);

      setAllTasks(
        Object.values({
          ...taskByColumnsMemo,
          [sourceColumnId]: newSourceTasks,
          [destColemnId]: newDestTasks,
        }).flat()
      );
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId={DROPPABLE_ID_BOARD}
        type={DROPPABLE_TYPE_BOARD}
        direction={DROPPABLE_DIRECTION_BOARD}
      >
        {(provider) => (
          <div className={cls.board} ref={provider.innerRef} {...provider.droppableProps}>
            {columns.map(({ _id, title }, index) => (
              <Draggable key={_id} draggableId={_id} index={index}>
                {(provider) => (
                  <div
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    ref={provider.innerRef}
                  >
                    <Column
                      id={_id}
                      title={title}
                      addTask={addTaskMemo}
                      tasks={taskByColumnsMemo[_id]}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
