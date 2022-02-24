// Dependencies
import React, { useMemo } from 'react';
import { BigNumber, utils } from 'ethers';
import NumberFormat from 'react-number-format';

// Styles
import * as styled from './styles';

// Assets
import ZigCoinIcon from '@assets/images/zignaly-coin.svg';

// Components
import Typography from '@components/display/Typhography';

// Utils
import { rankTypes, rankTypesId } from '@types/ranks';

function ZigWalletIndicator({
  zigs = 0,
  rankId = rankTypesId.DOLPHIN
}) {
  const renderZigsCoins = useMemo(() => (
    <NumberFormat
      value={utils.formatUnits(BigNumber.from(zigs === '' ? '0' : String(zigs)))}
      displayType={'text'}
      thousandSeparator={true}
      renderText={(value) => (
        <styled.Value>
          <Typography>{value}</Typography> <styled.Token>ZIG</styled.Token>
        </styled.Value>
      )}
    />
  ), [zigs]);

  const renderLevel = useMemo(() => (
    <styled.Level>
      <styled.RankIcon src={rankTypes[rankId].icon} />
      <Typography variant={'h6'}>{rankTypes[rankId].name}</Typography>
    </styled.Level>
  ), [rankId]);

  return (
    <styled.Layout>
      <styled.Icon src={ZigCoinIcon} />
      <styled.Data>
        {renderZigsCoins}
        {renderLevel}
      </styled.Data>
    </styled.Layout>
  );
}

export default ZigWalletIndicator;
