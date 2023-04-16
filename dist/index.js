import React from 'react';
import ReactDOM from 'react-dom';
import './util/i18next';
import App from './App';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(React.Fragment, null,
        React.createElement(React.Suspense, { fallback: null },
            React.createElement(App, null)))), document.querySelector('#root'));
reportWebVitals();
//# sourceMappingURL=index.js.map