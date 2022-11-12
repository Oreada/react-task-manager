import Column from 'components/Column/Column';
import cls from './Board.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DROPPABLE_DIRECTION_BOARD, DROPPABLE_ID_BOARD, DROPPABLE_TYPE_BOARD } from './constants';
import { DROPPABLE_TYPE_COLUMN } from 'components/Column/constants';
import { DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from 'store/model';
import { getColumnsThunk, setBoardId, setColumns } from 'store/boardSlice';
import { CURRENT_TOKEN } from 'constants/constants';
import { ColumnType, TaskType } from 'types/types';
import { updateColumnsSet } from 'api/columns/updateColumnsSet';
import { updateTasksSet } from 'api/tasks/updateTasksSet';
import { getTasksByIdBoard } from 'api/tasks/getTasksByIdBoard';

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { columns, isLoading } = useSelector((state: IRootState) => state.board);
  // const { tasks } = useSelector((state: IRootState) => state.column);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (id) {
      const getTaskOfBoard = async () => {
        setTasks(await getTasksByIdBoard(CURRENT_TOKEN, id));
      };

      dispatch(setBoardId({ idBoard: id }));
      dispatch(getColumnsThunk({ token: CURRENT_TOKEN, idBoard: id }));
      getTaskOfBoard();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (columns.length) {
      reoderColumns();
    }
  }, [columns, dispatch]);

  const reorderItems = <Type extends ColumnType | TaskType>(
    array: Type[],
    currentIndex: number,
    destinationIndex: number
  ) => {
    const result = [...array];
    const [removed] = result.splice(currentIndex, 1);
    result.splice(destinationIndex, 0, removed);
    return result;
  };
  const addTask = (newTask: TaskType) => {
    setTasks([...tasks, newTask]);
  };

  const reoderColumns = async () => {
    return await updateColumnsSet(
      CURRENT_TOKEN,
      columns.map((column, index) => {
        return {
          _id: column._id,
          order: index,
        };
      })
    );
  };

  const reoderTasks = async (tasks: TaskType[], columnId: string) => {
    return await updateTasksSet(
      CURRENT_TOKEN,
      tasks.map((task, index) => {
        return {
          _id: task._id,
          order: index,
          columnId,
        };
      })
    );
  };

  const handleDragEnd = async (result: DropResult) => {
    const {
      destination,
      source: { index, droppableId: sourceColumnId },
      type,
    } = result;

    if (!destination) {
      return;
    }

    const { droppableId: destColemnId } = destination;

    if (type === DROPPABLE_TYPE_BOARD) {
      const newColumns = reorderItems<ColumnType>(columns, index, destination.index);
      dispatch(setColumns({ columns: newColumns }));
      reoderColumns();
      return;
    }

    if (type === DROPPABLE_TYPE_COLUMN) {
      if (sourceColumnId === destColemnId) {
        //   const newColumns = columns.map((column) => {
        //     if (column._id === sourceColumnId) {
        //       // const newTasks = reorderItems<TaskType>(column.tasks, index, destination.index);
        //       // console.log(newTasks);
        //       // reoderTasks(newTasks, sourceColumnId);
        //       return {
        //         ...column,
        //         tasks: newTasks,
        //       };
        //     }
        //     return column;
        //   });
        //   dispatch(setColumns({ columns: newColumns }));
        // dispatch(reoderColumnsThunk({ columns: newColumns }));
        //   return;
      }

      return;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId={DROPPABLE_ID_BOARD}
        type={DROPPABLE_TYPE_BOARD}
        direction={DROPPABLE_DIRECTION_BOARD}
      >
        {(provider) => (
          <div className={cls.board} ref={provider.innerRef} {...provider.droppableProps}>
            {columns.map(({ _id, title }, index) => (
              <Draggable key={_id} draggableId={_id} index={index}>
                {(provider) => (
                  <div
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    ref={provider.innerRef}
                  >
                    <Column id={_id} title={title} addTask={addTask} />
                  </div>
                )}
              </Draggable>
            ))}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
