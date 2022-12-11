import { Box, Button, TextField } from '@mui/material';
import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyForBoard } from 'types/types';

interface FormBoardProps {
  bodyForUpdate: BodyForBoard | null;
  handleClickEditButton: (
    event: FormEvent<HTMLFormElement>,
    title: string,
    description: string
  ) => Promise<void>;
  openUpdate: boolean;
  setOpenUpdate: (arg: boolean) => void;
}

const style = {
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
};

export function FormBoardUpdate(props: FormBoardProps) {
  const { t } = useTranslation();

  const titleBoard: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const descriptionBoard: MutableRefObject<HTMLInputElement | null | undefined> = useRef();

  useEffect(() => {
    (titleBoard.current as HTMLInputElement).value = props.bodyForUpdate?.title
      ? props.bodyForUpdate?.title
      : '';

    (descriptionBoard.current as HTMLInputElement).value = props.bodyForUpdate?.description
      ? props.bodyForUpdate?.description
      : '';
  }, [props.bodyForUpdate]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const title = (titleBoard.current as HTMLInputElement).value;
    const description = (descriptionBoard.current as HTMLInputElement).value;

    props.handleClickEditButton(event, title, description);
    props.setOpenUpdate(false);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
      <Box sx={style}>
        <TextField
          variant="outlined"
          label={t('boards.formBoardTitle')}
          name="title"
          inputRef={titleBoard}
          autoFocus={true}
          multiline={true}
          fullWidth
          required
          sx={{ wordBreak: 'break-word' }}
        />
        <TextField
          variant="outlined"
          label={t('boards.formBoardDesc')}
          name="description"
          inputRef={descriptionBoard}
          multiline={true}
          minRows={5}
          fullWidth
          required
          sx={{ wordBreak: 'break-word' }}
        />
        <Button type="submit" variant="outlined" size="large" color="success">
          {t('boards.updateButton')}
        </Button>
      </Box>
    </form>
  );
}
