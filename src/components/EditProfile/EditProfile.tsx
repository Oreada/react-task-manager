import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Container, Grow, Snackbar, Stack, Typography } from '@mui/material';
import { deleteUser } from 'api/users/deleteUser';
import CustomInput from 'components/CustomInput/CustomInput';
import { DialogDelete } from 'components/DialogDelete/DialogDelete';
import { LOCAL_STORAGE_KEY, VALIDATION_FORM } from '../../constants/constants';
import { removeLocal, saveToLocal } from 'helpers';
import { useInput } from 'hooks/useInput';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROOT_PATH } from 'router/constants';
import { authSlice, getUserData } from 'store/authSlice';
import { INITIAL_AUTH_STATE } from 'store/constants';
import { AppDispatch, AuthReducer, IRootState } from 'store/model';
import { IInput } from 'types/types';
import { updateUser } from '../../api/users/updateUser';
import { ReactComponent as EditSvg } from './assets/Edit.svg';
import { FORM_INPUTS } from './constants';

const EditProfile = () => {
  const { t } = useTranslation();

  const [error, setError] = useState<string>('');
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { setId, setUserData } = authSlice.actions;
  const { token, id: idUser, user, date } = useSelector((state: IRootState) => state.auth);

  const name: IInput = useInput('name', '', VALIDATION_FORM.name);
  const login: IInput = useInput('login', '', VALIDATION_FORM.login);
  const password: IInput = useInput('password', '', VALIDATION_FORM.password);
  const inputContent = FORM_INPUTS;

  const navigate = useNavigate();
  const goHome = (): void => navigate(ROOT_PATH);

  useEffect(() => {
    setCanSubmit(
      [name, login, password].reduce((acc, cur) => acc && !!cur.value && !cur.isError, true)
    );
  }, [login, name, password]);

  useEffect(() => {
    dispatch(getUserData({ token, idUser }));
  }, [token, idUser, dispatch]);

  useEffect(() => {
    if (user) {
      name.setValue(user.name);
      login.setValue(user.login);
    }
  }, [user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (token && idUser) {
        const { _id: newId, login: newLogin } = await updateUser(token, idUser, {
          name: name.value,
          login: login.value,
          password: password.value,
        });

        dispatch(getUserData({ token, idUser }));
        dispatch(setId({ id: newId, login: newLogin, token: token, date: date }));
        saveToLocal<Omit<AuthReducer, 'user'>>(LOCAL_STORAGE_KEY, {
          id: newId,
          login: newLogin,
          token: token,
          date: date,
        });
        goHome();
      }
    } catch (err: unknown) {
      const error = err as Error;
      if (typeof error.cause !== 'number') {
        setError(t('errors.something') as string);
      }

      switch (error.cause) {
        case 400:
          setError(t('errors.request') as string);
          break;
        case 401:
          setError(t('errors.loginOrPassword') as string);
          break;
        case 409:
          setError(t('errors.exists') as string);
          break;
        default:
          break;
      }
    }
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  const handleClickOpenDialog = (): void => setOpenDialog(true);

  const handleClickDeleteUser = (): void => {
    if (token && idUser) {
      deleteUser(token, idUser);
      dispatch(setId(INITIAL_AUTH_STATE));
      dispatch(setUserData({ user: null }));
      removeLocal(LOCAL_STORAGE_KEY);
      goHome();
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          overflow: 'hidden',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row-reverse' }}
          justifyContent="space-evenly"
          alignItems={{ xs: 'center', sm: 'stretch' }}
          spacing={3}
          maxWidth="md"
          sx={{
            padding: { xs: 2, sm: 6 },
            backgroundColor: '#fff',
            boxShadow: '0 0 20px #d4d4d4',
            borderRadius: '10px',
          }}
        >
          <Stack
            component="form"
            noValidate
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            sx={{ width: { xs: '80%', sm: '50%' } }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
              {t('profile.editTitle')}
            </Typography>
            {[name, login, password].map((item) => (
              <CustomInput
                key={item.name}
                label={t(`profile.${inputContent[item.name].label}`)}
                type={inputContent[item.name].type}
                name={inputContent[item.name].name}
                required={inputContent[item.name].required}
                icon={inputContent[item.name].icon}
                autoComplete={inputContent[item.name].autocomplete}
                variant="standard"
                width="100%"
                inputProps={{ minLength: inputContent[item.name].minlength }}
                helperText={item.isLeave ? item.errorText : ''}
                error={item.isLeave && item.isError}
                value={item.value}
                onChange={item.onChange}
                onBlur={item.onBlur}
                onFocus={item.onFocus}
              />
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', width: '100%' }}>
              <Button component="label" variant="outlined" disabled={!canSubmit} color="substitute">
                {t('profile.buttonEditText')}
                <input hidden type="submit" />
              </Button>
              <Button
                component="label"
                variant="outlined"
                color="basic"
                onClick={handleClickOpenDialog}
              >
                {t('profile.buttonDeleteText')}
              </Button>
            </Box>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ width: '50%' }}
          >
            <EditSvg style={{ width: 250 }} />
          </Stack>
        </Stack>
        <Snackbar
          open={!!error.length}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          TransitionComponent={Grow}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontSize: '2rem' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
      {openDialog && (
        <DialogDelete
          title={t('boards.dialogUser')}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          func={handleClickDeleteUser}
        />
      )}
    </>
  );
};

export default EditProfile;
