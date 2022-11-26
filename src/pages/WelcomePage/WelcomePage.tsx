import { useTranslation } from 'react-i18next';
import PhotoKatya from './photo_katya.jpeg';
import PhotoOlya from './photo_olya.jpg';
import PhotoSergey from './photo_sergey.png';
import styles from './WelcomePage.module.scss';

const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <article className={styles.hero}>
        <div className={styles.hero__container}>
          <div className={styles.hero__body}>
            <div className={styles.hero__article}>
              <h2 className={styles.article__title}>{t('main.heroTitle')}</h2>
              <div className={styles.article__text}>{t('main.heroText')}</div>
              {/* <button className={styles.article__button}>Get started</button> */}
            </div>
            <div className={styles.hero__picture}></div>
          </div>
        </div>
      </article>

      <article className={styles.advantages}>
        <div className={styles.advantages__container}>
          <div className={styles.advantages__body}>
            <div className={styles['advantages__title-wrapper']}>
              <h3 className={styles.advantages__title}>{t('main.advantagesTitle')}</h3>
              <h4 className={styles.advantages__subtitle}>{t('main.advantagesSubtitle')}</h4>
            </div>
            <div className={styles.advantages__box}>
              <div className={styles.advantages__item}>
                <div className={styles.item__picture_first}></div>
                <h5 className={styles.item__title}>{t('main.advAimTitle')}</h5>
                <div className={styles.item__text}>{t('main.advAimText')}</div>
              </div>
              <div className={styles.advantages__item}>
                <div className={styles.item__picture_second}></div>
                <h5 className={styles.item__title}>{t('main.advClockTitle')}</h5>
                <div className={styles.item__text}>{t('main.advClockText')}</div>
              </div>
              <div className={styles.advantages__item}>
                <div className={styles.item__picture_third}></div>
                <h5 className={styles.item__title}>{t('main.advGlobeTitle')}</h5>
                <div className={styles.item__text}>{t('main.advGlobeText')}</div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className={styles.instructions}>
        <div className={styles.instructions__container}>
          <div className={styles.instructions__box}>
            <div className={styles.instructions__note}>
              <h5 className={styles.instructions__title}>{t('main.videoTitle')}</h5>
              <div className={styles.instructions__text}>{t('main.videoSubtitle')}</div>
            </div>
            <div className={styles.instructions__video}>
              <div className={styles.instructions__screensaver}>
                <div className={styles['instructions__watch-icon']}></div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className={styles.team}>
        <div className={styles.team__container}>
          <div className={styles.team__body}>
            <div className={styles['team__title-wrapper']}>
              <h3 className={styles.team__title}>{t('main.teamTitle')}</h3>
              <h4 className={styles.team__subtitle}>{t('main.teamSubtitles')}</h4>
            </div>
            <div className={styles.team__box}>
              <div className={styles.team__item}>
                <div className={styles.developer}>
                  <div className={styles.developer__photo}>
                    <a href="https://github.com/KateBlazhko" target="_blank" rel="noreferrer">
                      <img
                        className={styles.developer_image}
                        src={PhotoKatya}
                        width="100px"
                        height="100px"
                        alt="Developer photo"
                      />
                    </a>
                  </div>
                  <div className={styles.developer__description}>{t('main.teamKatya')}</div>
                </div>
              </div>
              <div className={styles.team__item}>
                <div className={styles.developer}>
                  <div className={styles.developer__photo}>
                    <a href="https://github.com/ps0m" target="_blank" rel="noreferrer">
                      <img
                        className={styles.developer_image}
                        src={PhotoSergey}
                        width="100px"
                        height="100px"
                        alt="Developer photo"
                      />
                    </a>
                  </div>
                  <div className={styles.developer__description}>{t('main.teamSergey')}</div>
                </div>
              </div>
              <div className={styles.team__item}>
                <div className={styles.developer}>
                  <div className={styles.developer__photo}>
                    <a href="https://github.com/Oreada" target="_blank" rel="noreferrer">
                      <img
                        className={styles.developer_image}
                        src={PhotoOlya}
                        width="100px"
                        height="100px"
                        alt="Developer photo"
                      />
                    </a>
                  </div>
                  <div className={styles.developer__description}>{t('main.teamOlya')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default WelcomePage;
