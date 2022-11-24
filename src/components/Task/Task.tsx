import { TaskPropsType } from './model';
import { DraggableProvided } from 'react-beautiful-dnd';
import { deleteTask } from 'api/tasks/deleteTask';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { CSSProperties, FormEvent, useState } from 'react';
import { TaskType } from 'types/types';
import { IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import styles from './Task.module.scss';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';
import { updateTask } from 'api/tasks/updateTask';
import { BasicModal } from 'components/Modal/BasicModal';
import { FormTaskUpdate } from 'components/FormTaskUpdate/FormTaskUpdate';

function getStyle(provided: DraggableProvided, style: CSSProperties) {
  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

const Task = ({
  idColumn,
  idTask,
  titleTask,
  descriptionTask,
  orderTask,
  ownerTask,
  usersOfTask,
  delTask,
  provider,
  style,
}: TaskPropsType) => {
  const { idBoard } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);
  const [isHovering, setIsHovering] = useState(false);

  const [taskUpdated, setTaskUpdated] = useState<TaskType | null>(null); //! для видоизменения тайтла сразу после апдейта
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handlePointerOver = (): void => setIsHovering(true);

  const handlePointerOut = (): void => setIsHovering(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<TaskType | void> => {
    event.preventDefault();

    if (token) {
      const deletedTask = await deleteTask(token, idBoard, idColumn, idTask);

      delTask(deletedTask);
      return deletedTask;
    }
  };

  const handleClickEditButton = async (
    event: FormEvent<HTMLFormElement>,
    title: string,
    description: string
    // userId: string,
    // users: Array<string>
  ): Promise<TaskType | void> => {
    if (token) {
      const taskUpdated = await updateTask(token, idBoard, idColumn, idTask, {
        order: orderTask,
        columnId: idColumn,

        title: title,
        description: description,
        userId: ownerTask,
        users: usersOfTask,
      });

      setTaskUpdated(taskUpdated);
      return taskUpdated;
    }
  };

  return (
    <div
      {...provider.draggableProps}
      {...provider.dragHandleProps}
      ref={provider.innerRef}
      style={getStyle(provider, style)}
      onMouseOver={handlePointerOver}
      onMouseOut={handlePointerOut}
      className={styles.task}
    >
      <Typography
        variant="body1"
        sx={{
          fontFamily: '"Noto Sans", sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          textAlign: 'left',
        }}
        onClick={handleClickOpenUpdate}
      >
        {taskUpdated ? taskUpdated.title : titleTask}
      </Typography>
      {isHovering && (
        <IconButton
          onClick={handleClickOpenDialog}
          aria-label="delete"
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
        >
          <RemoveCircleOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      )}

      <BasicModal title="Update board" openModal={openUpdate} setOpenModal={setOpenUpdate}>
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

      <DialogDelete
        title="task"
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        func={handleClickDeleteButton}
      />
    </div>
  );
};

export default Task;
