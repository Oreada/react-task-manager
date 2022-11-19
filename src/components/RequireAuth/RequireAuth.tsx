import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTHENTICATION_PATH, ROOT_PATH } from 'router/constants';
import { IRootState } from 'store/model';
import { typeSubPage } from 'types/types';
interface IRequireAuth {
  children: ReactNode;
}

const RequireAuth: FC<IRequireAuth> = ({ children }) => {
  const { id } = useSelector((state: IRootState) => state.auth);
  const location = useLocation();

  if (!id && location.pathname !== AUTHENTICATION_PATH) {
    return <Navigate to={AUTHENTICATION_PATH} state={typeSubPage.signIn} />;
  }

  if (id && location.pathname === AUTHENTICATION_PATH) {
    return <Navigate to={ROOT_PATH} />;
  }

  return <>{children}</>;
};
export default RequireAuth;
