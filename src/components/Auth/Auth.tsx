import { Alert, Button, Container, Grow, Snackbar, Stack, Typography } from '@mui/material';
import CustomInput from 'components/CustomInput/CustomInput';
import { FormEvent, SyntheticEvent, useCallback, useState } from 'react';
import { ReactComponent as BlobTwo } from './assets/Blob_2.svg';
import { ReactComponent as BlobOne } from './assets/Blob_3.svg';
import { ReactComponent as GroupSvg } from './assets/Group.svg';
import { ReactComponent as HelloSvg } from './assets/Hello.svg';
import { FORM_INPUTS } from './constants';

enum typeSubPage {
  signUp,
  signIn,
}

const Auth = () => {
  const [subPage, setSubPage] = useState<typeSubPage>(typeSubPage.signIn);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const inputContent = FORM_INPUTS;

  const changeSubPage = useCallback(
    () => setSubPage((prev) => (prev ? typeSubPage.signUp : typeSubPage.signIn)),
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // signUp
    // setError('Какая-то ошибка');
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
        }}
      />
      <Stack
        direction={subPage ? { xs: 'column', sm: 'row' } : { xs: 'column', sm: 'row-reverse' }}
        justifyContent="space-between"
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
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ width: { xs: '80%', sm: '50%' } }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
            {subPage ? 'Sign in' : 'Sign up'}
          </Typography>

          {inputContent.map((item) => (
            <CustomInput
              icon={item.icon}
              width="100%"
              key={item.label}
              label={item.label}
              type={item.type}
              variant="standard"
              required={item.required}
              inputProps={{ minLength: item.minlength }}
            />
          ))}

          {/* <Button variant="contained" onSubmit={handleSubmit}>
            {subPage ? 'Log in' : 'Register'}
          </Button> */}

          <Button component="label" variant="contained">
            {subPage ? 'Log in' : 'Register'}
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
          {subPage ? <HelloSvg /> : <GroupSvg />}
          <Button variant="text" onClick={changeSubPage}>
            {subPage ? 'Create an account' : 'I am already member'}
          </Button>
        </Stack>
      </Stack>
      <BlobTwo
        style={{ position: 'absolute', width: 300, height: 300, top: -50, left: -50, zIndex: -1 }}
      />
      <Snackbar
        open={!!error.length}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Grow}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Auth;
