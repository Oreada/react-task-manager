import { Avatar, Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface IFlatCard {
  name: string;
  link: string;
  icon: string;
  text: string;
}

const FlatCard: FC<IFlatCard> = ({ name, link, text, icon }) => {
  return (
    <Stack
      direction="column"
      alignItems="start"
      sx={{
        gap: 2.5,
        lineHeight: 25,
        py: 2.5,
        px: 5,
        boxShadow: `0 0 20px #d4d4d4`,
        borderRadius: 2,
        transition: 'all 0.3s ease 0s',
      }}
    >
      <Stack
        direction={{ mobile: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        sx={{
          gap: { mobile: 3, sm: 6 },
        }}
      >
        <a href={link} target="_blank" rel="noreferrer">
          <Avatar
            alt={name}
            src={icon}
            sx={{
              width: { mobile: 125, sm: 100 },
              height: { mobile: 125, sm: 100 },
              cursor: 'pointer',
            }}
          />
        </a>
        <Typography variant="h6" component="p">
          {text}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default FlatCard;
