import { BODY, BUTTON_INNER, DROPPABLE_MODE_COLUMN, DROPPABLE_TYPE_COLUMN } from './constants';
import cls from './Column.module.scss';
import Task from 'components/Task/Task';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
} from 'react-beautiful-dnd';
import { ColumnPropsType, RenderTaskFuncType, RowProps } from './model';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from 'store/model';
import { CURRENT_TOKEN } from 'constants/constants';
import { CSSProperties, memo, useEffect, useRef, useState } from 'react';
import { createTask } from 'api/tasks/createTask';
import { ColumnType, TaskType } from 'types/types';
import { setColumns, setTasks } from 'store/boardSlice';
import { getAllTasksOfColumn } from 'api/tasks/getAllTasksOfColumn';
import { deleteColumn } from 'api/columns/deleteColumn';
import {
  VariableSizeList as List,
  ListChildComponentProps,
  areEqual,
  ListOnItemsRenderedProps,
} from 'react-window';
import { RenderResult } from '@testing-library/react';
import { deleteTask } from 'api/tasks/deleteTask';

const Column = memo(({ id, title, addTask, delColumn, delTask, tasks }: ColumnPropsType) => {
  const listRef = useRef<List>(null);
  const [scroll, setScroll] = useState<number>(0);
  const { idBoard } = useSelector((state: IRootState) => state.board);

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollToItem(scroll);
    }
  }, [tasks, scroll]);

  const handleClickCreateButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<TaskType> => {
    event.preventDefault();

    const newTask = await createTask(CURRENT_TOKEN, idBoard, id, {
      ...BODY,
      order: tasks.length,
    });

    addTask(newTask);
    return newTask;
  };

  const handleClickDeleteButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();
    delColumn(id);

    Promise.all(tasks.map(async ({ _id }) => await deleteTask(CURRENT_TOKEN, idBoard, id, _id)));
    deleteColumn(CURRENT_TOKEN, idBoard, id);
  };

  const getRenderTask: RenderTaskFuncType =
    (style?: CSSProperties) =>
    (provider: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) =>
      (
        <Task
          idColumn={id}
          idTask={tasks[rubric.source.index]._id}
          delTask={delTask}
          provider={provider}
          isDragging={snapshot.isDragging}
          style={{ margin: 0 }}
        />
      );

  const Row = memo(({ data, index, style }: ListChildComponentProps) => {
    const item = data[index];

    if (!item) {
      return null;
    }

    const patchedStyle = {
      ...style,
    };

    return (
      <Draggable key={item._id} draggableId={item._id} index={index}>
        {(provider, snapshot) => (
          <Task
            idColumn={id}
            idTask={item._id}
            delTask={delTask}
            provider={provider}
            isDragging={snapshot.isDragging}
            style={patchedStyle}
          />
        )}
      </Draggable>
    );
  }, areEqual);

  const handleRender = ({ visibleStartIndex }: ListOnItemsRenderedProps) =>
    setScroll(visibleStartIndex);

  return (
    <div className={cls.column}>
      <h3>{title}</h3>
      <Droppable
        droppableId={id}
        type={DROPPABLE_TYPE_COLUMN}
        mode={DROPPABLE_MODE_COLUMN}
        renderClone={getRenderTask()}
      >
        {(provider, snapshot) => {
          const itemCount: number = snapshot.isUsingPlaceholder ? tasks.length + 1 : tasks.length;

          return (
            <List
              height={200}
              itemCount={itemCount}
              itemSize={() => 40}
              width={180}
              ref={listRef}
              outerRef={provider.innerRef}
              itemData={tasks}
              style={{ transition: 'background-color 0.2s ease' }}
              overscanCount={10}
              onItemsRendered={handleRender}
            >
              {Row}
            </List>
          );
        }}
      </Droppable>
      <button onClick={handleClickCreateButton}>{BUTTON_INNER.createTask}</button>
      <button onClick={handleClickDeleteButton}>{BUTTON_INNER.deleteColumn}</button>
    </div>
  );
});

export default memo(Column);
