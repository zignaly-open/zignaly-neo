import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../routes';
import { useIsAuthenticated } from '../../apis/user/use';
import { junkyard } from '../junkyard';

export default function useMaybeNavigateNotLoggedIn(): () => void {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const newUser = !junkyard.get('hasLoggedIn');
  return () =>
    !isAuthenticated &&
    navigate(newUser ? ROUTE_SIGNUP : ROUTE_LOGIN, {
      state: { redirectTo: location },
    });
}
