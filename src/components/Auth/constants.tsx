import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Cicleron = <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;
const Mail = <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;
const Lock = <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;

export const FORM_INPUTS = [
  {
    label: 'Name',
    type: 'text',
    required: true,
    icon: Cicleron,
    minlength: 3,
  },
  {
    label: 'Login',
    type: 'text',
    required: true,
    icon: Mail,
    minlength: 3,
  },
  {
    label: 'Password',
    type: 'password',
    required: true,
    icon: Lock,
    minlength: 8,
  },
];
