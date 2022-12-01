/* eslint-disable prettier/prettier */
import { deleteColumn } from 'api/columns/deleteColumn';
import { createTask } from 'api/tasks/createTask';
import { deleteTask } from 'api/tasks/deleteTask';
import { FormTask } from 'components/FormTask/FormTask';
import { BasicModal } from 'components/Modal/BasicModal';
import { FormEvent, memo, useMemo, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { ColumnType, TaskType } from 'types/types';
import { DROPPABLE_TYPE_COLUMN } from './constants';
import { ColumnPropsType } from './model';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button, IconButton, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';
import { FormColumnUpdate } from 'components/FormColumnUpdate/FormColumnUpdate';
import { updateColumn } from 'api/columns/updateColumn';
import { useTranslation } from 'react-i18next';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import styles from './Column.module.scss';
import TaskList from 'components/TaskList/TaskList';

const makeTasksSelector = () =>
  createSelector(
    [(state: IRootState) => state.board.taskByColumns, (_, id: string) => id],
    (a, id) => (a ? a[id] : [])
  );

const tokenSelector = createSelector([(state: IRootState) => state.auth], (a) => a.token);

const Column = ({ id, title, index, order, addTask, delColumn, delTask }: ColumnPropsType) => {
  const { t } = useTranslation();
  const { id: idBoard } = useParams();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const token = useSelector((state: IRootState) => tokenSelector(state));

  const tasksSelector = useMemo(makeTasksSelector, []);
  const tasks = useSelector((state: IRootState) => tasksSelector(state, id));

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [columnUpdated, setColumnUpdated] = useState<ColumnType | null>(null);

  const handleClickOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleClickOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleClickOpenInput = (): void => {
    setIsInput(true);
  };

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

      const newTask = await createTask(token, idBoard, id, bodyTask);

      addTask(newTask);
      return newTask;
    }
  };

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    if (token && idBoard) {
      delColumn(id);

      Promise.all(tasks.map(async ({ _id }) => await deleteTask(token, idBoard, id, _id)));
      deleteColumn(token, idBoard, id);
    }
  };

  const handleClickEdit = async (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    title: string
  ): Promise<ColumnType | void> => {
    if (token && idBoard) {
      const columnUpdated = await updateColumn(token, idBoard, id, { title: title, order: order });
      setColumnUpdated(columnUpdated);
      return columnUpdated;
    }
  };

  return (
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
                fontWeight: 600,
                fontSize: '18px',
                color: '#1c4931',
                textTransform: 'uppercase',
                textAlign: 'left',
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
                  <TaskList tasks={tasks} delTask={delTask} idColumn={id} />
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
            sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
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
  );
};

export default memo(Column);
