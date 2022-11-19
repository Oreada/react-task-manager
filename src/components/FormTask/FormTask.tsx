import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { BodyForTask } from 'types/types';
import { IRootState } from 'store/model';
import { useSelector } from 'react-redux';

interface FormTaskProps {
  bodyForTask: BodyForTask;
  setBodyForTask: (arg: BodyForTask) => void;
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

  const { id } = useSelector((state: IRootState) => state.auth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });

    props.setBodyForTask({
      ...props.bodyForTask,
      [name]: value,
      userId: id ? id : '',
      users: [id ? id : ''],
    });
  };

  return (
    <form style={{ width: '100%' }}>
      <Box sx={style}>
        <TextField
          variant="outlined"
          label="Task title"
          name="title"
          value={values.title}
          onChange={handleInputChange}
          autoFocus={true}
          fullWidth
        />
        <TextField
          variant="outlined"
          label="Task description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          multiline={true}
          minRows={5}
          fullWidth
        />
      </Box>
    </form>
  );
}
