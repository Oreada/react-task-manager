import { FormEvent, useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface FormColumnProps {
  titleForColumn: string;
  setTitleForColumn: (arg: string) => void;
  func: (event: FormEvent<HTMLFormElement>) => Promise<void>;
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

export function FormColumn(props: FormColumnProps) {
  const [valueInput, setValueInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setValueInput(title);
  };

  const handleSubmit = () => {
    props.setTitleForColumn(valueInput);
  };

  useEffect(() => {
    handleSubmit();
  }, [valueInput]);

  return (
    <form
      style={{ width: '100%' }}
      onSubmit={(event) => {
        props.func(event);
        props.setOpenModal(false);
      }}
    >
      <Box sx={style}>
        <TextField
          variant="outlined"
          label="Column title"
          name="title"
          value={valueInput}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          autoFocus={true}
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
