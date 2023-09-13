import React from 'react';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { BoostBox } from './styles';
import { ZigTypography } from '@zignaly-open/ui';

const BoostChip = ({
  boost,
  showBolt,
}: {
  boost: number;
  showBolt?: boolean;
}) => (
  <BoostBox>
    <ZigTypography fontSize={13} className='boost-chip-multiplier'>
      {+boost.toFixed(2)}
      {'x'}
    </ZigTypography>
    {showBolt && <BoltIcon width={10} height={19} />}
  </BoostBox>
);

export default BoostChip;
