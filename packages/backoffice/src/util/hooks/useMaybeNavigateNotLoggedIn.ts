import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../routes';
import { useIsAuthenticated } from '../../apis/user/use';

export default function useMaybeNavigateNotLoggedIn(): () => void {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  return () =>
    !isAuthenticated &&
    navigate(ROUTE_LOGIN, {
      state: { redirectTo: location },
    });
}
