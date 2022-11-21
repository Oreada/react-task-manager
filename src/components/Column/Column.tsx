import { deleteColumn } from 'api/columns/deleteColumn';
import { createTask } from 'api/tasks/createTask';
import { deleteTask } from 'api/tasks/deleteTask';
import { FormTask } from 'components/FormTask/FormTask';
import { BasicModal } from 'components/Modal/Modal';
import Task from 'components/Task/Task';
import { CSSProperties, memo, useEffect, useRef, useState } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
} from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import {
  areEqual,
  ListChildComponentProps,
  ListOnItemsRenderedProps,
  VariableSizeList as List,
} from 'react-window';
import { IRootState } from 'store/model';
import { BodyForTask, TaskType } from 'types/types';
import { BUTTON_INNER, DROPPABLE_TYPE_COLUMN, INITIAL_BODY_FOR_TASK } from './constants';
import { ColumnPropsType, RenderTaskFuncType } from './model';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Typography } from '@mui/material';

const Column = memo(({ id, title, addTask, delColumn, delTask, tasks }: ColumnPropsType) => {
  const listRef = useRef<List>(null);

  const [scroll, setScroll] = useState<number>(0);
  const { idBoard, columns } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);

  const [bodyForTask, setBodyForTask] = useState<BodyForTask>({
    order: tasks.length,
    ...INITIAL_BODY_FOR_TASK,
  });

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollToItem(scroll);
    }
    // eslint-disable-next-line
  }, [columns]);

  const handleClickCreateButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<TaskType | void> => {
    event.preventDefault();

    if (token) {
      const newTask = await createTask(token, idBoard, id, bodyForTask);

      addTask(newTask);
      return newTask;
    }
  };

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    if (token) {
      delColumn(id);

      Promise.all(tasks.map(async ({ _id }) => await deleteTask(token, idBoard, id, _id)));
      deleteColumn(token, idBoard, id);
    }
  };

  const handleClickEdit = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();

    if (token) {
    }
  };

  const handleRender = ({ visibleStartIndex }: ListOnItemsRenderedProps): void =>
    setScroll(visibleStartIndex);

  const getRenderTask: RenderTaskFuncType =
    (style: CSSProperties) =>
    (
      provider: DraggableProvided,
      snapshot: DraggableStateSnapshot,
      rubric: DraggableRubric
    ): JSX.Element =>
      (
        <Task
          idColumn={id}
          idTask={tasks[rubric.source.index]._id}
          titleTask={tasks[rubric.source.index].title}
          delTask={delTask}
          provider={provider}
          isDragging={snapshot.isDragging}
          style={style}
        />
      );

  const Row = memo(({ data, index, style }: ListChildComponentProps): JSX.Element | null => {
    const item = data[index];

    if (!item) {
      return null;
    }

    const patchedStyle: CSSProperties = {
      ...style,
    };

    return (
      <Draggable key={item._id} draggableId={item._id} index={index}>
        {getRenderTask(patchedStyle)}
      </Draggable>
    );
  }, areEqual);

  return (
    <>
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
        onClick={handleClickEdit}
      >
        {title}
      </Typography>
      <Droppable
        droppableId={id}
        type={DROPPABLE_TYPE_COLUMN}
        mode="virtual"
        renderClone={getRenderTask({ margin: 0, width: 200 })}
      >
        {(provider, snapshot) => {
          const itemCount: number = snapshot.isUsingPlaceholder ? tasks.length + 1 : tasks.length;
          return (
            <List
              height={itemCount > 0 ? 200 : 10}
              itemCount={itemCount}
              itemSize={() => 40}
              width={200}
              ref={listRef}
              outerRef={provider.innerRef}
              itemData={tasks}
              style={{
                transition: 'background-color 0.2s ease',
                paddingBottom: '10px',
                touchAction: 'none',
              }}
              overscanCount={10}
              onItemsRendered={handleRender}
            >
              {Row}
            </List>
          );
        }}
      </Droppable>
      <BasicModal title={BUTTON_INNER} func={handleClickCreateButton}>
        <FormTask bodyForTask={bodyForTask} setBodyForTask={setBodyForTask} />
      </BasicModal>
      <IconButton
        onClick={handleClickDeleteButton}
        aria-label="delete"
        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </>
  );
});

export default memo(Column);
