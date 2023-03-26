import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import { AUTH_REDUCER_LOGIN } from '../../utils/constants.utils';

export default ({ children }) => {
  const { dispatch } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    api
      .post('auth/validate_token')
      .then(({ data }) => {
        dispatch({
          type: AUTH_REDUCER_LOGIN,
          payload: {
            token: data.token,
            userData: data.userData
          }
        });
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) return null;

  return isAuthenticated === true ? children : <Navigate to='login' replace />;
};
