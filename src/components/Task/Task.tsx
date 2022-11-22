import { TaskPropsType } from './model';
import { DraggableProvided } from 'react-beautiful-dnd';
import { deleteTask } from 'api/tasks/deleteTask';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { CSSProperties, useState } from 'react';
import { TaskType } from 'types/types';
import { IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import styles from './Task.module.scss';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';

function getStyle(provided: DraggableProvided, style: CSSProperties) {
  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

const Task = ({ idColumn, idTask, titleTask, delTask, provider, style }: TaskPropsType) => {
  const { idBoard } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);
  const [isHovering, setIsHovering] = useState(false);

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
      >
        {titleTask}
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
