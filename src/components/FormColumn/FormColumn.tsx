import { FormEvent, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FormColumnProps {
  handleClickCreateColumn: (event: FormEvent<HTMLFormElement>, title: string) => Promise<void>;
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

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    props.handleClickCreateColumn(event, valueInput);
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
          autoFocus={true}
          multiline={true}
          fullWidth
          required
          sx={{ wordBreak: 'break-word' }}
        />
        <Button type="submit" variant="outlined" size="large" color="success">
          {t('boards.addButton')}
        </Button>
      </Box>
    </form>
  );
}
