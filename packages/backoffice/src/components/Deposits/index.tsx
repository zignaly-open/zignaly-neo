import React from 'react';
import { PageContainer } from '@zignaly-open/ui';
import { useDepositsQuery } from '../../apis/transfers/api';

export default function Deposits() {
  const { data: logs } = useDepositsQuery();
  // eslint-disable-next-line no-console
  console.error(logs);
  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {'Deposits'}
    </PageContainer>
  );
}
