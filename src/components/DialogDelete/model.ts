import { TaskType } from 'types/types';

export interface DialogProps {
  title: string;
  openDialog: boolean;
  setOpenDialog: (arg: boolean) => void;
  setIsHovering?: (arg: boolean) => void;

  func: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void> | Promise<TaskType | void> | void;
}
