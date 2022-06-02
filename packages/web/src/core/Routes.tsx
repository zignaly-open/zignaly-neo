import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import App from '../components/App';

function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path='/'>
          <Route index element={<App />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default Routes;
