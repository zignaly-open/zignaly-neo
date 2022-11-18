import React from 'react';
import { Toaster as ToastProvider } from 'react-hot-toast';
import { Providers } from 'Providers';
import clock from 'util/clock';
import { apolloClient } from 'config/apollo';
import Routes from './Routes';

clock.fetchTime().then(() => {
  // Re-apply typePolicies merges to fix dates in case if we receive
  // the server time after auctions are already cached.
  const { data } = apolloClient.cache as typeof apolloClient.cache & {
    data: { data: object };
  };
  if (Object.keys(data.data).length) {
    apolloClient.cache.reset();
  }
});

function EntryPoint() {
  return (
    <Providers>
      <>
        <Routes />
        <ToastProvider position='top-right' />
      </>
    </Providers>
  );
}

export default EntryPoint;
