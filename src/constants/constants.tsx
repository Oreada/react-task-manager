import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export const Cicleron = <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;
export const Mail = <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;
export const Lock = <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;

export const URL_BASE = 'https://rs-ap.herokuapp.com';
export const URL_SINGUP = `${URL_BASE}/auth/signup`;
export const URL_SINGIN = `${URL_BASE}/auth/signin`;
export const URL_USERS = `${URL_BASE}/users`;
export const URL_BOARDS = `${URL_BASE}/boards`;
export const URL_BOARDS_SET = `${URL_BASE}/boardsSet`;
export const URL_COLUMNS_SET = `${URL_BASE}/columnsSet`;
export const URL_TASKS_SET = `${URL_BASE}/tasksSet`;

export const LOCAL_STORAGE_KEY = 'react_rss_kos';

const IS_EMPTY_TEXT = 'This field can`t be empty';
const MIN_LENGTH_TEXT = 'This field must contain at least';
const REGULAR_NAME_TEXT = 'You should only use letters and numbers';
const REGULAR_PASSWORD_TEXT = 'Use min one uppercase and one lowercase letter';

export const VALIDATION_FORM = {
  name: {
    isEmpty: true,
    isEmptyText: IS_EMPTY_TEXT,
    isMinLength: 3,
    isMinLengthText: `${MIN_LENGTH_TEXT} 3 symbols`,
    isRegularMatch: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
    isRegularMatchText: REGULAR_NAME_TEXT,
  },
  login: {
    isEmpty: true,
    isEmptyText: IS_EMPTY_TEXT,
    isMinLength: 3,
    isMinLengthText: `${MIN_LENGTH_TEXT} 3 symbols`,
    isRegularMatch: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
    isRegularMatchText: REGULAR_NAME_TEXT,
  },
  password: {
    isEmpty: true,
    isEmptyText: IS_EMPTY_TEXT,
    isMinLength: 8,
    isMinLengthText: `${MIN_LENGTH_TEXT} 8 symbols`,
    isRegularMatch: /(?=.*[A-Z])(?=.*[a-z]).*$/,
    isRegularMatchText: REGULAR_PASSWORD_TEXT,
  },
};
