import React from 'react';
import Header from './components/Header';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import ProfitSharing from './views/ProfitSharing';
import Dashboard from './views/Dashboard';
import Staking from './views/Staking';
import Login from './views/Auth/Login';
import Signup from './views/Auth/Signup';
import TradingServices from './views/Help/TradingServices';
import {
  ROUTE_DASHBOARD,
  ROUTE_HELP,
  ROUTE_LOGIN,
  ROUTE_PROFIT_SHARING,
  ROUTE_SIGNUP,
  ROUTE_STAKING,
  ROUTE_ZIGPAD,
} from './routes';

// import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
// import Auctions from './components/Auctions/Auctions';
// import DepositPage from './pages/DepositPage';
// import Footer from './components/Footer/Footer';
// import Header from './components/Header/Header';
// import useCurrentUser from './hooks/useCurrentUser';
// import Loader from './components/common/Loader';
// import ProfilePage from './pages/ProfilePage';
//
// const AuthenticatedRoute = ({
//   children,
// }: {
//   children: ReactElement;
// }): JSX.Element => {
//   const { user: currentUser, loading } = useCurrentUser();
//   return (
//     <>
//       {loading && <Loader />}
//       {!!currentUser?.id && <>{children}</>}
//       {!loading && !currentUser?.id && <Navigate to='/' replace />}
//     </>
//   );
// };

function Routes() {
  return (
    <>
      <Header />
      <RouterRoutes>
        <Route path={ROUTE_DASHBOARD}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path={ROUTE_PROFIT_SHARING}>
          <Route index element={<ProfitSharing />} />
        </Route>
        <Route path={ROUTE_STAKING}>
          <Route index element={<Staking />} />
        </Route>
        <Route path={ROUTE_ZIGPAD}>
          <Route index element={<ProfitSharing />} />
        </Route>
        <Route path={ROUTE_HELP} element={<TradingServices />} />
        <Route path={ROUTE_LOGIN} element={<Login />} />
        <Route path={ROUTE_SIGNUP} element={<Signup />} />
      </RouterRoutes>
    </>
  );
}

export default Routes;
