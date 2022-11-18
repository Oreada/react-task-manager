import { Alert, Button, Container, Grow, Snackbar, Stack, Typography } from '@mui/material';
import { signIn } from 'api/auth/signIn';
import { parseBase64 } from 'api/helpers/parseBase64';
import CustomInput from 'components/CustomInput/CustomInput';
import { LOCAL_STORAGE_KEY } from 'constants/constants';
import { saveToLocal } from 'helpers';
import { useInput } from 'hooks/useInput';
import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { authSlice } from 'store/authSlice';
import { AppDispatch, AuthReducer } from 'store/model';
import { IInput, typeSubPage, UserDecoder } from 'types/types';
import { signUp } from '../../api/auth/signUp';
import { ReactComponent as BlobTwo } from './assets/Blob_2.svg';
import { ReactComponent as BlobOne } from './assets/Blob_3.svg';
import { ReactComponent as GroupSvg } from './assets/Group.svg';
import { ReactComponent as HelloSvg } from './assets/Hello.svg';
import { FORM_INPUTS, FORM_TEXT, VALIDATION_FORM } from './constants';

const Auth = () => {
  const [error, setError] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  const name: IInput = useInput('name', '', VALIDATION_FORM.name);
  const login: IInput = useInput('login', '', VALIDATION_FORM.login);
  const password: IInput = useInput('password', '', VALIDATION_FORM.password);
  const inputContent = FORM_INPUTS;

  const dispatch = useDispatch<AppDispatch>();
  const { setId } = authSlice.actions;

  const navigate = useNavigate();
  const location = useLocation();
  const subPage: typeSubPage =
    location.state === typeSubPage.signIn ? typeSubPage.signIn : typeSubPage.signUp;

  const goHome = () => navigate('/');

  useEffect(() => {
    const inputStates =
      subPage === typeSubPage.signIn ? [login, password] : [name, login, password];
    const canS = inputStates.reduce((acc, cur) => acc && !!cur.value && !cur.isError, true);

    setCanSubmit(canS);
  }, [login, name, password, subPage]);

  // const changeSubPage = useCallback(
  //   () => setSubPage((prev) => (prev ? typeSubPage.signUp : typeSubPage.signIn)),
  //   []
  // );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (subPage === typeSubPage.signUp) {
        await signUp({ name: name.value, login: login.value, password: password.value });
      }
      const token = await signIn({ login: login.value, password: password.value });
      const user: UserDecoder = parseBase64(token);

      dispatch(setId({ id: user.id, login: user.login, token: token }));
      saveToLocal<AuthReducer>(LOCAL_STORAGE_KEY, { id: user.id, login: user.login, token: token });
      goHome();
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
      <BlobOne
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          bottom: -50,
          right: -50,
          zIndex: -1,
          fill: '#1C4931',
        }}
      />
      <Stack
        direction={
          subPage === typeSubPage.signIn
            ? { xs: 'column', sm: 'row' }
            : { xs: 'column', sm: 'row-reverse' }
        }
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
            {subPage === typeSubPage.signIn ? FORM_TEXT.titleIn : FORM_TEXT.titleUp}
          </Typography>

          {[name, login, password].map(
            (item) =>
              (subPage !== typeSubPage.signIn || item.name !== 'name') && (
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
              )
          )}

          <Button component="label" variant="contained" disabled={!canSubmit}>
            {subPage === typeSubPage.signIn ? FORM_TEXT.buttonTextIn : FORM_TEXT.buttonTextUp}
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
          {subPage === typeSubPage.signIn ? (
            <HelloSvg style={{ fill: '#F3B848' }} />
          ) : (
            <GroupSvg style={{ fill: '#F3B848' }} />
          )}
          <NavLink
            to="/form"
            state={subPage === typeSubPage.signIn ? typeSubPage.signUp : typeSubPage.signIn}
            style={{ color: 'inherit' }}
          >
            {subPage === typeSubPage.signIn
              ? FORM_TEXT.linkTextToPageUp
              : FORM_TEXT.linkTextToPageIn}
          </NavLink>
        </Stack>
      </Stack>
      <BlobTwo
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          top: -50,
          left: -50,
          zIndex: -1,
          fill: '#D85841',
        }}
      />
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

export default Auth;
