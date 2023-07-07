import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { ZigTypography, ZigUserIcon, trimZeros } from '@zignaly-open/ui';
import { MAX_FEES_AMOUNT, getMaxEarnings, maxCommission } from '../../util';
import { useTranslation } from 'react-i18next';
import { TierLevels } from 'apis/referrals/types';
import { NumericFormat, numericFormatter } from 'react-number-format';
import { TooltipIcon } from '../../styles';
import TierBar, { DEFAULT_MAX_HEIGHT, DEFAULT_MIN_HEIGHT } from '../TierBar';
import { TiersTableProps } from './types';
import { StyledTd, TableItem, ItemContainer } from './styles';
import { calculateLayerValue, useTierLayers } from '../TierBar/util';
import BoostChip from '../BoostChip';
import { formatCompactNumber } from 'views/Dashboard/components/MyDashboard/util';

const composeInvitesValue = (tierIndex: number, tiers: TierLevels) => {
  const currentTier = tiers[tierIndex];
  const previousTier = tiers[tierIndex - 1];

  if (tierIndex === tiers.length - 1) {
    return `${currentTier.invitees}+`;
  }

  if (tierIndex > 0 && currentTier.invitees - previousTier.invitees > 1) {
    return `${previousTier.invitees + 1}-${currentTier.invitees}`;
  }

  return currentTier.invitees;
};

const CellLabelBaseCommission = () => {
  const { t } = useTranslation('referrals-trader');

  return (
    <ZigTypography
      fontWeight={500}
      variant='h4'
      textAlign='end'
      lineHeight='24px'
    >
      {t('base-commission')}
      <Tooltip title={t('zig-held-tooltip')}>
        <TooltipIcon />
      </Tooltip>
    </ZigTypography>
  );
};

const CellLabelBoost = () => {
  const { t } = useTranslation('referrals-trader');

  return (
    <Box display='flex' alignItems='center' gap='7px' justifyContent='flex-end'>
      <BoostChip boost={2} />
      <ZigTypography
        fontWeight={500}
        variant='h4'
        textAlign='end'
        lineHeight='24px'
        color='#e93ea7'
      >
        {t('within-1-week')}
        <Tooltip title={t('zig-held-tooltip')}>
          <TooltipIcon />
        </Tooltip>
      </ZigTypography>
    </Box>
  );
};

const CellLabelTraderBoost = () => {
  const { t } = useTranslation('referrals-trader');

  return (
    <Box
      display='flex'
      alignItems='center'
      gap='10px'
      justifyContent='flex-end'
    >
      <BoostChip boost={2} showBolt />
      <ZigTypography
        fontWeight={500}
        variant='h4'
        lineHeight='24px'
        color='#24b68d'
      >
        {t('trader-boost')}
        <Tooltip title={t('zig-held-tooltip')}>
          <TooltipIcon />
        </Tooltip>
      </ZigTypography>
    </Box>
  );
};

const TiersTable = ({
  tiers,
  referral,
  serviceCommission,
  zignalyCommission,
}: TiersTableProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);

  const layers = useTierLayers(
    tiers[0].commissionPct,
    referral.boost,
    serviceCommission,
    {
      min: tiers[0].commissionPct,
      max: tiers[tiers.length - 1].commissionPct,
      minHeight: DEFAULT_MIN_HEIGHT,
      maxHeight: DEFAULT_MAX_HEIGHT,
    },
  );

  const composeCellTierLabels = () => {
    return (
      <td style={{ verticalAlign: 'bottom', position: 'relative' }}>
        {layers[2] && (
          <Box position='absolute' bottom={layers[1].height} right={0}>
            <CellLabelTraderBoost />
          </Box>
        )}
        {layers[1] && (
          <Box position='absolute' bottom={layers[2].height} right={0}>
            <CellLabelBoost />
          </Box>
        )}
        <CellLabelBaseCommission />
      </td>
    );
  };

  return (
    <table>
      <tr>
        {composeCellTierLabels()}
        {tiers?.map((tier, tierIndex) => (
          <td style={{ verticalAlign: 'bottom' }} key={tier.id}>
            <Box display='flex' justifyContent='center'>
              <TierBar
                showArrow={tierIndex === tiers.length - 1}
                tier={tier}
                referral={referral}
                tiers={tiers}
                serviceCommission={serviceCommission}
              />
            </Box>
          </td>
        ))}
      </tr>
      <tr>
        <td height='36px'>
          <ZigTypography
            fontWeight={500}
            variant='h3'
            textAlign='end'
            lineHeight='24px'
            color='#979ce0'
          >
            {t('invites')}
            <Tooltip title={t('zig-held-tooltip')}>
              <TooltipIcon />
            </Tooltip>
          </ZigTypography>
        </td>
        {tiers?.map((tier, tierIndex) => (
          <td key={tier.id} style={{ textAlign: 'center' }}>
            <ZigTypography fontWeight={600} fontSize={16} color='#999fe1'>
              {composeInvitesValue(tierIndex, tiers)}
            </ZigTypography>
          </td>
        ))}
      </tr>
      <tr>
        <td>
          <ZigTypography
            fontWeight={500}
            variant='h4'
            mt='2px'
            mr='16px'
            textAlign='end'
            lineHeight='24px'
            whiteSpace='pre-line'
          >
            {t('max-earnings-from-fees', {
              amount: numericFormatter(MAX_FEES_AMOUNT.toString(), {
                thousandSeparator: true,
                prefix: '$',
              }),
            })}
          </ZigTypography>
        </td>
        {tiers?.map((tier) => (
          <td key={tier.id} style={{ textAlign: 'center' }}>
            <ZigTypography
              fontWeight={500}
              fontSize={16}
              color=' rgba(36, 184, 142, 0.9);'
            >
              {'$'}
              {formatCompactNumber(
                getMaxEarnings(
                  tier.commissionPct,
                  referral.boost,
                  serviceCommission,
                  zignalyCommission,
                ).toFixed(),
              )}
            </ZigTypography>
          </td>
        ))}
      </tr>
    </table>
  );
};

export default TiersTable;
