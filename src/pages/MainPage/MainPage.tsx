import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, IRootState } from 'store/model';
import cls from './MainPage.module.scss';
import { BODY, BUTTON_INNER } from './constants';
import { createBoardThunk, getBoardsThunk } from 'store/mainSlice';
import { ReactComponent as MainSvg } from './assets/MainSvg.svg';
import { Card, Container, Grid, Typography } from '@mui/material';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, isLoading } = useSelector((state: IRootState) => state.main);
  const { token, id } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    const getBoardsWithSighUp = async () => {
      if (token) {
        dispatch(getBoardsThunk({ token }));
      }
    };

    getBoardsWithSighUp();
  }, [token, dispatch]);

  const handleClickCreateButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (token && id) {
      dispatch(
        createBoardThunk({
          token,
          body: {
            owner: id,
            users: [id],
            ...BODY,
          },
        })
      );
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // flexGrow: '2',
        width: '100%',
        padding: '1rem',
        overflow: 'hidden',
      }}
    >
      <MainSvg
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          top: 0,
          left: '50%',
          zIndex: -1,
          fill: '#D85841',
          transform: 'translateX(-50%)',
        }}
      />
      <Grid container spacing={4}>
        {boards.map(({ _id, title }) => (
          <Grid item key={_id}>
            <Card>
              <Typography variant="h5" sx={{ fontFamily: 'inherit' }}>
                {title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <button onClick={handleClickCreateButton}>{BUTTON_INNER}</button>
    </Container>
  );
};

export default MainPage;
