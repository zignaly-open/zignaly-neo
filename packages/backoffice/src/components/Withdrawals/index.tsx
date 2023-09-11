import React from 'react';
import { PageContainer } from '@zignaly-open/ui';
import { useWithdrawalsQuery } from '../../apis/transfers/api';

export default function Withdrawals() {
  const { data: logs } = useWithdrawalsQuery();
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
      {'Withdrawals'}
    </PageContainer>
  );
}
