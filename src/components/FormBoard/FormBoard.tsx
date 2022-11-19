import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { BodyForBoard } from 'types/types';
import { IRootState } from 'store/model';
import { useSelector } from 'react-redux';

interface FormBoardProps {
  bodyForBoard: BodyForBoard;
  setBodyForBoard: (arg: BodyForBoard) => void;
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

  return (
    <form style={{ width: '100%' }}>
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
        />
      </Box>
    </form>
  );
}
