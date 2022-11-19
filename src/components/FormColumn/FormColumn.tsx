import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';

interface FormColumnProps {
  titleForColumn: string;
  setTitleForColumn: (arg: string) => void;
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
    <form style={{ width: '100%' }}>
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
        />
      </Box>
    </form>
  );
}
