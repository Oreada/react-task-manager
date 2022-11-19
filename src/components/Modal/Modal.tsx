import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TaskType } from 'types/types';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  func: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<TaskType | void> | void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '50%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,

  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['"Noto Sans"', 'Roboto', 'Arial', 'sans-serif'].join(','),
      textTransform: 'none',
    },
  },
});

export function BasicModal(props: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" endIcon={<AddCircleRoundedIcon />} color="success" onClick={handleOpen}>
        {props.title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
              {props.title}
            </Typography>

            {props.children}

            <Button
              variant="outlined"
              size="large"
              color="success"
              onClick={(event) => {
                props.func(event);
                handleClose();
              }}
            >
              Add
            </Button>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
}
