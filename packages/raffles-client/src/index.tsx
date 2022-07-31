import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './util/i18next';
import EntryPoint from './EntryPoint';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={null}>
      <EntryPoint />
    </React.Suspense>
  </React.StrictMode>,
  document.querySelector('#root') as HTMLElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
