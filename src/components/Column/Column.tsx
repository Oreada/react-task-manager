import { DROPPABLE_TYPE_COLUMN, MAX_VISIBLE_TASKS } from './constants';
import cls from './Column.module.scss';
import Task from 'components/Task/Task';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
} from 'react-beautiful-dnd';
import { ColumnPropsType, RenderTaskFuncType } from './model';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { CSSProperties, memo, useEffect, useRef, useState } from 'react';
import { createTask } from 'api/tasks/createTask';
import { BodyForTask, TaskType } from 'types/types';
import { deleteColumn } from 'api/columns/deleteColumn';
import {
  VariableSizeList as List,
  ListChildComponentProps,
  areEqual,
  ListOnItemsRenderedProps,
} from 'react-window';
import { deleteTask } from 'api/tasks/deleteTask';
import { BasicModal } from 'components/Modal/Modal';
import { FormTask } from 'components/FormTask/FormTask';
import { IconButton, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Column = memo(({ id, title, addTask, delColumn, delTask, tasks }: ColumnPropsType) => {
  const listRef = useRef<List>(null);
  const [scroll, setScroll] = useState<number>(0);
  const { idBoard } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);

  const [bodyForTask, setBodyForTask] = useState<BodyForTask>({
    order: tasks.length,
    userId: '',
    users: [''],
    title: 'no title',
    description: 'no description',
  });

  useEffect(() => {
    console.log('scroll');

    if (listRef && listRef.current) {
      listRef.current.scrollToItem(scroll);
    }
  }, [tasks]);

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

  const getRenderTask: RenderTaskFuncType =
    (style: CSSProperties) =>
    (provider: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) =>
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

  const Row = memo(({ data, index, style }: ListChildComponentProps) => {
    const item = data[index];

    if (!item) {
      return null;
    }

    const patchedStyle: CSSProperties = {
      ...style,
    };

    return (
      <Draggable key={item._id} draggableId={item._id} index={index}>
        {/* {(provider, snapshot) => (
          <Task
            idColumn={id}
            idTask={item._id}
            titleTask={item.title}
            delTask={delTask}
            provider={provider}
            isDragging={snapshot.isDragging}
            style={patchedStyle}
          />
        )} */}
        {getRenderTask(patchedStyle)}
      </Draggable>
    );
  }, areEqual);

  const handleRender = ({ visibleStartIndex }: ListOnItemsRenderedProps) => {
    console.log(visibleStartIndex);
    setScroll(visibleStartIndex);
  };

  return (
    <div className={cls.column}>
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
      {/* <Divider sx={{ width: '100%', color: '#d4d4d4' }} /> */}
      <Droppable
        droppableId={id}
        type={DROPPABLE_TYPE_COLUMN}
        mode="virtual"
        renderClone={getRenderTask({ margin: 0 })}
      >
        {(provider, snapshot) => {
          const itemCount: number = snapshot.isUsingPlaceholder ? tasks.length + 1 : tasks.length;

          return (
            <List
              height={itemCount > MAX_VISIBLE_TASKS ? 150 : itemCount * 50}
              itemCount={itemCount}
              itemSize={() => 40}
              width={200}
              ref={listRef}
              outerRef={provider.innerRef}
              itemData={tasks}
              style={{ transition: 'background-color 0.2s ease', paddingBottom: '10px' }}
              overscanCount={10}
              onItemsRendered={handleRender}
            >
              {Row}
            </List>
          );
        }}
      </Droppable>
      <BasicModal title="Create task" func={handleClickCreateButton}>
        <FormTask bodyForTask={bodyForTask} setBodyForTask={setBodyForTask} />
      </BasicModal>
      <IconButton
        onClick={handleClickDeleteButton}
        aria-label="delete"
        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </div>
  );
});

export default memo(Column);
