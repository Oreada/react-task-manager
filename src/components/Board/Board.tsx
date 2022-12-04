import AddBoxOutlinedIcon from '@mui/icons-material/AddCircleRounded';
import { Button, Typography } from '@mui/material';
import { createColumn } from 'api/columns/createColumn';
import { reoderColumnsApi } from 'api/helpers/reoderColumnsApi';
import { reoderTasksApi } from 'api/helpers/reoderTasksApi';
import Column from 'components/Column/Column';
import { DROPPABLE_TYPE_COLUMN } from 'components/Column/constants';
import { FormColumn } from 'components/FormColumn/FormColumn';
import { reorderItems } from 'components/helpers/reorderItems';
import Loader from 'components/Loader/Loader';
import { BasicModal } from 'components/Modal/BasicModal';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BOARDS_PATH } from 'router/constants';
import { getBoardData, setColumns, setTasksByColumn } from 'store/boardSlice';
import { AppDispatch, IRootState } from 'store/model';
import { ColumnType, TaskType } from 'types/types';
import styles from './Board.module.scss';
import { DROPPABLE_DIRECTION_BOARD, DROPPABLE_ID_BOARD, DROPPABLE_TYPE_BOARD } from './constants';
import { TasksByColumnsType } from './model';

const Board = () => {
  const { t } = useTranslation();
  const { id: idBoard } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { titleBoard, columns, taskByColumns, isLoading } = useSelector(
    (state: IRootState) => state.board
  );
  const { token } = useSelector((state: IRootState) => state.auth);

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (idBoard && token) {
      const getResult = async (): Promise<void> => {
        dispatch(getBoardData({ token, idBoard }));
      };

      getResult();
    }
  }, [idBoard, token, dispatch]);

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
    [taskByColumns, dispatch]
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
    [taskByColumns, dispatch, columns]
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
    [taskByColumns, dispatch]
  );

  const editTaskMemo = useCallback(
    (editedTask: TaskType): void => {
      const editTask = (taskNew: TaskType): void => {
        taskByColumns &&
          dispatch(
            setTasksByColumn({
              taskByColumns: {
                ...taskByColumns,
                [taskNew.columnId]: taskByColumns[taskNew.columnId].map((taskOld) => {
                  if (taskOld._id === taskNew._id) {
                    return taskNew;
                  }

                  return taskOld;
                }),
              },
            })
          );
      };
      editTask(editedTask);
    },
    [taskByColumns, dispatch]
  );

  const handleClickOpenModal = (): void => setOpenModal(true);

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
    event: FormEvent<HTMLFormElement>,
    title: string
  ): Promise<void> => {
    event.preventDefault();
    if (token && idBoard) {
      const newColumn = await createColumn(token, idBoard, {
        title: title,
        order: columns.length,
      });

      dispatch(setColumns({ columns: [...columns, newColumn] }));

      dispatch(setTasksByColumn({ taskByColumns: { ...taskByColumns, [newColumn._id]: [] } }));
    }
  };

  const goBoards = (): void => navigate(BOARDS_PATH);
  const handleClickBack = (): void => goBoards();

  return (
    <div className={styles.wrap}>
      <Button
        component="label"
        variant="outlined"
        color="basic"
        onClick={handleClickBack}
        sx={{ alignSelf: 'flex-start' }}
      >
        {t('boards.backBoards')}
      </Button>

      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Nunito Sans", sans-serif',
          fontSize: '40px',
          fontWeight: 800,
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        {titleBoard}
      </Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId={DROPPABLE_ID_BOARD}
            type={DROPPABLE_TYPE_BOARD}
            direction={DROPPABLE_DIRECTION_BOARD}
          >
            {(provider) => (
              <div className={styles.board} ref={provider.innerRef} {...provider.droppableProps}>
                {columns.map(({ _id, title, order }, index) => (
                  <Column
                    key={_id}
                    id={_id}
                    index={index}
                    title={title}
                    order={order}
                    addTask={addTaskMemo}
                    delColumn={delColumnMemo}
                    editTask={editTaskMemo}
                    delTask={delTaskMemo}
                  />
                ))}
                {provider.placeholder}

                <div className={styles.create} onClick={handleClickOpenModal}>
                  <AddBoxOutlinedIcon fontSize="large" sx={{ color: '#d4d4d4' }} />
                </div>

                {openModal && (
                  <BasicModal
                    title={t('boards.formColumnCreate')}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                  >
                    <FormColumn
                      handleClickCreateColumn={handleClickCreateColumn}
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                    />
                  </BasicModal>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default Board;
