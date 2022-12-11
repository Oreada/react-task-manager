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
      maxWidth={400}
      sx={{
        position: 'relative',
        gap: 2.5,
        padding: 5,
        boxShadow: `0 0 20px #d4d4d4`,
        borderRadius: 2.5,
        transition: 'all 0.3s ease 0s',
      }}
    >
      <Box
        sx={{
          width: { xs: 120, laptop: 150 },
          height: { xs: 120, laptop: 150 },
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
          paddingTop: '60px',
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
