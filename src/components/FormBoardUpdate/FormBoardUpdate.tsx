import { Box, Button, TextField } from '@mui/material';
import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import { BodyForBoard } from 'types/types';

interface FormBoardProps {
  bodyForUpdate: BodyForBoard | null;
  func: (event: FormEvent<HTMLFormElement>, title: string, description: string) => Promise<void>;
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

    props.func(event, title, description);
    props.setOpenUpdate(false);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
      <Box sx={style}>
        <TextField
          variant="outlined"
          label="Board title"
          name="title"
          inputRef={titleBoard}
          autoFocus={true}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Board description"
          name="description"
          inputRef={descriptionBoard}
          multiline={true}
          minRows={5}
          fullWidth
          required
        />
        <Button type="submit" variant="outlined" size="large" color="success">
          Update
        </Button>
      </Box>
    </form>
  );
}
