import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
};

const initialValues = {
  id: 0,
  title: '',
  description: '',
};

export function FormTask() {
  const [values, setValues] = useState(initialValues);

  return (
    <form>
      <Box sx={style}>
        <TextField variant="outlined" label="Task title" value={values.title} autoFocus={true} />
        <TextField
          variant="outlined"
          label="Task description"
          value={values.description}
          multiline={true}
          minRows={5}
        />
      </Box>
    </form>
  );
}
