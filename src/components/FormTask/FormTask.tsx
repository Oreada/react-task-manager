import { FormEvent, useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { BodyForTask, TaskType, UserDecoder } from 'types/types';
import { AppDispatch, IRootState } from 'store/model';
import { useSelector } from 'react-redux';
import { parseBase64 } from 'api/helpers/parseBase64';
import { useDispatch } from 'react-redux';
import { getUserData } from 'store/authSlice';

interface FormTaskProps {
  bodyForTask: BodyForTask;
  setBodyForTask: (arg: BodyForTask) => void;
  func: (event: FormEvent<HTMLFormElement>) => Promise<TaskType | void>;
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
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch<AppDispatch>();

  const { id, token, user } = useSelector((state: IRootState) => state.auth);

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

  const handleSubmitTitle = () => {
    props.setBodyForTask({
      ...props.bodyForTask,
      title: values.title,
      userId: user ? user.login : '',
      users: [user ? user.login : ''],
    });
  };

  const handleSubmitDescription = () => {
    props.setBodyForTask({
      ...props.bodyForTask,
      description: values.description,
      userId: user ? user.login : '',
      users: [user ? user.login : ''],
    });
  };

  useEffect(() => {
    handleSubmitTitle();
  }, [values.title]);

  useEffect(() => {
    handleSubmitDescription();
  }, [values.description]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    props.func(event);
    props.setOpenModal(false);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
      <Box sx={style}>
        <TextField
          variant="outlined"
          label="Task title"
          name="title"
          value={values.title}
          onChange={handleInputChange}
          onSubmit={handleSubmitTitle}
          autoFocus={true}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Task description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          onSubmit={handleSubmitDescription}
          multiline={true}
          minRows={5}
          fullWidth
          required
        />
        <Button type="submit" variant="outlined" size="large" color="success">
          Add
        </Button>
      </Box>
    </form>
  );
}
