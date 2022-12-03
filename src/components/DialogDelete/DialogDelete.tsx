import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import { useTranslation } from 'react-i18next';
import { DialogProps } from './model';

const style = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
};

export function DialogDelete(props: DialogProps) {
  const { t } = useTranslation();

  const handleClose = () => {
    props.setIsHovering && props.setIsHovering(false);
    props.setOpenDialog(false);
  };

  const handleAgree = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.func(event);
    handleClose();
  };

  return (
    <Box>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('boards.dialogWarning')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box sx={style}>
            <IconButton onClick={handleAgree} color="success">
              <TaskAltRoundedIcon />
            </IconButton>
            <IconButton onClick={handleClose} color="colorful">
              <BlockRoundedIcon />
            </IconButton>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
