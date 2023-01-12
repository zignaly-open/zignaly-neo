import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';

import { Layout, WrapCoin, Coin, Icon } from './styles';

import { CoinLabelProps } from './types';

const CoinLabel = ({ name, coin, bucket }: CoinLabelProps) => (
  <Layout>
    <Icon coin={coin} name={name} bucket={bucket} />
    <WrapCoin>
      <Coin>{coin}</Coin>
      <ZigTypography variant='body2' color='neutral300'>
        {name}
      </ZigTypography>
    </WrapCoin>
  </Layout>
);

export default CoinLabel;
