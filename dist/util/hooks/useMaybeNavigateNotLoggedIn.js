import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../routes';
import { useIsAuthenticated } from '../../apis/user/use';
export default function useMaybeNavigateNotLoggedIn() {
    var navigate = useNavigate();
    var location = useLocation();
    var isAuthenticated = useIsAuthenticated();
    var newUser = !localStorage.getItem('hasLoggedIn');
    !isAuthenticated &&
        navigate(newUser ? ROUTE_SIGNUP : ROUTE_LOGIN, {
            state: { redirectTo: location },
        });
}
//# sourceMappingURL=useMaybeNavigateNotLoggedIn.js.map