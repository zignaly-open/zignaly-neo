import React, { ReactElement } from 'react';
import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
} from 'react-router-dom';
import Auctions from './Auctions/Auctions';
import HowItWorks from './HowItWorks/HowItWorks';
import DepositPage from './Deposit/DepositPage';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import useCurrentUser from '../hooks/useCurrentUser';
import CircularProgress from '@mui/material/CircularProgress';

const AuthenticatedRoute = ({
  children,
}: {
  children: ReactElement;
}): JSX.Element => {
  const { user: currentUser, loading } = useCurrentUser();
  return (
    <>
      {loading && <CircularProgress />}
      {!!currentUser?.id && <>{children}</>}
      {!loading && !currentUser?.id && <Navigate to='/' replace />}
    </>
  );
};

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <RouterRoutes>
        <Route path='/'>
          <Route index element={<Auctions />} />
          <Route path='how-it-works' element={<HowItWorks />} />
          <Route
            path='deposit'
            element={
              <AuthenticatedRoute>
                <DepositPage />
              </AuthenticatedRoute>
            }
          />
        </Route>
      </RouterRoutes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
