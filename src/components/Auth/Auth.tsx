import { useState } from 'react';
import styles from './Auth.module.scss';

enum typeSubPage {
  signUp,
  signIn,
}

const Auth = () => {
  const [subPage, setSubPage] = useState<typeSubPage>(typeSubPage.signIn);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="game">
      <div className={styles.form_container}>
        <div className={styles.title}>Войдите или зарегистрируйтесь</div>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {subPage === typeSubPage.signUp ? (
            <input
              className={styles.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
              type="text"
              value={name}
              name={name}
              required
            />
          ) : (
            ''
          )}

          <input
            className={styles.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Емейл"
            type="email"
            value={email}
            name={email}
            required
          />

          <input
            className={styles.password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            value={password}
            name={password}
            minLength={8}
            required
          />

          <input
            className={styles.button}
            type="submit"
            value={subPage === typeSubPage.signUp ? 'Зарегистрироваться' : 'Войти'}
          />
          <div className={styles.no_account}>
            {subPage === typeSubPage.signUp ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'}
          </div>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              subPage === typeSubPage.signUp
                ? setSubPage(typeSubPage.signIn)
                : setSubPage(typeSubPage.signUp);
            }}
          >
            {subPage === typeSubPage.signUp ? 'Вход' : 'Регистарция'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
