import { TaskPropsType } from './model';
import { DraggableProvided } from 'react-beautiful-dnd';
import { BUTTON_INNER } from './constants';
import { deleteTask } from 'api/tasks/deleteTask';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { CSSProperties, useState } from 'react';
import { TaskType } from 'types/types';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
function getStyle(provided: DraggableProvided, style: CSSProperties) {
  return {
    display: 'flex',
    alignItems: 'center',
    width: 200,
    border: '1px solid #d4d4d4',
    borderRadius: '4px',
    padding: 10,
    '&:hover': {
      background: '#d4d4d4',
    },
    ...provided.draggableProps.style,
    ...style,
  };
}

const Task = ({ idColumn, idTask, titleTask, delTask, provider, style }: TaskPropsType) => {
  const { idBoard } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);
  const [isHovering, setIsHovering] = useState(false);

  const handlePointerOver = () => {
    setIsHovering(true);
  };

  const handlePointerOut = () => {
    setIsHovering(false);
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
          onClick={handleClickDeleteButton}
          aria-label="delete"
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
        >
          <RemoveCircleOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      )}
    </div>
  );
};

export default Task;
