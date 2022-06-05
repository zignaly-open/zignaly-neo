import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import Auctions from '../components/Auctions';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Common/Footer';
import Header from '../components/Common/Header';

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <RouterRoutes>
        <Route path='/'>
          <Route index element={<Auctions />} />
          <Route path='how-it-works' element={<HowItWorks />} />
        </Route>
      </RouterRoutes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
