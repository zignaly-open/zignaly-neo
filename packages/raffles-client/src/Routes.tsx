import { useInactiveListener } from 'hooks';
import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

const Auctions = React.lazy(() => import('./components/Auctions/Auctions'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const Header = React.lazy(() => import('./components/Header/Header'));

function Routes() {
  useInactiveListener();
  return (
    <>
      <Header />
      <RouterRoutes>
        <Route path='/'>
          <Route index element={<Auctions />} />
        </Route>
      </RouterRoutes>
      <Footer />
    </>
  );
}

export default Routes;
