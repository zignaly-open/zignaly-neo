import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../routes';
import { useIsAuthenticated } from '../../apis/user/use';
import { junkyard } from '../junkyard';

export const getNotLoggedInNavigationRoute = (): string => {
  const newUser = !junkyard.get('hasLoggedIn');
  return newUser ? ROUTE_SIGNUP : ROUTE_LOGIN;
};

export default function useMaybeNavigateNotLoggedIn(): () => void {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  return () =>
    !isAuthenticated &&
    navigate(getNotLoggedInNavigationRoute(), {
      state: { redirectTo: location },
    });
}
