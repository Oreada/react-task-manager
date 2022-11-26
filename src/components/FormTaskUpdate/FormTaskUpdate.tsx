import { Box, Button, TextField, Typography } from '@mui/material';
import { getUser } from 'api/users/getUser';
import { FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { useTranslation } from 'react-i18next';
import { TaskType } from 'types/types';

interface FormTaskProps {
  title: string;
  description: string;
  userId: string;
  users: Array<string>;
  handleClickEditButton: (
    event: FormEvent<HTMLFormElement>,
    title: string,
    description: string
    // users: Array<string>
  ) => Promise<TaskType | void>;
  openUpdate: boolean;
  setOpenUpdate: (arg: boolean) => void;
}

const style = {
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
};

export function FormTaskUpdate(props: FormTaskProps) {
  const { t } = useTranslation();

  const titleTask: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const descriptionTask: MutableRefObject<HTMLInputElement | null | undefined> = useRef();

  const [ownerLogin, setOwnerLogin] = useState<string | null>(null);
  const { token } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    (titleTask.current as HTMLInputElement).value = props.title;
    (descriptionTask.current as HTMLInputElement).value = props.description;
  }, []);

  useEffect(() => {
    const getOwnerLogin = async () => {
      if (token) {
        const userData = await getUser(token, props.userId);
        setOwnerLogin(userData.login);
      }
    };

    getOwnerLogin();
  }, [props.userId, token]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const titleUpdated = (titleTask.current as HTMLInputElement).value;
    const descriptionUpdated = (descriptionTask.current as HTMLInputElement).value;

    props.handleClickEditButton(event, titleUpdated, descriptionUpdated);
    props.setOpenUpdate(false);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
      <Box sx={style}>
        <TextField
          variant="outlined"
          label={t('boards.formTaskTitle')}
          name="title"
          inputRef={titleTask}
          autoFocus={true}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label={t('boards.formTaskDesc')}
          name="description"
          inputRef={descriptionTask}
          multiline={true}
          minRows={5}
          fullWidth
          required
        />
        {!!ownerLogin && (
          <Typography>
            {t('boards.taskOwner')}: {ownerLogin}
          </Typography>
        )}
        <Button type="submit" variant="outlined" size="large" color="success">
          {t('boards.updateButton')}
        </Button>
      </Box>
    </form>
  );
}
