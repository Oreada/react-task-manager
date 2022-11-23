import { Box, TextField, Button } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { BodyForBoard } from 'types/types';

interface FormBoardProps {
  bodyForBoard: BodyForBoard;
  setBodyForBoard: (arg: BodyForBoard) => void;
  func: (event: FormEvent<HTMLFormElement>) => void;
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

export function FormBoard(props: FormBoardProps) {
  const [values, setValues] = useState(initialValues);

  const { id } = useSelector((state: IRootState) => state.auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitTitle = () => {
    props.setBodyForBoard({
      ...props.bodyForBoard,
      title: values.title,
      owner: id ? id : '',
      users: [id ? id : ''],
    });
  };

  const handleSubmitDescription = () => {
    props.setBodyForBoard({
      ...props.bodyForBoard,
      description: values.description,
      owner: id ? id : '',
      users: [id ? id : ''],
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
          label="Board title"
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
          label="Board description"
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
