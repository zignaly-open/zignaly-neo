import { Loader, Typography } from '@zignaly-open/ui';
import React from 'react';
import { Center, Heading, Layout } from './styles';
import { useTranslation } from 'react-i18next';
import { useInvestments } from '../../use';

const Dashboard: React.FC = () => {
  const { t } = useTranslation('my-dashboard');
  const { isLoading } = useInvestments();

  return (
    <Layout>
      <Heading>
        <Typography variant='h1' color={'neutral000'}>
          {t('my-dashboard.title')}
        </Typography>
      </Heading>
      {isLoading ? (
        <Center>
          <Loader
            color={'#fff'}
            width={'40px'}
            height={'40px'}
            ariaLabel={t('my-dashboard.loading-arialLabel')}
          />
        </Center>
      ) : (
        'hui'
      )}
    </Layout>
  );
};

export default Dashboard;
