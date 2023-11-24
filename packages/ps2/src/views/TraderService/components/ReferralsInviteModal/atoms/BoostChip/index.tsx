import React from 'react';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { BoostBox } from './styles';
import { ZigTypography } from '@zignaly-open/ui';

const BoostChip = ({
  boost,
  showBolt,
  id,
}: {
  boost: number;
  showBolt?: boolean;
  id?: string;
}) => (
  <BoostBox className='boost-chip-multiplier'>
    <ZigTypography fontSize={13} id={id}>
      {+boost.toFixed(2)}
      {'x'}
    </ZigTypography>
    {showBolt && <BoltIcon width={10} height={19} />}
  </BoostBox>
);

export default BoostChip;
