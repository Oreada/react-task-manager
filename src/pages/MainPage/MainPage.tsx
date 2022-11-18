import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, IRootState } from 'store/model';
import cls from './MainPage.module.scss';
import { BODY, BUTTON_INNER } from './constants';
import { createBoardThunk, getBoardsThunk } from 'store/mainSlice';
import { ReactComponent as Back } from './assets/Back.svg';
import { Card, Container, Divider, Grid, Typography } from '@mui/material';

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
      <Back
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Grid container spacing={4}>
        {boards.map(({ _id, title, owner }) => (
          <Grid item key={_id}>
            <Card
              sx={{
                padding: '50px',
                boxShadow: '0 0 20px #d4d4d4',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>
                {title}
              </Typography>
              <Divider color={'#1c4931'} />
              <Typography variant="h6" component={'span'} sx={{ fontFamily: 'inherit' }}>
                {owner}
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
