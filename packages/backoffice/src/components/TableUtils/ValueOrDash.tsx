import React from 'react';
import { ZigTypography } from '@zignaly-open/ui';
import { TypographyProps } from '@mui/material';

export const ValueOrDash = ({
  children,
  color,
}: {
  color?: TypographyProps['color'];
  children: string | number | JSX.Element;
}) => {
  return (
    <ZigTypography color={children ? color : 'neutral300'}>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      {children || <>&mdash;</>}
    </ZigTypography>
  );
};
