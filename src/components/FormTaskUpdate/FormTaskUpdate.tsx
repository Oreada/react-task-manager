import { Box, Button, TextField } from '@mui/material';
import { FormEvent, MutableRefObject, useEffect, useRef } from 'react';
import { TaskType } from 'types/types';

interface FormTaskProps {
  title: string;
  description: string;
  userId: string;
  users: Array<string>;
  handleClickEditButton: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    description: string,
    userId: string,
    users: Array<string>
  ) => Promise<TaskType | void>;
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

export function FormTaskUpdate(props: FormTaskProps) {
  const titleTask: MutableRefObject<HTMLInputElement | null | undefined> = useRef();


}
