import { ZignalyLogo } from '@zignaly-open/ui';
import React from 'react';
import { TypographyPanelName } from './TransactionDetails/styles';

const ZignalyAccount = ({ name }: { name?: string }) => (
  <>
    <ZignalyLogo width={24} height={24} style={{ marginRight: '16px' }} />
    <TypographyPanelName>{name}</TypographyPanelName>
  </>
);

export default ZignalyAccount;
