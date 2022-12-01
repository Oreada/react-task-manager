import Task from 'components/Task/Task';
import { memo } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { TaskListPropsType } from './model';

const TaskList = ({ tasks, idColumn, delTask }: TaskListPropsType) => (
  <>
    {tasks.map((task, index) => (
      <Draggable key={task._id} draggableId={task._id} index={index}>
        {(provider: DraggableProvided, snapshot: DraggableStateSnapshot): JSX.Element => (
          <Task
            idColumn={idColumn}
            task={task}
            delTask={delTask}
            provider={provider}
            isDragging={snapshot.isDragging}
          />
        )}
      </Draggable>
    ))}
  </>
);

export default memo(TaskList);
