import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { ZigTypography, trimZeros } from '@zignaly-open/ui';
import { MAX_FEES_AMOUNT, getMaxEarnings, maxCommission } from '../../util';
import { useTranslation } from 'react-i18next';
import { TierLevels } from 'apis/referrals/types';
import { NumericFormat, numericFormatter } from 'react-number-format';
import { TooltipIcon } from '../../styles';
import TierBar from '../TierBar';
import { TiersTableProps } from './types';
import { StyledTd, TableItem, ItemContainer } from './styles';
import { calculateLayerValue } from '../TierBar/util';

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
    <ZigTypography
      fontWeight={500}
      variant='h4'
      textAlign='end'
      lineHeight='24px'
    >
      {t('within-1-week')}
      <Tooltip title={t('zig-held-tooltip')}>
        <TooltipIcon />
      </Tooltip>
    </ZigTypography>
  );
};

const CellLabelTraderBoost = () => {
  const { t } = useTranslation('referrals-trader');

  return (
    <ZigTypography
      fontWeight={500}
      variant='h4'
      textAlign='end'
      lineHeight='24px'
    >
      {t('trader-boost')}
      <Tooltip title={t('zig-held-tooltip')}>
        <TooltipIcon />
      </Tooltip>
    </ZigTypography>
  );
};

const TiersTable = ({
  tiers,
  referral,
  serviceCommission,
}: TiersTableProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);

  const composeCellTierLabels = () => {
    const layer1Value = calculateLayerValue(
      1,
      tiers[0].commissionPct,
      referral.boost,
      serviceCommission.commission,
    );
    const layer2Value = calculateLayerValue(
      2,
      tiers[0].commissionPct,
      referral.boost,
      serviceCommission.commission,
    );
    const layer3Value = calculateLayerValue(
      3,
      tiers[0].commissionPct,
      referral.boost,
      serviceCommission.commission,
    );
    return (
      <td style={{ verticalAlign: 'bottom' }}>
        {layer3Value > 0 && <CellLabelTraderBoost />}
        {layer2Value !== layer1Value && <CellLabelBoost />}
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
                serviceCommission={serviceCommission.commission}
              />
            </Box>
          </td>
        ))}
      </tr>
      <tr>
        <td>
          <ZigTypography
            fontWeight={500}
            variant='h4'
            textAlign='end'
            lineHeight='24px'
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
              <NumericFormat
                value={getMaxEarnings(
                  tier.commissionPct,
                  referral.boost,
                  serviceCommission,
                ).toFixed()}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </ZigTypography>
          </td>
        ))}
      </tr>
    </table>
  );
};

export default TiersTable;
