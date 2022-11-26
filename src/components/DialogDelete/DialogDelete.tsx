import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { DialogProps } from './model';

export function DialogDelete(props: DialogProps) {
  const { t } = useTranslation();

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const handleAgree = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.func(event);
    handleClose();
  };

  return (
    <div>
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
          <Button onClick={handleClose}>{t('boards.dialogNo')}</Button>
          <Button onClick={handleAgree} autoFocus>
            {t('boards.dialogYes')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
