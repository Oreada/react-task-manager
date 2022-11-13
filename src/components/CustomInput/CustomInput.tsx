import { Box, TextField, TextFieldProps } from '@mui/material';
import { FC, ReactNode } from 'react';

type iconType = { icon?: ReactNode };
type widthType = { width?: string };

type IProps = TextFieldProps & iconType & widthType;

const CustomInput: FC<IProps> = ({ icon, width, ...atr }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: { width } }}>
      {icon}
      <TextField {...atr} sx={{ width: { width } }} />
    </Box>
  );
};
export default CustomInput;
