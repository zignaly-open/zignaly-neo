import React, { PropsWithChildren } from 'react';
import { ZigTypography } from '@zignaly-open/ui';

export const KycBoxListEntry: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ZigTypography
      color={'neutral100'}
      component={'p'}
      sx={{
        textAlign: 'justify',
        span: {
          opacity: 0.7,
        },
      }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
