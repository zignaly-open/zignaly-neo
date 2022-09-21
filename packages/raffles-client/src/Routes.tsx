import React, { useLayoutEffect } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { triggerTz } from 'util/tz';
import Auctions from './components/Auctions/Auctions';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function Routes() {
  const href = window.location.href;

  // url tracking
  useLayoutEffect(() => {
    triggerTz(href);
  }, [href]);

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
