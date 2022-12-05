import { Box, TextField, TextFieldProps } from '@mui/material';
import { FC, memo, ReactNode } from 'react';

type iconType = { icon?: ReactNode };
type widthType = { width?: string };

type IProps = TextFieldProps & iconType & widthType;

const CustomInput: FC<IProps> = memo(({ icon, width, ...atr }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', minHeight: 70, width: { width } }}>
      {icon}
      <TextField {...atr} color="basic" sx={{ width: { width } }} />
    </Box>
  );
});
export default CustomInput;
