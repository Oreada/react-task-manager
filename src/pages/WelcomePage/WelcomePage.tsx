import styles from './WelcomePage.module.css';
import PhotoOlya from './photo_olya.jpg';
import PhotoKatya from './photo_katya.jpeg';
import PhotoSergey from './photo_sergey.png';

const WelcomePage = () => {
  return (
    <>
      <article className={styles.hero}>
        <div className={styles.hero__container}>
          <div className={styles.hero__body}>
            <div className={styles.hero__article}>
              <h2 className={styles.article__title}>Some title will be here soon</h2>
              <div className={styles.article__text}>
                There is a brief description of our application. Something like this: Manage your
                workflow and team cooperation. Join now to organize your tasks and change the way
                your team works.
              </div>
              <div className={styles.article__button}>Get started</div>
            </div>
            <div className={styles.hero__picture}></div>
          </div>
        </div>
      </article>

      <article className={styles.advantages}>
        <div className={styles.advantages__container}>
          <div className={styles.advantages__body}>
            <div className={styles['advantages__title-wrapper']}>
              <h3 className={styles.advantages__title}>Advantages</h3>
              <h4 className={styles.advantages__subtitle}>Why you should try our application</h4>
            </div>
            <div className={styles.advantages__box}>
              <p className={styles.advantages__item}>
                <div className={styles.item__picture_first}></div>
                <h5 className={styles.item__title}>Efficiency</h5>
                <div className={styles.item__text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere culpa provident
                  voluptas totam odio animi perspiciatis numquam magnam
                </div>
              </p>
              <p className={styles.advantages__item}>
                <div className={styles.item__picture_second}></div>
                <h5 className={styles.item__title}>Productivity</h5>
                <div className={styles.item__text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere culpa provident
                  voluptas totam odio animi perspiciatis numquam magnam
                </div>
              </p>
              <p className={styles.advantages__item}>
                <div className={styles.item__picture_third}></div>
                <h5 className={styles.item__title}>Interaction</h5>
                <div className={styles.item__text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere culpa provident
                  voluptas totam odio animi perspiciatis numquam magnam
                </div>
              </p>
            </div>
          </div>
        </div>
      </article>

      <article className={styles.instructions}>
        <div className={styles.instructions__container}>
          <div className={styles.instructions__box}>
            <div className={styles.instructions__note}>
              <h5 className={styles.instructions__title}>How to use the app</h5>
              <div className={styles.instructions__text}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere culpa provident
                voluptas totam odio animi perspiciatis numquam magnam
              </div>
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
              <h3 className={styles.team__title}>Our team</h3>
              <h4 className={styles.team__subtitle}>Meet the developers</h4>
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
                  <div className={styles.developer__description}>
                    A description of each developer&apos;s contribution to the joint work. A
                    description of each developer&apos;s contribution to the joint work.
                  </div>
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
                  <div className={styles.developer__description}>
                    A description of each developer&apos;s contribution to the joint work. A
                    description of each developer&apos;s contribution to the joint work.
                  </div>
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
                  <div className={styles.developer__description}>
                    A description of each developer&apos;s contribution to the joint work. A
                    description of each developer&apos;s contribution to the joint work.
                  </div>
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
