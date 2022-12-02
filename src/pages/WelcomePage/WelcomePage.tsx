import { Box, Container, Stack, Typography } from '@mui/material';
import Card from 'components/Card/Card';
import FlatCard from 'components/FlatCard/FlatCard';
import { useTranslation } from 'react-i18next';
import { CARD_CONTENT, DEVELOPER_CONTENT, ICardContent } from './constants';
import styles from './WelcomePage.module.scss';

const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack component="article" className={styles.hero}>
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', flexDirection: { xs: 'column', tablet: 'row' }, gap: 3.75 }}
        >
          <Stack
            direction="column"
            justifyContent="start"
            maxWidth={{ xs: '90%', tablet: '40%' }}
            sx={{ gap: 5 }}
          >
            <Typography variant="h2" component="h2" sx={{ fontWeight: 800 }}>
              {t('main.heroTitle')}
            </Typography>
            <Typography variant="h6" component="p">
              {t('main.heroText')}
            </Typography>
          </Stack>
          <Box className={styles.hero__picture} />
        </Container>
      </Stack>

      <Stack component="article" className={styles.advantages}>
        <Container maxWidth="lg" sx={{ display: 'flex', gap: 3.75 }}>
          <Stack
            direction="column"
            alignItems="center"
            sx={{ gap: 7.5 }}
            className={styles.advantages__body}
          >
            <div className={styles['advantages__title-wrapper']}>
              <Typography variant="h3" component="h3" sx={{ fontWeight: 800 }}>
                {t('main.advantagesTitle')}
              </Typography>
              <Typography variant="h6" component="h4">
                {t('main.advantagesSubtitle')}
              </Typography>
            </div>

            <Stack
              flexDirection="row"
              justifyContent="center"
              alignItems="stretch"
              flexWrap={{ xs: 'wrap', laptop: 'nowrap' }}
              sx={{ gap: 3.5 }}
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
        sx={{ width: '100%', bgcolor: 'substitute.main', color: 'blond.main', mt: 20, py: 7.5 }}
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
            <Typography variant="h3" component="h5" sx={{ fontWeight: 800 }}>
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
              src={t('main.videoSrc')}
              title="How to use the app"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Container>
      </Stack>

      <Stack component="article" className={styles.team}>
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
        >
          <Stack direction="column" alignItems="start" sx={{ gap: 5 }}>
            <Typography variant="h3" component="h5" sx={{ fontWeight: 800 }}>
              {t('main.teamTitle')}
            </Typography>
            <Typography variant="h6" component="p">
              {t('main.teamSubtitles')}
            </Typography>
          </Stack>
          <Stack direction="column" spacing={2.75}>
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
