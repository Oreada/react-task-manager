/* eslint-disable prettier/prettier */
import { deleteColumn } from 'api/columns/deleteColumn';
import { createTask } from 'api/tasks/createTask';
import { deleteTask } from 'api/tasks/deleteTask';
import { FormTask } from 'components/FormTask/FormTask';
import { BasicModal } from 'components/Modal/BasicModal';
import Task from 'components/Task/Task';
import { CSSProperties, FormEvent, memo, useEffect, useRef, useState } from 'react';
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
import { BodyForTask, ColumnType, TaskType } from 'types/types';
import { BUTTON_INNER, DROPPABLE_TYPE_COLUMN, INITIAL_BODY_FOR_TASK } from './constants';
import { ColumnPropsType, RenderTaskFuncType } from './model';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button, IconButton, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';
import { FormColumnUpdate } from 'components/FormColumnUpdate/FormColumnUpdate';
import { updateColumn } from 'api/columns/updateColumn';

const Column = memo(({ id, title, order, addTask, delColumn, delTask, tasks }: ColumnPropsType) => {
  const listRef = useRef<List>(null);

  const [scroll, setScroll] = useState<number>(0);
  const { idBoard, columns } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const [bodyForTask, setBodyForTask] = useState<BodyForTask>({
    order: tasks.length,
    ...INITIAL_BODY_FOR_TASK,
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const [isInput, setIsInput] = useState<boolean>(false);

  const handleClickOpenInput = () => {
    setIsInput(true);
  };

  const [columnUpdated, setColumnUpdated] = useState<ColumnType | null>(null);

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollToItem(scroll);
    }
    // eslint-disable-next-line
  }, [columns]);

  const handleClickCreateButton = async (
    event: FormEvent<HTMLFormElement>
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
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, title: string
  ): Promise<ColumnType | void> => {
    if (token) {
      const columnUpdated = await updateColumn(token, idBoard, id, { title: title, order: order });
      setColumnUpdated(columnUpdated);
      return columnUpdated;
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
          descriptionTask={tasks[rubric.source.index].description}
          orderTask={tasks[rubric.source.index].order}
          ownerTask={tasks[rubric.source.index].userId}
          usersOfTask={tasks[rubric.source.index].users}
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
      {isInput ? <FormColumnUpdate titleColumn={columnUpdated ? columnUpdated.title : title} setIsInput={setIsInput} handleClickEdit={handleClickEdit} /> :

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
        </Typography>}

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

      <Button
        variant="outlined"
        endIcon={<AddCircleRoundedIcon />}
        color="success"
        onClick={handleClickOpenModal}
      >
        {BUTTON_INNER}
      </Button>

      <BasicModal title={BUTTON_INNER} openModal={openModal} setOpenModal={setOpenModal}>
        <FormTask
          bodyForTask={bodyForTask}
          setBodyForTask={setBodyForTask}
          func={handleClickCreateButton}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </BasicModal>

      <IconButton
        onClick={handleClickOpenDialog}
        aria-label="delete"
        sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>

      <DialogDelete
        title="column"
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        func={handleClickDeleteButton}
      />
    </>
  );
});

export default memo(Column);
