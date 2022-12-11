import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button, IconButton, Typography } from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { deleteColumn } from 'api/columns/deleteColumn';
import { updateColumn } from 'api/columns/updateColumn';
import { createTask } from 'api/tasks/createTask';
import { deleteTask } from 'api/tasks/deleteTask';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';
import { FormColumnUpdate } from 'components/FormColumnUpdate/FormColumnUpdate';
import { FormTask } from 'components/FormTask/FormTask';
import Loader from 'components/Loader/Loader';
import { BasicModal } from 'components/Modal/BasicModal';
import TaskList from 'components/TaskList/TaskList';
import { rootPortal } from 'index';
import { FormEvent, memo, useMemo, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IRootState } from 'store/model';
import { ColumnType, TaskType } from 'types/types';
import styles from './Column.module.scss';
import { DROPPABLE_TYPE_COLUMN } from './constants';
import { ColumnPropsType } from './model';

const makeTasksSelector = () =>
  createSelector(
    [(state: IRootState) => state.board.taskByColumns, (_, id: string) => id],
    (a, id) => (a ? a[id] : [])
  );

const tokenSelector = createSelector([(state: IRootState) => state.auth], (a) => a.token);

const Column = ({
  id,
  title,
  index,
  order,
  addTask,
  delColumn,
  delTask,
  editTask,
}: ColumnPropsType) => {
  const { t } = useTranslation();
  const { id: idBoard } = useParams();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const token = useSelector((state: IRootState) => tokenSelector(state));

  const tasksSelector = useMemo(makeTasksSelector, []);
  const tasks = useSelector((state: IRootState) => tasksSelector(state, id));

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [columnUpdated, setColumnUpdated] = useState<ColumnType | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClickOpenModal = (): void => setOpenModal(true);

  const handleClickOpenDialog = (): void => setOpenDialog(true);

  const handleClickOpenInput = (): void => setIsInput(true);

  const handleClickCreateTask = async (
    event: FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    idUser: string
  ): Promise<TaskType | void> => {
    event.preventDefault();

    if (token && idBoard) {
      const bodyTask = {
        order: tasks.length,
        userId: idUser,
        users: [idUser],
        title: title,
        description: description,
      };
      setLoading(true);

      const newTask = await createTask(token, idBoard, id, bodyTask);

      setLoading(false);

      addTask(newTask);
      return newTask;
    }
  };

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    if (token && idBoard) {
      setLoading(true);

      Promise.all(tasks.map(async ({ _id }) => await deleteTask(token, idBoard, id, _id)));
      await deleteColumn(token, idBoard, id);

      setLoading(false);

      delColumn(id);
    }
  };

  const handleClickEdit = async (
    event: FormEvent<HTMLFormElement>,
    title: string
  ): Promise<ColumnType | void> => {
    if (token && idBoard) {
      setLoading(true);

      const columnUpdated = await updateColumn(token, idBoard, id, { title: title, order: order });

      setLoading(false);

      setColumnUpdated(columnUpdated);
      return columnUpdated;
    }
  };

  return (
    <>
      {isLoading && createPortal(<Loader />, rootPortal)}
      <Draggable draggableId={id} index={index}>
        {(provider) => (
          <div
            {...provider.draggableProps}
            {...provider.dragHandleProps}
            ref={provider.innerRef}
            className={styles.column}
          >
            {isInput ? (
              <FormColumnUpdate
                titleColumn={columnUpdated ? columnUpdated.title : title}
                setIsInput={setIsInput}
                handleClickEdit={handleClickEdit}
              />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  width: '100%',
                  fontFamily: '"Noto Sans", sans-serif',
                  letterSpacing: '0.0625rem',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#1c4931',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  wordBreak: 'break-word',
                  paddingRight: 3,
                  cursor: 'pointer',
                }}
                onClick={handleClickOpenInput}
              >
                {columnUpdated ? columnUpdated.title : title}
              </Typography>
            )}

            <Droppable droppableId={id} type={DROPPABLE_TYPE_COLUMN}>
              {(provider) => {
                return (
                  <div className={styles.list} ref={provider.innerRef} {...provider.droppableProps}>
                    <TaskList tasks={tasks} delTask={delTask} idColumn={id} editTask={editTask} />
                    {provider.placeholder}
                  </div>
                );
              }}
            </Droppable>

            <Button
              variant="outlined"
              endIcon={<AddCircleRoundedIcon />}
              color="success"
              onClick={handleClickOpenModal}
            >
              {t('boards.formTaskCreate')}
            </Button>

            {openModal && (
              <BasicModal
                title={t('boards.formTaskCreate')}
                openModal={openModal}
                setOpenModal={setOpenModal}
              >
                <FormTask
                  handleClickCreateTask={handleClickCreateTask}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              </BasicModal>
            )}

            <IconButton
              onClick={handleClickOpenDialog}
              aria-label="delete"
              sx={{ position: 'absolute', top: '1%', right: '1%', zIndex: 2 }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>

            {openDialog && (
              <DialogDelete
                title={t('boards.dialogColumn')}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                func={handleClickDeleteButton}
              />
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default memo(Column);
