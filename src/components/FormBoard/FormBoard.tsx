import { Box, TextField, Button } from '@mui/material';
import { useHandleClickCreateBoard } from 'hooks/useHandleClickCreateBoard';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormBoardProps {
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
  const { t } = useTranslation();

  const createBord = useHandleClickCreateBoard();

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const HandleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    createBord(event, values.title, values.description);
    props.setOpenModal(false);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={HandleFormSubmit}>
      <Box sx={style}>
        <TextField
          variant="outlined"
          label={t('boards.formBoardTitle')}
          name="title"
          value={values.title}
          onChange={handleInputChange}
          autoFocus={true}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label={t('boards.formBoardDesc')}
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
