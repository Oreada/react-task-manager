/* eslint-disable prettier/prettier */
import AddBoxOutlinedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';
import { FormBoard } from 'components/FormBoard/FormBoard';
import { FormBoardUpdate } from 'components/FormBoardUpdate/FormBoardUpdate';
import { BasicModal } from 'components/Modal/BasicModal';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { To, useNavigate } from 'react-router-dom';
import { setBoardTitle } from 'store/boardSlice';
import {
  createBoardThunk,
  deleteBoardThunk,
  editBoardThunk,
  getBoardsThunk
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

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const [bodyForBoard, setBodyForBoard] = useState<BodyForBoard>({
    owner: idUser ? idUser : '',
    users: [idUser ? idUser : ''],
    title: 'no title',
    description: 'no description',
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const [idBoardDelete, setIdBoardDelete] = useState<string>('');

  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const [idBoardUpdate, setIdBoardUpdate] = useState<string>('');

  const [bodyForUpdate, setBodyForUpdate] = useState<BodyForBoard | null>(null);

  useEffect(() => {
    const getBoardsWithSighUp = (): void => {
      if (token) {
        dispatch(getBoardsThunk({ token }));
      }
    };

    getBoardsWithSighUp();
  }, [token, dispatch]);

  const handleClickCreateButton = (event: FormEvent<HTMLFormElement>): void => {
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
    (to: To, title: string) =>
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
        if (token && idUser) {
          navigate(to);
          dispatch(setBoardTitle({ titleBoard: title }));
        }
      };

  const handleClickDelButton =
    (idBoard: string) =>
      async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.preventDefault();

        if (token) {
          dispatch(deleteBoardThunk({ token, idBoard }));
        }
        event.stopPropagation();
      };

  const handleClickEditButton =
    (idBoard: string) =>
      async (event: FormEvent<HTMLFormElement>, title: string, description: string): Promise<void> => {
        event.preventDefault();

        if (token && idUser) {
          const newBody = {
            owner: idUser,
            users: [idUser],
            description: description,
            title: title,
          }

          dispatch(
            editBoardThunk({
              token,
              idBoard,
              body: newBody ? newBody : {
                owner: idUser,
                users: [idUser],
                description: 'description',
                title: 'title',
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
        {boards.map(({ _id, title, description, owner, users }) => (
          <Grid item key={_id} xs>
            <div className={styles.card}>
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
                  cursor: 'pointer',
                }}
                onClick={handleClickGoTo(`${_id}`, title)}
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
                onClick={() => {
                  handleClickOpenDialog();
                  setIdBoardDelete(_id);
                }}
                aria-label="delete"
                sx={{ position: 'absolute', top: 30, right: 0, zIndex: 2 }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={() => {
                  handleClickOpenUpdate();
                  setIdBoardUpdate(_id);
                  setBodyForUpdate({
                    title: title,
                    description: description,
                    owner: owner,
                    users: users,
                  });
                }}
                aria-label="edit"
                sx={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </div>
          </Grid>
        ))}

        <BasicModal title="Update board" openModal={openUpdate} setOpenModal={setOpenUpdate}>
          <FormBoardUpdate
            bodyForUpdate={bodyForUpdate}
            handleClickEditButton={handleClickEditButton(idBoardUpdate)}
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
          />
        </BasicModal>

        <DialogDelete
          title="board"
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          func={handleClickDelButton(idBoardDelete)}
        />

        <Grid item xs>
          <div className={styles.card + ' ' + styles.create} onClick={handleClickOpenModal}>
            <AddBoxOutlinedIcon fontSize="large" sx={{ color: '#d4d4d4' }} />
          </div>
        </Grid>

        <BasicModal title="Create board" openModal={openModal} setOpenModal={setOpenModal}>
          <FormBoard
            bodyForBoard={bodyForBoard}
            setBodyForBoard={setBodyForBoard}
            func={handleClickCreateButton}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </BasicModal>
      </Grid>
      <Back className={styles.back} />
    </Container>
  );
};

export default MainPage;
