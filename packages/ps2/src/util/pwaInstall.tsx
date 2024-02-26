import '@khmyznikov/pwa-install';
import React from 'react';
import { whitelabel } from '../whitelabel';

const PwaInstall = (): JSX.Element => {
  return (
    <pwa-install
      id='pwa-install'
      manifest-url={whitelabel.manifest}
    ></pwa-install>
  );
};

export default PwaInstall;
