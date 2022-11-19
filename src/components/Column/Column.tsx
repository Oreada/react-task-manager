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
import cls from './Column.module.scss';
import { BUTTON_INNER, DROPPABLE_TYPE_COLUMN, MAX_VISIBLE_TASKS } from './constants';
import { ColumnPropsType, RenderTaskFuncType } from './model';

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
    if (listRef && listRef.current) {
      listRef.current.scrollToItem(scroll);
    }
  }, [tasks, scroll]);

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

  const getRenderTask: RenderTaskFuncType = (style?: CSSProperties) => {
    return (
      provider: DraggableProvided,
      snapshot: DraggableStateSnapshot,
      rubric: DraggableRubric
    ) => (
      <Task
        idColumn={id}
        idTask={tasks[rubric.source.index]._id}
        titleTask={tasks[rubric.source.index].title}
        delTask={delTask}
        provider={provider}
        isDragging={snapshot.isDragging}
        style={{ margin: 0 }}
      />
    );
  };

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
            titleTask={item.title}
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

  const styleRow = {};

  return (
    <div className={cls.column}>
      <h3>{title}</h3>
      <Droppable
        droppableId={id}
        type={DROPPABLE_TYPE_COLUMN}
        mode={tasks.length > MAX_VISIBLE_TASKS ? 'virtual' : undefined}
        renderClone={getRenderTask()}
      >
        {(provider, snapshot) => {
          const itemCount: number = snapshot.isUsingPlaceholder ? tasks.length + 1 : tasks.length;

          return itemCount > MAX_VISIBLE_TASKS ? (
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
          ) : (
            <div className={cls.list} ref={provider.innerRef} {...provider.droppableProps}>
              {tasks.map((task, index) => (
                <Row key={task._id} data={tasks} index={index} style={styleRow} />
              ))}
              {provider.placeholder}
            </div>
          );
        }}
      </Droppable>

      <BasicModal title="Create task" func={handleClickCreateButton}>
        <FormTask bodyForTask={bodyForTask} setBodyForTask={setBodyForTask} />
      </BasicModal>

      <button onClick={handleClickDeleteButton}>{BUTTON_INNER.deleteColumn}</button>
    </div>
  );
});

export default memo(Column);
