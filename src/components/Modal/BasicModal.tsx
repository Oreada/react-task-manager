import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  openModal: boolean;
  setOpenModal: (arg: boolean) => void;
  setIsHovering?: (arg: boolean) => void;
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
  const handleClickCloseModal = () => {
    props.setOpenModal(false);
    props.setIsHovering && props.setIsHovering(false);
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
