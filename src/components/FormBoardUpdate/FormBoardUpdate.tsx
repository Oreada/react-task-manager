import { Box, TextField, Button } from '@mui/material';
import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { BodyForBoard } from 'types/types';

interface FormBoardProps {
  bodyForUpdate: BodyForBoard | null;
  setBodyForUpdate: (arg: BodyForBoard) => void;
  func: (event: FormEvent<HTMLFormElement>) => Promise<void>;
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
  const { id } = useSelector((state: IRootState) => state.auth);

  const titleBoard: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const descriptionBoard: MutableRefObject<HTMLInputElement | null | undefined> = useRef();

  const handleInputTitleChange = () => {
    if (props.bodyForUpdate) {
      props.setBodyForUpdate({
        ...props.bodyForUpdate,
        title: (titleBoard.current as HTMLInputElement).value,
        owner: id ? id : '',
        users: [id ? id : ''],
      });
    }
  };

  const handleInputDescriptionChange = () => {
    if (props.bodyForUpdate) {
      props.setBodyForUpdate({
        ...props.bodyForUpdate,
        description: (descriptionBoard.current as HTMLInputElement).value,
        owner: id ? id : '',
        users: [id ? id : ''],
      });
    }
  };

  useEffect(() => {
    console.log(titleBoard);
    console.log(titleBoard.current?.value);
    (titleBoard.current as HTMLInputElement).value = props.bodyForUpdate?.title
      ? props.bodyForUpdate?.title
      : '';

    (descriptionBoard.current as HTMLInputElement).value = props.bodyForUpdate?.description
      ? props.bodyForUpdate?.description
      : '';
  }, [props.bodyForUpdate]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log('handleFormSubmit');
    console.log((titleBoard.current as HTMLInputElement).value);
    console.log((descriptionBoard.current as HTMLInputElement).value);

    if (props.bodyForUpdate) {
      props.setBodyForUpdate({
        title: (titleBoard.current as HTMLInputElement).value,
        description: (descriptionBoard.current as HTMLInputElement).value,
        owner: id ? id : '',
        users: [id ? id : ''],
      });
    }

    props.func(event);
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
          onChange={handleInputTitleChange}
          autoFocus={true}
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          label="Board description"
          name="description"
          inputRef={descriptionBoard}
          onChange={handleInputDescriptionChange}
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
