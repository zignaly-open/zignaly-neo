import '@khmyznikov/pwa-install';
import React from 'react';

const PwaInstall = (): JSX.Element => {
  return (
    <pwa-install id='pwa-install' manifest-url='manifest.json'></pwa-install>
  );
};

export default PwaInstall;
