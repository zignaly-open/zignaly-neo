import React from 'react';
import { Layout } from './styles';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import QuantwiseCard from './QuantwiseCard';
import { useTitle } from 'react-use';

const Subscriptions: React.FC = () => {
  const { t } = useTranslation(['subscriptions', 'pages']);
  useTitle(t('pages:subscriptions'));
  const data = [
    { packageSub: 'plus', startPrice: 497, price: 197, fee: 50, status: 0 },
    { packageSub: 'pro', startPrice: 1997, price: 697, fee: 42, status: 1 },
    {
      packageSub: 'expert',
      startPrice: 4997,
      price: 1997,
      fee: 35,
      status: 2,
    },
    {
      packageSub: 'master',
      startPrice: 14997,
      price: 4997,
      fee: 30,
      status: 2,
    },
  ];
  return (
    <Layout>
      <ZigTypography
        variant='h1'
        mb={'70px'}
        align={'center'}
        id={'subscriptions__title'}
      >
        {t('title')}
      </ZigTypography>
      <Box display={'flex'} gap={4}>
        {data.map((el) => (
          <QuantwiseCard key={el.packageSub} {...el} />
        ))}
      </Box>
    </Layout>
  );
};
export default Subscriptions;
