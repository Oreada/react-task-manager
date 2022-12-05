import { Container, Link, Stack } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FOOTER_CONTENT } from './constants';

interface IFooterLink {
  name: string;
  link: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth: string;
}

const FooterLink: FC<IFooterLink> = ({ name, link, imgSrc, imgAlt, imgWidth }) => (
  <Link
    underline="none"
    href={link}
    variant="h6"
    color="#000"
    target="_blank"
    rel="noreferrer"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1.25,
    }}
  >
    <img src={imgSrc} alt={imgAlt} width={imgWidth} />
    {name}
  </Link>
);

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Stack
      component="footer"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: 'neutral.main',
        py: 3.75,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3.75,
          '&  *': {
            transition: '0.3s',
          },
          '&  *:hover': {
            color: '#1C4931',
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
          gap={4}
        >
          {FOOTER_CONTENT.map((content) => (
            <FooterLink
              key={content.name}
              name={t(`footer.${content.name}`)}
              link={content.link}
              imgSrc={content.imgSrc}
              imgAlt={content.imgAlt}
              imgWidth={content.imgWidth}
            />
          ))}
        </Stack>
      </Container>
    </Stack>
  );
};

export default Footer;
