import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  maxWidth: 600,
  width: '90%',
  gap: 5,
  p: { xs: 2.5, sm: 5 },

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  bgcolor: 'background.paper',
  borderRadius: 2.5,
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
  const handleClickCloseModal = () => {
    props.setOpenModal(false);
  };

  return (
    <>
      <Modal
        open={props.openModal}
        onClose={handleClickCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
              {props.title}
            </Typography>

            {props.children}
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
}
