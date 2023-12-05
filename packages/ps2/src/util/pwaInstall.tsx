import '@khmyznikov/pwa-install';
import React from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'pwa-install': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const PwaInstall = (): JSX.Element => {
  return (
    <pwa-install id='pwa-install' manifest-url='manifest.json'></pwa-install>
  );
};

export default PwaInstall;
