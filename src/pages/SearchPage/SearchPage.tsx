import { Button, Container, Typography } from '@mui/material';
import Task from 'components/Task/Task';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BOARDS_PATH } from 'router/constants';
import { getSearchingTasks, setFoundedTasks } from 'store/boardSlice';
import { AppDispatch, IRootState } from 'store/model';
import { TaskType } from 'types/types';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        dispatch(
          setFoundedTasks({
            foundedTasks: foundedTasks.filter(({ _id }) => _id !== idDeletedTask),
          })
        );
      };

      delTask(deletedTask);
    },
    [foundedTasks, dispatch]
  );

  const goBoards = () => navigate(BOARDS_PATH);

  const handleClickBack = () => {
    goBoards();
  };

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
    <span>{t('boards.nothingFounded')}</span>
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
      <Button
        component="label"
        variant="outlined"
        color="basic"
        onClick={handleClickBack}
        sx={{ alignSelf: 'flex-start' }}
      >
        {t('boards.backBoards')}
      </Button>
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Nunito Sans", sans-serif',
          fontSize: '40px',
          fontWeight: 800,
        }}
      >
        {t('boards.foundedTasks')}
      </Typography>
      {isLoading ? <span>Loading....</span> : FoundedTaskComponent}
    </Container>
  );
};

export default SearchPage;
