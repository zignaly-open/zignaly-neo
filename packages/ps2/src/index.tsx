import React from 'react';
import App from './App';
import './util/i18n/i18next';
import reportWebVitals from './reportWebVitals';
import * as ReactDOMClient from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import PwaInstall from 'util/pwaInstall';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container!);

// Initial render: Render an element to the root.
root.render(
  <React.StrictMode>
    <>
      <React.Suspense fallback={null}>
        <App />
        <PwaInstall />
      </React.Suspense>
    </>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
