import { ZignalyLogo, ZigTypography } from '@zignaly-open/ui';
import React from 'react';

const ZignalyAccount = ({ name }: { name?: string }) => (
  <>
    <ZignalyLogo width={24} height={24} style={{ marginRight: '16px' }} />
    <ZigTypography color='neutral000' fontWeight={600}>
      {name}
    </ZigTypography>
  </>
);

export default ZignalyAccount;
