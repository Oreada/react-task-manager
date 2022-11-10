import { DROPPABLE_ID_COLUMN, DROPPABLE_TYPE_COLUMN, TASKLIST, TextInner } from './constants';
import cls from './Column.module.scss';
import Task from 'components/Task/Task';
import { Droppable } from 'react-beautiful-dnd';
import { ColumnPropsType } from './model';

const Column = ({ id }: ColumnPropsType) => {
  return (
    <Droppable droppableId={DROPPABLE_ID_COLUMN + id} type={DROPPABLE_TYPE_COLUMN}>
      {(provider) => (
        <div className={cls.column} ref={provider.innerRef} {...provider.droppableProps}>
          <h3>{TextInner.title}</h3>
          {TASKLIST.map((item, index) => (
            <Task key={item} idColumn={id} idTask={index.toString()} />
          ))}
          {provider.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
