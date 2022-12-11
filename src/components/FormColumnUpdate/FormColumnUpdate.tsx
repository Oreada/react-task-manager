import { Box, IconButton, TextField } from '@mui/material';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnType } from 'types/types';

interface FormColumnProps {
  setIsInput: (arg: boolean) => void;
  titleColumn: string;
  handleClickEdit: (event: FormEvent<HTMLFormElement>, title: string) => Promise<ColumnType | void>;
}

const style = {
  marginTop: 1,
  paddingRight: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
};

export function FormColumnUpdate(props: FormColumnProps) {
  const { t } = useTranslation();

  const titleColumn: MutableRefObject<HTMLInputElement | null | undefined> = useRef();

  useEffect(() => {
    (titleColumn.current as HTMLInputElement).value = props.titleColumn;

    const setBlur = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        titleColumn.current?.blur();
      }
    };
    titleColumn.current?.addEventListener('keypress', setBlur);

    return () => {
      titleColumn.current?.removeEventListener('keypress', setBlur);
    };
  }, []);

  const handleCancel = () => {
    props.setIsInput(false);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const titleUpdated = (titleColumn.current as HTMLInputElement).value;
    props.handleClickEdit(event, titleUpdated);
    props.setIsInput(false);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
      <Box>
        <TextField
          variant="outlined"
          label={t('boards.formColumnTitle')}
          name="title"
          inputRef={titleColumn}
          autoFocus={true}
          multiline={true}
          fullWidth
          required
          sx={{ wordBreak: 'break-word', paddingRight: 3 }}
        />

        <Box sx={style}>
          <IconButton type="submit" color="success">
            <TaskAltRoundedIcon />
          </IconButton>
          <IconButton onClick={handleCancel} color="colorful">
            <BlockRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </form>
  );
}
