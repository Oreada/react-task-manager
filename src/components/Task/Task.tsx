import { TaskPropsType } from './model';
import { deleteTask } from 'api/tasks/deleteTask';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { FormEvent, useState } from 'react';
import { TaskType } from 'types/types';
import { Typography } from '@mui/material';
import styles from './Task.module.scss';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';
import { updateTask } from 'api/tasks/updateTask';
import { BasicModal } from 'components/Modal/BasicModal';
import { FormTaskUpdate } from 'components/FormTaskUpdate/FormTaskUpdate';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import BasicMenu from 'components/Menu/BasicMenu';
import Loader from 'components/Loader/Loader';

const Task = ({
  idColumn,
  task: {
    _id: idTask,
    title: titleTask,
    description: descriptionTask,
    order: orderTask,
    userId: ownerTask,
    users: usersOfTask,
    boardId: idBoard,
  },
  delTask,
  editTask,
  isDragging,
  provider,
}: TaskPropsType) => {
  const matches = useMediaQuery('(pointer: coarse)');

  const { t } = useTranslation();

  const { token } = useSelector((state: IRootState) => state.auth);
  const [isHovering, setIsHovering] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState<TaskType | null>(null); //! для видоизменения тайтла сразу после апдейта
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClickOpenUpdate = (): void => setOpenUpdate(true);

  const handlePointerOver = (): void => setIsHovering(true);

  const handlePointerOut = (): void => setIsHovering(false);

  const handleClickOpenDialog = (): void => setOpenDialog(true);

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    if (token) {
      setLoading(true);

      const deletedTask = await deleteTask(token, idBoard, idColumn, idTask);

      setLoading(false);

      delTask(deletedTask);
    }
  };

  const handleClickEditButton = async (
    event: FormEvent<HTMLFormElement>,
    title: string,
    description: string
  ): Promise<void> => {
    if (token) {
      setLoading(true);

      const editedTask = await updateTask(token, idBoard, idColumn, idTask, {
        order: orderTask,
        columnId: idColumn,
        userId: ownerTask,
        users: usersOfTask,
        title: title,
        description: description,
      });

      setLoading(false);

      editTask(editedTask);

      setTaskUpdated(taskUpdated);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div
        {...provider?.draggableProps}
        {...provider?.dragHandleProps}
        style={{
          backgroundColor: isDragging ? '#d4d4d4' : 'transparent',
          ...provider?.draggableProps.style,
        }}
        ref={provider?.innerRef}
        onMouseEnter={handlePointerOver}
        onMouseLeave={handlePointerOut}
        className={styles.task}
      >
        <Typography
          variant="body1"
          sx={{
            flex: 'auto',
            width: '90%',
            fontFamily: '"Noto Sans", sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            textAlign: 'left',
            wordBreak: 'break-word',
          }}
          onClick={handleClickOpenUpdate}
        >
          {taskUpdated ? taskUpdated.title : titleTask}
        </Typography>
        {(isHovering || matches) && (
          <BasicMenu
            handleClickOpenUpdate={handleClickOpenUpdate}
            handleClickOpenDialog={handleClickOpenDialog}
            setIsHovering={setIsHovering}
          />
        )}
        {openUpdate && (
          <BasicModal
            title={t('boards.formTaskUpdate')}
            openModal={openUpdate}
            setOpenModal={setOpenUpdate}
          >
            <FormTaskUpdate
              title={taskUpdated ? taskUpdated.title : titleTask}
              description={taskUpdated ? taskUpdated.description : descriptionTask}
              userId={ownerTask}
              users={usersOfTask}
              handleClickEditButton={handleClickEditButton}
              openUpdate={openUpdate}
              setOpenUpdate={setOpenUpdate}
            />
          </BasicModal>
        )}
        {openDialog && (
          <DialogDelete
            title={t('boards.dialogTask')}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            func={handleClickDeleteButton}
          />
        )}
      </div>
    </>
  );
};

export default Task;
