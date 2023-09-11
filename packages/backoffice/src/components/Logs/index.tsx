import React from 'react';
import { PageContainer } from '@zignaly-open/ui';
import { useLogsQuery } from '../../apis/logs/api';

export default function Logs() {
  const { data: logs } = useLogsQuery();
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
      {'Logs'}
    </PageContainer>
  );
}
