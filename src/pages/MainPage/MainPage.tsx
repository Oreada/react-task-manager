import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { FormBoard } from 'components/FormBoard/FormBoard';
import { BasicModal } from 'components/Modal/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { To, useNavigate } from 'react-router-dom';
import {
  createBoardThunk,
  deleteBoardThunk,
  editBoardThunk,
  getBoardsThunk,
} from 'store/mainSlice';
import { AppDispatch, IRootState } from 'store/model';
import { BodyForBoard } from 'types/types';
import { ReactComponent as Back } from './assets/Back.svg';
import { MAIN_PAGE_TITLE, NO_DESCRIPTION } from './constants';
import styles from './MainPage.module.scss';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { boards, isLoading } = useSelector((state: IRootState) => state.main);
  const { token, id: idUser } = useSelector((state: IRootState) => state.auth);

  const [bodyForBoard, setBodyForBoard] = useState<BodyForBoard>({
    owner: idUser ? idUser : '',
    users: [idUser ? idUser : ''],
    title: 'no title',
    description: 'no description',
  });

  useEffect(() => {
    const getBoardsWithSighUp = (): void => {
      if (token) {
        dispatch(getBoardsThunk({ token }));
      }
    };

    getBoardsWithSighUp();
  }, [token, dispatch]);

  const handleClickCreateButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    if (token && idUser) {
      dispatch(
        createBoardThunk({
          token,
          body: bodyForBoard,
        })
      );
    }
  };

  const handleClickGoTo =
    (to: To) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      event.preventDefault();
      if (token && idUser) {
        navigate(to);
      }
    };

  const handleClickDelButton =
    (idBoard: string) =>
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
      event.preventDefault();
      //todo modal
      if (token) {
        dispatch(deleteBoardThunk({ token, idBoard }));
      }
      event.stopPropagation();
    };

  const handleClickEditButton =
    (idBoard: string) =>
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
      event.preventDefault();
      //todo modal

      if (token && idUser) {
        dispatch(
          editBoardThunk({
            token,
            idBoard,
            body: {
              owner: idUser,
              users: [idUser],
              description: 'Description',
              title: 'new title',
            },
          })
        );
      }

      event.stopPropagation();
    };

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
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
        {MAIN_PAGE_TITLE}
      </Typography>
      <Grid container spacing={4}>
        {boards.map(({ _id, title, description }) => (
          <Grid item key={_id} xs>
            <div className={styles.card} onClick={handleClickGoTo(`${_id}`)}>
              <Typography
                variant="h6"
                sx={{
                  width: '100%',
                  fontFamily: '"Noto Sans", sans-serif',
                  letterSpacing: '0.0625rem',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#1c4931',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                }}
              >
                {title}
              </Typography>
              <Divider sx={{ width: '100%', color: '#d4d4d4' }} />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Noto Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  textAlign: 'left',
                }}
              >
                {description ? description : NO_DESCRIPTION}
              </Typography>
              <IconButton
                onClick={handleClickDelButton(_id)}
                aria-label="delete"
                sx={{ position: 'absolute', top: 30, right: 0, zIndex: 2 }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleClickEditButton(_id)}
                aria-label="edit"
                sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </div>
          </Grid>
        ))}

        <Grid item xs>
          <BasicModal title="Create board" func={handleClickCreateButton}>
            <FormBoard bodyForBoard={bodyForBoard} setBodyForBoard={setBodyForBoard} />
          </BasicModal>

          {/* <div className={styles.card + ' ' + styles.create} onClick={handleClickCreateButton}>
            <AddBoxOutlinedIcon fontSize="large" sx={{ color: '#d4d4d4' }} />
          </div> */}
        </Grid>
      </Grid>
      <Back className={styles.back} />
    </Container>
  );
};

export default MainPage;
