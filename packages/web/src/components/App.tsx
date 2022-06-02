import { TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../logo.svg';
import './App.css';

function App() {
  const { t } = useTranslation('global');

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Typography variant={'h1'}>
          {t('name')}
          Edit <code>src/App.tsx</code> and sdfffave to reload.
        </Typography>
        <TextField />
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn Reactdf
        </a>
      </header>
    </div>
  );
}

export default App;
