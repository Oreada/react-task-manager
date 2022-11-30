import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface ICard {
  title: string;
  text: string;
  icon: JSX.Element;
}

const Card: FC<ICard> = ({ title, text, icon }) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        position: 'relative',
        flex: '0 0 33%',
        gap: 2.5,
        padding: 6,
        boxShadow: 10,
        borderRadius: 8.125,
        transition: 'all 0.3s ease 0s',
      }}
    >
      <Box
        sx={{
          width: 150,
          height: 150,
          position: 'absolute',
          top: -50,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h5"
        component="h5"
        color="substitute"
        sx={{
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: 'uppercase',
          paddingTop: '30%',
        }}
      >
        {title}
      </Typography>
      <Typography variant="h6" component="p">
        {text}
      </Typography>
    </Stack>
  );
};
export default Card;
