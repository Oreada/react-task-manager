import { FormEvent, useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { TaskType } from 'types/types';
import { AppDispatch, IRootState } from 'store/model';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserData } from 'store/authSlice';
import { useTranslation } from 'react-i18next';

interface FormTaskProps {
  handleClickCreateTask: (
    event: FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    id: string
  ) => Promise<TaskType | void>;
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

const style = {
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
};

const initialValues = {
  title: '',
  description: '',
};

export function FormTask(props: FormTaskProps) {
  const { t } = useTranslation();

  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch<AppDispatch>();

  const { id, token } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    dispatch(getUserData({ token, idUser: id }));
  }, [token, id, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    props.handleClickCreateTask(event, values.title, values.description, id ? id : '');
    props.setOpenModal(false);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
      <Box sx={style}>
        <TextField
          variant="outlined"
          label={t('boards.formTaskTitle')}
          name="title"
          value={values.title}
          onChange={handleInputChange}
          autoFocus={true}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label={t('boards.formTaskDesc')}
          name="description"
          value={values.description}
          onChange={handleInputChange}
          multiline={true}
          minRows={5}
          fullWidth
          required
        />
        <Button type="submit" variant="outlined" size="large" color="success">
          {t('boards.addButton')}
        </Button>
      </Box>
    </form>
  );
}
