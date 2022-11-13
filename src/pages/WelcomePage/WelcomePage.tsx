import styles from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <>
      <div className={styles.hero}>
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
      </div>

      <div className={styles.advantages}>
        <div className={styles.advantages__container}>
          <div className={styles.advantages__body}>
            <h3 className={styles.advantages__title}>Advantages</h3>
            <h4 className={styles.advantages__subtitle}>Why you should try our application:</h4>
            <div className={styles.advantages__box}>
              <p className={styles.advantages__item}>
                <p className={styles.item__picture_first}></p>
                <h5 className={styles.item__title}>Productivity</h5>
                <p className={styles.item__text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere culpa provident
                  voluptas totam odio animi perspiciatis numquam magnam
                </p>
              </p>
              <p className={styles.advantages__item}>
                <p className={styles.item__picture_second}></p>
                <h5 className={styles.item__title}>Time management</h5>
                <p className={styles.item__text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere culpa provident
                  voluptas totam odio animi perspiciatis numquam magnam
                </p>
              </p>
              <p className={styles.advantages__item}>
                <p className={styles.item__picture_third}></p>
                <h5 className={styles.item__title}>Interaction</h5>
                <p className={styles.item__text}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere culpa provident
                  voluptas totam odio animi perspiciatis numquam magnam
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p style={{ paddingTop: 50 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores vitae pariatur officia
        deserunt consequuntur odio quisquam dicta sint unde. Totam natus eaque sapiente eum officiis
        mollitia aliquam ducimus recusandae dignissimos.
      </p>
    </>
  );
};

export default WelcomePage;
