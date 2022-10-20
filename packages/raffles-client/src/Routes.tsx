import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Auctions from './components/Auctions/Auctions';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function Routes() {
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
