import Column from 'components/Column/Column';
import cls from './Board.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  COLUMNLIST,
  DROPPABLE_DIRECTION_BOARD,
  DROPPABLE_ID_BOARD,
  DROPPABLE_TYPE_BOARD,
} from './constants';
import { DRAGGABLE_ID_COLUMN, DROPPABLE_TYPE_COLUMN } from 'components/Column/constants';
import { DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';

const Board = () => {
  const [columns, setColumns] = useState(COLUMNLIST);

  const reorderItems = (array: number[], currentIndex: number, destinationIndex: number) => {
    const result = [...array];
    const [removed] = result.splice(currentIndex, 1);
    result.splice(destinationIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.type === DROPPABLE_TYPE_BOARD) {
      setColumns(reorderItems(columns, result.source.index, result.destination.index));
      return;
    }

    if (result.type === DROPPABLE_TYPE_COLUMN) {
      // setColumns(reorderItems(columns, result.source.index, result.destination.index));
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
            {columns.map((item, index) => (
              <Draggable key={item} draggableId={DRAGGABLE_ID_COLUMN + item} index={index}>
                {(provider) => (
                  <div
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    ref={provider.innerRef}
                  >
                    <Column id={item.toString()} />
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
