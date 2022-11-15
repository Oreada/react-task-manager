import Column from 'components/Column/Column';
import cls from './Board.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  BUTTON_INNER,
  DROPPABLE_DIRECTION_BOARD,
  DROPPABLE_ID_BOARD,
  DROPPABLE_TYPE_BOARD,
  PSEUDO_TITLE,
} from './constants';
import { DROPPABLE_TYPE_COLUMN } from 'components/Column/constants';
import { DropResult } from 'react-beautiful-dnd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from 'store/model';
import { setBoardId } from 'store/boardSlice';
import { CURRENT_TOKEN } from 'constants/constants';
import { ColumnType, TaskType } from 'types/types';
import { getTasksByIdBoard } from 'api/tasks/getTasksByIdBoard';
import { getAllColumnsOfBoard } from 'api/columns/getAllColumnsOfBoard';
import { reoderTasksApi } from 'api/helpers/reoderTasksApi';
import { reoderColumnsApi } from 'api/helpers/reoderColumnsApi';
import { reorderItems } from 'components/heplers/reorderItems';
import { createColumn } from 'api/columns/createColumn';
import { TasksByColumnsType } from './model';
import { getTaskByColumn } from 'components/heplers/getTaskByColumn';

const Board = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { idBoard } = useSelector((state: IRootState) => state.board);

  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tasksByColumn, setTasksByColumn] = useState<TasksByColumnsType | null>(null);

  useEffect(() => {
    if (id) {
      const getResult = async (): Promise<void> => {
        setIsLoading(true);

        const [tasks, columns] = await Promise.all([
          getTasksByIdBoard(CURRENT_TOKEN, id),
          getAllColumnsOfBoard(CURRENT_TOKEN, id),
        ]);

        setColumns(columns);
        setTasksByColumn(getTaskByColumn(tasks, columns));
        setIsLoading(false);
      };

      getResult();

      dispatch(setBoardId({ idBoard: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (columns.length) {
      reoderColumnsApi(columns);
    }
  }, [columns]);

  const addTaskMemo = useCallback((newTask: TaskType): void => {
    const addTask = ({ columnId }: TaskType) =>
      setTasksByColumn((prevTasks) => ({
        ...prevTasks,
        [columnId]: prevTasks ? [...prevTasks[columnId], newTask] : [newTask],
      }));

    addTask(newTask);
  }, []);

  const delColumnMemo = useCallback((idColumn: string): void => {
    const delColumn = (idColumn: string) =>
      setColumns((prevColumns) => prevColumns.filter(({ _id }) => _id !== idColumn));

    delColumn(idColumn);
  }, []);

  const delTaskMemo = useCallback((deletedTask: TaskType): void => {
    const delTask = ({ columnId, _id: idDeletedTask }: TaskType) =>
      setTasksByColumn((prevTasks) =>
        prevTasks
          ? {
              ...prevTasks,
              [columnId]: prevTasks[columnId].filter(({ _id }) => _id !== idDeletedTask),
            }
          : null
      );

    delTask(deletedTask);
  }, []);

  const handleDragEnd = ({
    destination,
    source: { index: sourceIndex, droppableId: sourceColumnId },
    type,
  }: DropResult): void => {
    if (!destination) {
      return;
    }

    const { droppableId: destColemnId, index: destIndex } = destination;

    if (type === DROPPABLE_TYPE_BOARD) {
      setColumns(reorderItems<ColumnType>(columns, sourceIndex, destIndex));
      return;
    }

    if (tasksByColumn && type === DROPPABLE_TYPE_COLUMN) {
      if (sourceColumnId === destColemnId) {
        const newTasks = reorderItems<TaskType>(
          tasksByColumn[sourceColumnId],
          sourceIndex,
          destination.index
        );

        reoderTasksApi(newTasks, sourceColumnId);
        setTasksByColumn({ ...tasksByColumn, [sourceColumnId]: newTasks });
        return;
      }

      const newSourceTasks = [...tasksByColumn[sourceColumnId]];
      const newDestTasks = [...tasksByColumn[destColemnId]];

      const [removed] = newSourceTasks.splice(sourceIndex, 1);
      const newRemoved = { ...removed, columnId: destColemnId };

      newDestTasks.splice(destIndex, 0, newRemoved);

      reoderTasksApi(newDestTasks, destColemnId);

      setTasksByColumn({
        ...tasksByColumn,
        [sourceColumnId]: newSourceTasks,
        [destColemnId]: newDestTasks,
      });
      return;
    }
  };

  const handleClickCreateColumn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    const newColumn = await createColumn(CURRENT_TOKEN, idBoard, {
      title: PSEUDO_TITLE,
      order: columns.length,
    });

    setColumns([...columns, newColumn]);
  };

  return (
    <>
      {!isLoading && tasksByColumn ? (
        <>
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
                            delColumn={delColumnMemo}
                            delTask={delTaskMemo}
                            tasks={tasksByColumn[_id]}
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
          <button onClick={handleClickCreateColumn}>{BUTTON_INNER}</button>
        </>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default Board;
