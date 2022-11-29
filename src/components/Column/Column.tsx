/* eslint-disable prettier/prettier */
import { deleteColumn } from 'api/columns/deleteColumn';
import { createTask } from 'api/tasks/createTask';
import { deleteTask } from 'api/tasks/deleteTask';
import { FormTask } from 'components/FormTask/FormTask';
import { BasicModal } from 'components/Modal/BasicModal';
import Task from 'components/Task/Task';
import { CSSProperties, FormEvent, memo, useEffect, useMemo, useRef, useState } from 'react';
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
import { DROPPABLE_TYPE_COLUMN, INITIAL_BODY_FOR_TASK } from './constants';
import { ColumnPropsType, RenderTaskFuncType } from './model';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button, IconButton, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';
import { FormColumnUpdate } from 'components/FormColumnUpdate/FormColumnUpdate';
import { updateColumn } from 'api/columns/updateColumn';
import { useTranslation } from 'react-i18next';
import { createSelector } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

const makeTasksSelector = () =>
  createSelector(
    [(state: IRootState) => state.board.taskByColumns, (_, id: string) => id],
    (a, id) => (a ? a[id] : [])
  );

const tokenSelector = createSelector([(state: IRootState) => state.auth], (a) => a.token);
const columnsSelector = createSelector([(state: IRootState) => state.board], (a) => a.columns);

const Column = memo(({ id, title, order, addTask, delColumn, delTask }: ColumnPropsType) => {
  const { t } = useTranslation();
  const { id: idBoard } = useParams();
  const listRef = useRef<List>(null);

  const [scroll, setScroll] = useState<number>(0);

  const token = useSelector((state: IRootState) => tokenSelector(state));
  const columns = useSelector((state: IRootState) => columnsSelector(state));

  const tasksSelector = useMemo(makeTasksSelector, []);
  const tasks = useSelector((state: IRootState) => tasksSelector(state, id));

  const [bodyForTask, setBodyForTask] = useState<BodyForTask>({
    order: tasks.length,
    ...INITIAL_BODY_FOR_TASK,
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);

  const handleClickOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleClickOpenDialog = (): void => {
    setOpenDialog(true);
  };

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

    if (token && idBoard) {
      const newTask = await createTask(token, idBoard, id, bodyForTask);

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
          task={tasks[rubric.source.index]}
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
              height={200}
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
        {t('boards.formTaskCreate')}
      </Button>

      <BasicModal
        title={t('boards.formTaskCreate')}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
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
        title={t('boards.dialogColumn')}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        func={handleClickDeleteButton}
      />
    </>
  );
});

export default memo(Column);
