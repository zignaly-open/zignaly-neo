import React from 'react';
// import { useTranslation } from 'react-i18next';
import './App.css';
import AuctionGrid from './Auctions/AuctionGrid/AuctionGrid';

function App() {
  // const { t } = useTranslation('global');

  return (
    <div className='App'>
      <AuctionGrid />
    </div>
  );
}

export default App;
