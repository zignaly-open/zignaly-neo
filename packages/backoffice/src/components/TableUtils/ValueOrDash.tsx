import React from 'react';
import { ZigTypography } from '@zignaly-open/ui';

export const ValueOrDash = ({ children }: { children: string | number }) => {
  return (
    <ZigTypography color={children ? undefined : 'neutral300'}>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      {children || <>&mdash;</>}
    </ZigTypography>
  );
};
