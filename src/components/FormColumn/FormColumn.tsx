import { FormEvent, useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    props.func(event);
    props.setOpenModal(false);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
      <Box sx={style}>
        <TextField
          variant="outlined"
          label={t('boards.formColumnTitle')}
          name="title"
          value={valueInput}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          autoFocus={true}
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
