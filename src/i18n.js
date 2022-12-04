import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          header: {
            appName: 'Teamwork',
            linkBoards: 'Boards',
            linkProfile: 'Edit profile',
            sighOut: 'Sign Out',
            sighIn: 'Sign In',
            sighUp: 'Sign Up',
          },

          main: {
            heroTitle: 'Task Management',
            heroText:
              'TEAMWORK is a handy visual tool for keeping track of your current tasks and organizing your workflow. The app helps you effectively manage projects, plan and coordinate work in your team.',
            advantagesTitle: 'Advantages',
            advantagesSubtitle: 'Why you should try our application',
            advAimTitle: 'EFFICIENCY',
            advClockTitle: 'PRODUCTIVITY',
            advGlobeTitle: 'INTERACTION',
            advAimText:
              'Together with TEAMWORK, you can visualize and group your goals, allowing you to optimally allocate resources to achieve them',
            advClockText:
              'Scheduling increases your productivity and allows you to manage your time so you get more tasks done in time than before',
            advGlobeText:
              'TEAMWORK helps to evenly distribute the workload of your team and ensures that all team members work together smoothly',
            videoTitle: 'How to use the app',
            videoSubtitle:
              'Watch this short video and it will make using our application even easier and clearer',
            teamTitle: 'Our team',
            teamSubtitles: 'Meet the developers',
            teamKatya:
              'Made a Main page with a list of all available boards, a Board page, as well as a page for editing the profile. On the Board page was implemented drag and drop for columns and individual tasks. Developed global task search functionality',
            teamSergey:
              'Started the server, made a page with authorization, set up routers, added error handling, optimized the loading of the application. Made adaptive, and also deployed the application',
            teamOlya:
              'Wrote functions to work with API, developed basic design of the application, made Welcome page, header and footer, modal windows to create and edit board/column/task, dialog windows to remove board/column/task. Implemented application localization',
          },

          footer: {
            nameKatya: 'Katya',
            nameSergey: 'Sergey',
            nameOlya: 'Olya',
            year: ' ',
          },

          profile: {
            create: 'Create an account',
            already: 'I already have an account',
            signIn: 'Sign in',
            signUp: 'Sign up',
            logIn: 'Log in',
            register: 'Register',
            Name: 'Name',
            Login: 'Login',
            Password: 'Password',
            editTitle: 'Edit profile',
            NewPassword: 'New Password',
            buttonEditText: 'Edit',
            buttonDeleteText: 'Delete user',
          },

          errors: {
            something: "Something's wrong!..",
            request: 'Error in the request',
            loginOrPassword: 'Incorrect login or password',
            exists: 'User already exists',
          },

          boards: {
            title: 'All boards',
            formBoardCreate: 'Create board',
            formBoardUpdate: 'Update board',
            formBoardTitle: 'Board title',
            formBoardDesc: 'Board description',
            formColumnCreate: 'Create column',
            formColumnUpdate: 'Update column',
            formColumnTitle: 'Column title',
            formTaskCreate: 'Create task',
            formTaskUpdate: 'Update task',
            formTaskTitle: 'Task title',
            formTaskDesc: 'Task description',
            taskOwner: 'Task owner',
            addButton: 'Add',
            updateButton: 'Update',
            cancelButton: 'Cancel',
            dialogYes: 'Yes',
            dialogNo: 'No',
            dialogBoard: 'Do you want to delete this board?',
            dialogColumn: 'Do you want to delete this column?',
            dialogTask: 'Do you want to delete this task?',
            dialogUser: 'Do you want to delete this user?',
            dialogWarning: 'Restore data after deletion is not possible',
            backBoards: 'Back to Boards',
            searchTasks: 'Search tasks',
            foundedTasks: 'Founded tasks',
            nothingFounded: 'There is nothing founded',
            loading: 'Loading...',
          },
        },
      },
      ru: {
        translation: {
          header: {
            appName: 'Teamwork',
            linkBoards: 'Доски',
            linkProfile: 'Профиль',
            sighOut: 'Выход',
            sighIn: 'Вход',
            sighUp: 'Регистрация',
          },

          main: {
            heroTitle: 'Управление задачами',
            heroText:
              'TEAMWORK - это удобный визуальный инструмент для отслеживания текущих задач и организации рабочего процесса. Приложение помогает эффективно управлять проектами, планировать и согласовывать работу в команде.',
            advantagesTitle: 'Преимущества',
            advantagesSubtitle: 'Почему вам стоит попробовать наше приложение',
            advAimTitle: 'Эффективность',
            advClockTitle: 'Продуктивность',
            advGlobeTitle: 'Взаимодействие',
            advAimText:
              'Вместе с TEAMWORK вы сможете визуализировать и сгруппировать намеченные цели, что позволит оптимально распределить ресурсы для их достижения',
            advClockText:
              'Планирование повышает вашу продуктивность и позволяет рационально использовать своё время, поэтому вы успеете выполнить больше задач, чем раньше',
            advGlobeText:
              'TEAMWORK помогает равномерно распределять нагрузку в команде, а также обеспечивает слаженное взаимодействие всех её участников',
            videoTitle: 'Как пользоваться приложением',
            videoSubtitle:
              'Посмотрите этот небольшой видеоролик, и использование нашего приложения станет ещё более простым и понятным',
            teamTitle: 'Наша команда',
            teamSubtitles: 'Знакомьтесь с разработчиками',
            teamKatya:
              'Сделала страницу Main co списком всех доступных досок, страницу Board, а также страницу для редактирования профиля. На странице Board реализовала drag and drop для колонок и отдельных задач. Разработала функционал глобального поиска задач',
            teamSergey:
              'Запустил сервер, сделал страницу с авторизацией, настроил роуты, добавил обработку ошибок, оптимизировал загрузку приложения. Сделал адаптив, а также задеплоил приложение',
            teamOlya:
              'Написала функции для работы с API, разработала основной дизайн приложения, сделала стартовую страницу, хедер и футер, модальные окна для создания и редактирования доски/колонки/задачи, диалоговые окна для удаления доски/колонки/задачи. Реализовала локализацию приложения',
          },

          footer: {
            nameKatya: 'Катя',
            nameOlya: 'Оля',
            nameSergey: 'Сергей',
            year: ' ',
          },

          profile: {
            create: 'Создать аккаунт',
            already: 'У меня уже есть аккаунт',
            signIn: 'Вход',
            signUp: 'Регистрация',
            logIn: 'Войти',
            register: 'Создать',
            Name: 'Имя',
            Login: 'Логин',
            Password: 'Пароль',
            editTitle: 'Редактировать',
            NewPassword: 'Новый Пароль',
            buttonEditText: 'Изменить',
            buttonDeleteText: 'Удалить',
          },

          errors: {
            something: 'Что-то не так!..',
            request: 'Ошибка в запросе',
            loginOrPassword: 'Неверный логин или пароль',
            exists: 'Пользователь уже существует',
          },

          boards: {
            title: 'Все доски',
            formBoardCreate: 'Создать доску',
            formBoardUpdate: 'Изменить доску',
            formBoardTitle: 'Заголовок доски',
            formBoardDesc: 'Описание доски',
            formColumnCreate: 'Создать колонку',
            formColumnUpdate: 'Изменить колонку',
            formColumnTitle: 'Заголовок колонки',
            formTaskCreate: 'Создать задачу',
            formTaskUpdate: 'Изменить задачу',
            formTaskTitle: 'Заголовок задачи',
            formTaskDesc: 'Описание задачи',
            taskOwner: 'Создатель задачи',
            addButton: 'Добавить',
            updateButton: 'Применить',
            cancelButton: 'Отмена',
            dialogYes: 'Да',
            dialogNo: 'Нет',
            dialogBoard: 'Вы хотите удалить эту доску?',
            dialogColumn: 'Вы хотите удалить эту колонку?',
            dialogTask: 'Вы хотите удалить эту задачу?',
            dialogUser: 'Вы хотите удалить этот аккаунт?',
            dialogWarning: 'Невозможно восстановить данные после удаления',
            backBoards: 'Назад к доскам',
            searchTasks: 'Искать задачи',
            foundedTasks: 'Найденные задачи',
            nothingFounded: 'Ничего не найдено',
            loading: 'Загрузка...',
          },
        },
      },
    },
  });

export default i18n;
