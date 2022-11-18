import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './util/i18next';
import reportWebVitals from './reportWebVitals';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const EntryPoint = React.lazy(() => import('./EntryPoint'));
const AdminEntryPoint = React.lazy(() => import('./admin/AdminEntryPoint'));

window.subscribersSiteId = '753b0b7b-368a-4b7b-8cb6-eb210047b5db';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={null}>
      <HelmetProvider>
        <Helmet>
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                async
                src='https://www.googletagmanager.com/gtag/js?id=UA-123818598-1'
              ></script>
              <script>
                {`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-123818598-1');`}
              </script>
            </>
          )}
        </Helmet>
        <BrowserRouter>
          <React.Suspense fallback={null}>
            <Routes>
              <Route path='/*' element={<EntryPoint />} />
              <Route path='/admin/*' element={<AdminEntryPoint />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.querySelector('#root') as HTMLElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
