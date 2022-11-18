import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, To, useNavigate } from 'react-router-dom';
import { AppDispatch, IRootState } from 'store/model';
import cls from './MainPage.module.scss';
import { BODY, BUTTON_INNER } from './constants';
import { createBoardThunk, getBoardsThunk } from 'store/mainSlice';
import { ReactComponent as Back } from './assets/Back.svg';
import { Card, Container, Divider, Grid, Typography } from '@mui/material';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  const handleClickCreateButton = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  const handleClickGoTo = (to: To) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    if (token && id) {
      navigate(to);
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
      <Card
        sx={{
          width: '300px',
          height: '100px',
          padding: '20px',
          boxShadow: '0 0 20px #d4d4d4',
          borderRadius: '10px',
          border: '2px dashed #d4d4d4'
        }}
        onClick={handleClickCreateButton}
      ></Card>
      {/* <button onClick={handleClickCreateButton}>{BUTTON_INNER}</button> */}
      <Divider color={'#1c4931'} />
      <Grid container spacing={4}>
        {boards.map(({ _id, title, owner }) => (
          <Grid item key={_id} lg={4} md={6} xs={12}>
            <Card
              sx={{
                width: '300px',
                height: '100px',
                padding: '20px',
                boxShadow: '0 0 20px #d4d4d4',
                borderRadius: '10px',
              }}
              onClick={handleClickGoTo(`${_id}`)}
            >
              <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>
                {title}
              </Typography>
              
            </Card>
          </Grid>
        ))}
      </Grid>
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
    </Container>
  );
};

export default MainPage;
