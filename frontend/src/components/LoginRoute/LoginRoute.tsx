import { Navigate } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { isAuthenticated } from '../../services/auth';

export const LoginRoute = () => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <LoginPage />;
};

