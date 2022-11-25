import { Container, Typography } from '@mui/material';
import Task from 'components/Task/Task';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSearchingTasks, setFoundedTasks } from 'store/boardSlice';
import { AppDispatch, IRootState } from 'store/model';
import { TaskType } from 'types/types';
import { SEARCH_PAGE_TITLE } from './constants';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { searchValue, foundedTasks, isLoading } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getSearchingTasks({ token, searchValue }));
    }
  }, [searchValue, token, dispatch]);

  const delTaskMemo = useCallback(
    (deletedTask: TaskType): void => {
      const delTask = ({ _id: idDeletedTask }: TaskType): void => {
        setFoundedTasks({
          foundedTasks: foundedTasks.filter((task) => task._id !== idDeletedTask),
        });
      };

      delTask(deletedTask);
    },
    [foundedTasks]
  );

  const FoundedTaskComponent = foundedTasks.length ? (
    foundedTasks.map((item) => (
      <Task
        key={item._id}
        idColumn={item.columnId}
        task={item}
        delTask={delTaskMemo}
        style={{ position: 'relative', margin: 0, width: 200 }}
      />
    ))
  ) : (
    <span>There is nothing</span>
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        padding: '2rem 1rem',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Nunito Sans", sans-serif',
          fontSize: '40px',
          fontWeight: 800,
        }}
      >
        {SEARCH_PAGE_TITLE}
      </Typography>
      {isLoading ? <span>Loading....</span> : FoundedTaskComponent}
    </Container>
  );
};

export default SearchPage;
