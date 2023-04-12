import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../routes';
import { useIsAuthenticated } from '../../apis/user/use';

export default function useMaybeNavigateNotLoggedIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const newUser = !localStorage.getItem('hasLoggedIn');
  !isAuthenticated &&
    navigate(newUser ? ROUTE_SIGNUP : ROUTE_LOGIN, {
      state: { redirectTo: location },
    });
}
