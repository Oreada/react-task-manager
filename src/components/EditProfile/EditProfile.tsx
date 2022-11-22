import { FORM_INPUTS } from 'components/Auth/constants';
import { LOCAL_STORAGE_KEY, VALIDATION_FORM } from 'constants/constants';
import { saveToLocal } from 'helpers';
import { useInput } from 'hooks/useInput';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AUTHENTICATION_PATH, ROOT_PATH } from 'router/constants';
import { authSlice } from 'store/authSlice';
import { AppDispatch, AuthReducer, IRootState } from 'store/model';
import { IInput } from 'types/types';
import { updateUser } from '../../api/users/updateUser';
import { Alert, Button, Container, Grow, Snackbar, Stack, Typography } from '@mui/material';
import { FORM_TEXT } from './constants';
import CustomInput from 'components/CustomInput/CustomInput';
import { ReactComponent as HelloSvg } from './assets/Hello.svg';

const EditProfile = () => {
  const [error, setError] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const name: IInput = useInput('name', '', VALIDATION_FORM.name);
  const login: IInput = useInput('login', '', VALIDATION_FORM.login);
  const password: IInput = useInput('password', '', VALIDATION_FORM.password);
  const inputContent = FORM_INPUTS;

  const dispatch = useDispatch<AppDispatch>();
  const { setId } = authSlice.actions;
  const { token, id: userId } = useSelector((state: IRootState) => state.auth);

  const navigate = useNavigate();
  const goHome = () => navigate(ROOT_PATH);

  useEffect(() => {
    setCanSubmit(
      [name, login, password].reduce((acc, cur) => acc && !!cur.value && !cur.isError, true)
    );
  }, [login, name, password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (token && userId) {
        const { _id: newId, login: newLogin } = await updateUser(token, userId, {
          name: name.value,
          login: login.value,
          password: password.value,
        });

        dispatch(setId({ id: newId, login: newLogin, token: token }));
        saveToLocal<AuthReducer>(LOCAL_STORAGE_KEY, {
          id: newId,
          login: newLogin,
          token: token,
        });
        goHome();
      }
    } catch (err: unknown) {
      const error = err as Error;
      if (typeof error.cause !== 'number') {
        setError('Something wrong!...');
      }

      switch (error.cause) {
        case 400:
          setError('Error in the request');
          break;
        case 401:
          setError('Incorrect login or password');
          break;
        case 409:
          setError('User already exists');
          break;
        default:
          break;
      }
    }
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
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
          boxShadow: '0 10px 15px rgba(0,0,0, 0.1)',
          borderRadius: 10,
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
            {FORM_TEXT.title}
          </Typography>
          {[name, login, password].map((item) => (
            <CustomInput
              key={item.name}
              label={inputContent[item.name].label}
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

          <Button component="label" variant="contained" disabled={!canSubmit}>
            {FORM_TEXT.buttonText}
            <input hidden type="submit" />
          </Button>
        </Stack>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '50%' }}
        >
          <HelloSvg style={{ fill: '#F3B848', minWidth: '180px' }} />
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
  );
};

export default EditProfile;
