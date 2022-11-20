import Column from 'components/Column/Column';
import styles from './Board.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  BUTTON_INNER,
  DROPPABLE_DIRECTION_BOARD,
  DROPPABLE_ID_BOARD,
  DROPPABLE_TYPE_BOARD,
} from './constants';
import { DROPPABLE_TYPE_COLUMN } from 'components/Column/constants';
import { DropResult } from 'react-beautiful-dnd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from 'store/model';
import { getBoardData, setBoardId, setColumns, setTasksByColumn } from 'store/boardSlice';
import { ColumnType, TaskType } from 'types/types';
import { reoderTasksApi } from 'api/helpers/reoderTasksApi';
import { reoderColumnsApi } from 'api/helpers/reoderColumnsApi';
import { reorderItems } from 'components/helpers/reorderItems';
import { createColumn } from 'api/columns/createColumn';
import { TasksByColumnsType } from './model';
import { BasicModal } from 'components/Modal/Modal';
import { FormColumn } from 'components/FormColumn/FormColumn';
import { Typography } from '@mui/material';

const Board = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { idBoard, titleBoard, columns, taskByColumns, isLoading } = useSelector(
    (state: IRootState) => state.board
  );
  const { token } = useSelector((state: IRootState) => state.auth);

  const [titleForColumn, setTitleForColumn] = useState<string>('no title');

  useEffect(() => {
    if (id && token) {
      const getResult = async (): Promise<void> => {
        dispatch(getBoardData({ token, idBoard: id }));
      };

      getResult();

      dispatch(setBoardId({ idBoard: id }));
    }
  }, [id, token, dispatch]);

  useEffect(() => {
    if (columns.length && token) {
      reoderColumnsApi(columns, token);
    }
  }, [columns, token]);

  const addTaskMemo = useCallback(
    (newTask: TaskType): void => {
      const addTask = ({ columnId }: TaskType): void => {
        taskByColumns &&
          dispatch(
            setTasksByColumn({
              taskByColumns: {
                ...taskByColumns,
                [columnId]: taskByColumns[columnId]
                  ? [...taskByColumns[columnId], newTask]
                  : [newTask],
              },
            })
          );
      };

      addTask(newTask);
    },
    [taskByColumns]
  );

  const delColumnMemo = useCallback(
    (idColumn: string): void => {
      const delColumn = (idColumn: string): void => {
        dispatch(setColumns({ columns: columns.filter(({ _id }) => _id !== idColumn) }));

        if (taskByColumns) {
          const { [idColumn as keyof TasksByColumnsType]: deletedColumn, ...lastTasks } =
            taskByColumns;

          dispatch(setTasksByColumn({ taskByColumns: lastTasks }));
        }
      };

      delColumn(idColumn);
    },
    [taskByColumns]
  );

  const delTaskMemo = useCallback(
    (deletedTask: TaskType): void => {
      const delTask = ({ columnId, _id: idDeletedTask }: TaskType): void => {
        taskByColumns &&
          dispatch(
            setTasksByColumn({
              taskByColumns: {
                ...taskByColumns,
                [columnId]: taskByColumns[columnId].filter(({ _id }) => _id !== idDeletedTask),
              },
            })
          );
      };

      delTask(deletedTask);
    },
    [taskByColumns]
  );

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
      dispatch(setColumns({ columns: reorderItems<ColumnType>(columns, sourceIndex, destIndex) }));
      return;
    }

    if (token && taskByColumns && type === DROPPABLE_TYPE_COLUMN) {
      if (sourceColumnId === destColemnId) {
        const newTasks = reorderItems<TaskType>(
          taskByColumns[sourceColumnId],
          sourceIndex,
          destination.index
        );

        reoderTasksApi(newTasks, sourceColumnId, token);

        dispatch(
          setTasksByColumn({ taskByColumns: { ...taskByColumns, [sourceColumnId]: newTasks } })
        );
        return;
      }

      const newSourceTasks = [...taskByColumns[sourceColumnId]];
      const newDestTasks = [...taskByColumns[destColemnId]];

      const [removed] = newSourceTasks.splice(sourceIndex, 1);
      const newRemoved = { ...removed, columnId: destColemnId };

      newDestTasks.splice(destIndex, 0, newRemoved);

      reoderTasksApi(newDestTasks, destColemnId, token);

      dispatch(
        setTasksByColumn({
          taskByColumns: {
            ...taskByColumns,
            [sourceColumnId]: newSourceTasks,
            [destColemnId]: newDestTasks,
          },
        })
      );
      return;
    }
  };

  const handleClickCreateColumn = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();
    if (token) {
      const newColumn = await createColumn(token, idBoard, {
        title: titleForColumn,
        order: columns.length,
      });

      dispatch(setColumns({ columns: [...columns, newColumn] }));

      dispatch(setTasksByColumn({ taskByColumns: { ...taskByColumns, [newColumn._id]: [] } }));
    }
  };

  return (
    <div className={styles.wrap}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Nunito Sans", sans-serif',
          fontSize: '40px',
          fontWeight: 800,
          textAlign: 'center',
        }}
      >
        {titleBoard}
      </Typography>
      {!isLoading ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId={DROPPABLE_ID_BOARD}
            type={DROPPABLE_TYPE_BOARD}
            direction={DROPPABLE_DIRECTION_BOARD}
          >
            {(provider) => (
              <div className={styles.board} ref={provider.innerRef} {...provider.droppableProps}>
                {columns.map(({ _id, title }, index) => (
                  <Draggable key={_id} draggableId={_id} index={index}>
                    {(provider) => (
                      <div
                        {...provider.draggableProps}
                        {...provider.dragHandleProps}
                        ref={provider.innerRef}
                        className={styles.column}
                      >
                        <Column
                          id={_id}
                          title={title}
                          addTask={addTaskMemo}
                          delColumn={delColumnMemo}
                          delTask={delTaskMemo}
                          tasks={taskByColumns ? taskByColumns[_id] : []}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
                <div className={styles.create}>
                  <BasicModal title={BUTTON_INNER} func={handleClickCreateColumn}>
                    <FormColumn
                      titleForColumn={titleForColumn}
                      setTitleForColumn={setTitleForColumn}
                    />
                  </BasicModal>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        // <div className={styles.create} onClick={handleClickCreateColumn}>
        //   <AddBoxOutlinedIcon fontSize="large" sx={{ color: '#d4d4d4' }} />
        // </div>
        <span></span>
      )}
    </div>
  );
};

export default Board;
