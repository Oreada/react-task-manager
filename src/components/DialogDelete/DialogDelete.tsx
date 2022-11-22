import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TaskType } from 'types/types';

interface DialogProps {
  title: string;
  openDialog: boolean;
  setOpenDialog: (arg: boolean) => void;
  func: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<TaskType | void>;
}

export function DialogDelete(props: DialogProps) {
  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const handleAgree = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.func(event);
    handleClose;
  };

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you want to delete this {props.title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The {props.title} will be deleted permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
