import { Box, TextField } from '@mui/material';
import { MutableRefObject, useEffect, useRef } from 'react';
import { ColumnType } from 'types/types';

interface FormColumnProps {
  setIsInput: (arg: boolean) => void;
  titleColumn: string;
  handleClickEdit: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    title: string
  ) => Promise<ColumnType | void>;
}

export function FormColumnUpdate(props: FormColumnProps) {
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
  }, []);

  const handleSubmit = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const titleUpdated = (titleColumn.current as HTMLInputElement).value;

    props.handleClickEdit(event, titleUpdated);
    props.setIsInput(false);
  };

  return (
    <form style={{ width: '100%' }}>
      <Box>
        <TextField
          variant="outlined"
          label="Board title"
          name="title"
          inputRef={titleColumn}
          autoFocus={true}
          onBlur={handleSubmit}
          fullWidth
          required
        />
      </Box>
    </form>
  );
}
