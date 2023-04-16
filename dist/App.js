import React, { Suspense } from 'react';
import Router from './Router';
import theme from './theme';
import * as Sentry from '@sentry/browser';
import { ChartGradients, dark, ThemeProvider as ThemeInheritorStyled, ThemeProviderMui as ThemeInheritorMui, } from '@zignaly-open/ui';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import ModalProvider from 'mui-modal-provider';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './apis/store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles';
import { PersistGate } from 'redux-persist/integration/react';
import CenteredLoader from './components/CenteredLoader';
import Header from './components/Navigation/Header';
import UpdateChecker from './components/Navigation/UpdateChecker';
import DateLocaleFixer from './components/Navigation/DateLocaleFixer';
import Tracker from './components/Navigation/Tracker/Tracker';
import useReferralCookie from 'util/hooks/useReferralCookie';
import BottomNavigation from 'components/Navigation/BottomNavigation';
if (process.env.NODE_ENV === 'production' &&
    process.env.REACT_APP_SENTRY_RELEASE &&
    process.env.REACT_APP_SENTRY_DNS) {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DNS,
        debug: false,
        release: process.env.REACT_APP_SENTRY_RELEASE,
    });
}
function App() {
    useReferralCookie();
    return (React.createElement(Provider, { store: store },
        React.createElement(ThemeInheritorStyled, { theme: dark },
            React.createElement(ThemeInheritorMui, { theme: theme },
                React.createElement(ThemeProviderMui, { theme: theme },
                    React.createElement(GlobalStyle, null),
                    React.createElement(ToastContainer, { position: 'top-right', autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnFocusLoss: true, draggable: true, closeButton: false, pauseOnHover: true, theme: 'dark' }),
                    React.createElement(PersistGate, { persistor: persistor, loading: React.createElement(CenteredLoader, null) },
                        React.createElement(BrowserRouter, null,
                            React.createElement(ModalProvider, null,
                                React.createElement(Header, null),
                                React.createElement(Tracker, null),
                                React.createElement(UpdateChecker, null),
                                React.createElement(DateLocaleFixer, null),
                                React.createElement(ChartGradients, null),
                                React.createElement(Suspense, { fallback: null },
                                    React.createElement(Router, null)),
                                React.createElement(BottomNavigation, null)))))))));
}
export default App;
//# sourceMappingURL=App.js.map