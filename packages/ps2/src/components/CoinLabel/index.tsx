import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';

import { Layout, WrapCoin, Coin, Icon } from './styles';

import { CoinLabelProps } from './types';

const CoinLabel = ({ name, coin, bucket, prefixId }: CoinLabelProps) => (
  <Layout>
    <Icon
      coin={coin}
      name={name}
      bucket={bucket}
      id={prefixId && `${prefixId}__icon-${coin}`}
    />
    <WrapCoin>
      <Coin id={prefixId && `${prefixId}__${coin}`}>{coin}</Coin>
      <ZigTypography
        variant='body2'
        color='neutral300'
        id={prefixId && `${prefixId}__name-${name}`}
      >
        {name}
      </ZigTypography>
    </WrapCoin>
  </Layout>
);

export default CoinLabel;
