import React, { ReactElement } from 'react';
import {
  Routes as RouterRoutes,
  Route,
  Navigate,
} from 'react-router-dom';
import Auctions from './components/Auctions/Auctions';
import HowItWorksPage from './pages/HowItWorksPage';
import DepositPage from './pages/DepositPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import useCurrentUser from './hooks/useCurrentUser';
import Loader from './components/common/Loader';
import ProfilePage from './pages/ProfilePage';

const AuthenticatedRoute = ({
  children,
}: {
  children: ReactElement;
}): JSX.Element => {
  const { user: currentUser, loading } = useCurrentUser();
  return (
    <>
      {loading && <Loader />}
      {!!currentUser?.id && <>{children}</>}
      {!loading && !currentUser?.id && <Navigate to='/' replace />}
    </>
  );
};

function Routes() {
  return (
    <>
      <Header />
      <RouterRoutes>
        <Route path='/'>
          <Route index element={<Auctions />} />
          <Route path='how-it-works' element={<HowItWorksPage />} />
          <Route
            path='deposit'
            element={
              <AuthenticatedRoute>
                <DepositPage />
              </AuthenticatedRoute>
            }
          />
          <Route
            path='profile'
            element={
              <AuthenticatedRoute>
                <ProfilePage />
              </AuthenticatedRoute>
            }
          />
        </Route>
      </RouterRoutes>
      <Footer />
    </>
  );
}

export default Routes;
