import { Box, Container, Stack, Typography } from '@mui/material';
import Card from 'components/Card/Card';
import FlatCard from 'components/FlatCard/FlatCard';
import { useTranslation } from 'react-i18next';
import HeroBack from './assets/hero-back-orange.svg';
import Puzzle from './assets/puzzles-green.svg';
import TeamBack from './assets/team-back-circles-2.svg';
import { CARD_CONTENT, DEVELOPER_CONTENT, ICardContent } from './constants';
const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack
        component="article"
        sx={{
          position: 'relative',
          width: '100%',
          background: `url(${HeroBack}) 50% 112% no-repeat`,
          paddingTop: 7.5,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', flexDirection: { xs: 'column', tablet: 'row' }, gap: 3.75 }}
        >
          <Stack
            direction="column"
            justifyContent="start"
            maxWidth={{ xs: '100%', tablet: '40%' }}
            sx={{ gap: 5 }}
          >
            <Typography variant="h2" component="h2" sx={{ fontWeight: 700 }}>
              {t('main.heroTitle')}
            </Typography>
            <Typography variant="h6" component="p">
              {t('main.heroText')}
            </Typography>
          </Stack>
          <Box
            sx={{
              width: { xs: '100%', tablet: '60%' },
              height: { xs: 300, tablet: 500 },
              backgroundImage: `url(${Puzzle})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: { xs: '50% 0%', tablet: '0% 20%' },
              backgroundSize: 'contain',
            }}
          />
        </Container>
      </Stack>

      <Stack component="article" pt={{ xs: 7.5, tablet: 3 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', gap: 3.75 }}>
          <Stack direction="column" alignItems="center" sx={{ gap: 7.5 }}>
            <Stack direction="column" justifyContent="center" alignItems="center" sx={{ gap: 3 }}>
              <Typography variant="h3" component="h3" sx={{ fontWeight: 700 }}>
                {t('main.advantagesTitle')}
              </Typography>
              <Typography variant="h6" component="h4">
                {t('main.advantagesSubtitle')}
              </Typography>
            </Stack>

            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="stretch"
              flexWrap={{ xs: 'wrap', laptop: 'nowrap' }}
              sx={{ gap: 5 }}
            >
              {CARD_CONTENT.map((item: ICardContent) => (
                <Card
                  key={item.title}
                  title={t(`main.${item.title}`)}
                  text={t(`main.${item.text}`)}
                  icon={item.icon}
                />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Stack>

      <Stack
        component="article"
        sx={{ width: '100%', bgcolor: 'substitute.main', color: 'blond.main', mt: 10, py: 7.5 }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', tablet: 'row' },
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Stack
            maxWidth={{ xs: '90%', tablet: '38%' }}
            direction="column"
            alignItems="flex-start"
            spacing={2.5}
          >
            <Typography variant="h3" component="h5" sx={{ fontWeight: 700 }}>
              {t('main.videoTitle')}
            </Typography>
            <Typography variant="h6" component="p">
              {t('main.videoSubtitle')}
            </Typography>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: { xs: '56%', tablet: '32%' },
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderWidth: 0,
                outlineWidth: 0,
              }}
              src="https://www.youtube.com/embed/yh-KIhzQ3JY"
              title="How to use the app"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Container>
      </Stack>

      <Stack
        component="article"
        sx={{
          width: '100%',
          pt: 10,
          pb: 10,
          backgroundImage: `url(${TeamBack})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: { xs: '130%', md: '140%', xl: '100%' },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
        >
          <Stack direction="column" alignItems="center" sx={{ gap: 3 }}>
            <Typography variant="h3" component="h5" sx={{ fontWeight: 700 }}>
              {t('main.teamTitle')}
            </Typography>
            <Typography variant="h6" component="p">
              {t('main.teamSubtitles')}
            </Typography>
          </Stack>
          <Stack direction="column" spacing={3.5}>
            {DEVELOPER_CONTENT.map((developer) => (
              <FlatCard
                key={developer.name}
                name={developer.name}
                link={developer.link}
                icon={developer.icon}
                text={t(`main.${developer.text}`)}
              />
            ))}
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default WelcomePage;
