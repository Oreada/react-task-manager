import Column from 'components/Column/Column';
import cls from './Board.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DROPPABLE_DIRECTION_BOARD, DROPPABLE_ID_BOARD, DROPPABLE_TYPE_BOARD } from './constants';
import { DROPPABLE_TYPE_COLUMN, TASKLIST } from 'components/Column/constants';
import { DropResult } from 'react-beautiful-dnd';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from 'store/model';
import { getColumnsThunk, setColumns } from 'store/boardSlice';
import { CURRENT_TOKEN } from 'constants/constants';
import { ColumnType } from 'types/types';
import { updateColumnsSet } from 'api/columns/updateColumnsSet';

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { columns, isLoading } = useSelector((state: IRootState) => state.board);

  const columnsMemo = useMemo(() => {
    return columns;
  }, [columns]);

  useEffect(() => {
    if (id) {
      dispatch(getColumnsThunk({ token: CURRENT_TOKEN, idBoard: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const reoderColumns = async () => {
      return await updateColumnsSet(
        CURRENT_TOKEN,
        columnsMemo.map((column, index) => {
          return {
            _id: column._id,
            order: index,
          };
        })
      );
    };

    if (columnsMemo.length) {
      reoderColumns();
    }
  }, [columnsMemo, dispatch]);

  const reorderItems = <Type extends ColumnType | number>(
    array: Type[],
    currentIndex: number,
    destinationIndex: number
  ) => {
    const result = [...array];
    const [removed] = result.splice(currentIndex, 1);
    result.splice(destinationIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result: DropResult) => {
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
      const result = reorderItems<ColumnType>(columns, index, destination.index);
      dispatch(setColumns({ columns: result }));
      return;
    }

    if (type === DROPPABLE_TYPE_COLUMN) {
      if (sourceColumnId === destColemnId) {
        //id columns

        // console.log(draggableId); //id Task
        // console.log(source.index, destination.index);
        const newTasks = reorderItems<number>(TASKLIST, index, destination.index);
        const newColumns = columns.map((column) => {
          if (column._id === sourceColumnId) {
          }
          return column;
        });
        // dispatch(reoderColumnsThunk({ columns: newColumns }));
        return;
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
                    <Column id={_id} title={title} />
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
