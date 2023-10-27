import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';

import { Layout, WrapCoin, Coin, Icon } from './styles';

import { CoinLabelProps } from './types';

const CoinLabel = ({ name, coin, bucket, id }: CoinLabelProps) => (
  <Layout id={id}>
    <Icon coin={coin} bucket={bucket} className={`icon__${coin}`} />
    <WrapCoin>
      <Coin className={`name__${coin}`}>{coin}</Coin>
      <ZigTypography
        variant='body2'
        color='neutral300'
        className={`name__${name}`}
        overflow={'hidden'}
        textOverflow={'ellipsis'}
        width={'100%'}
      >
        {name}
      </ZigTypography>
    </WrapCoin>
  </Layout>
);

export default CoinLabel;
