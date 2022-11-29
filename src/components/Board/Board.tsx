import { createColumn } from 'api/columns/createColumn';
import { reoderColumnsApi } from 'api/helpers/reoderColumnsApi';
import { reoderTasksApi } from 'api/helpers/reoderTasksApi';
import Column from 'components/Column/Column';
import styles from './Board.module.scss';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { DROPPABLE_DIRECTION_BOARD, DROPPABLE_ID_BOARD, DROPPABLE_TYPE_BOARD } from './constants';
import { DROPPABLE_TYPE_COLUMN } from 'components/Column/constants';
import { FormColumn } from 'components/FormColumn/FormColumn';
import { BasicModal } from 'components/Modal/BasicModal';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, IRootState } from 'store/model';
import { getBoardData, setBoardId, setColumns, setTasksByColumn } from 'store/boardSlice';
import { ColumnType, TaskType } from 'types/types';
import { Button, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddCircleRounded';
import { TasksByColumnsType } from './model';
import { reorderItems } from 'components/helpers/reorderItems';
import { BOARDS_PATH } from 'router/constants';
import { useTranslation } from 'react-i18next';

const Board = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { idBoard, titleBoard, columns, taskByColumns, isLoading } = useSelector(
    (state: IRootState) => state.board
  );
  const { token } = useSelector((state: IRootState) => state.auth);

  const [openModal, setOpenModal] = useState<boolean>(false);
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
    // eslint-disable-next-line
    [taskByColumns, dispatch]
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

  const handleClickOpenModal = (): void => {
    setOpenModal(true);
  };

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

  const handleClickCreateColumn = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
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

  const goBoards = () => navigate(BOARDS_PATH);

  const handleClickBack = () => {
    goBoards();
  };

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
        }}
      >
        {titleBoard}
      </Typography>
      {isLoading ? (
        <span>Loading....</span>
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
                    delTask={delTaskMemo}
                  />
                ))}
                {provider.placeholder}

                <div className={styles.create} onClick={handleClickOpenModal}>
                  <AddBoxOutlinedIcon fontSize="large" sx={{ color: '#d4d4d4' }} />
                </div>

                <BasicModal
                  title={t('boards.formColumnCreate')}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                >
                  <FormColumn
                    titleForColumn={titleForColumn}
                    setTitleForColumn={setTitleForColumn}
                    func={handleClickCreateColumn}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                  />
                </BasicModal>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default Board;
