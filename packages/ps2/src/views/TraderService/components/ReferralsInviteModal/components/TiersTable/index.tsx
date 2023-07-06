import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { MAX_FEES_AMOUNT, getMaxEarnings, maxCommission } from '../../util';
import { useTranslation } from 'react-i18next';
import { TierLevels } from 'apis/referrals/types';
import { NumericFormat, numericFormatter } from 'react-number-format';
import { TooltipIcon } from '../../styles';
import TierBar from '../TierBar';
import { TiersTableProps } from './types';
import { StyledTd, TableItem, ItemContainer } from './styles';

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
    <td style={{ verticalAlign: 'bottom' }}>
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
    </td>
  );
};

const CellLabelBoost = () => {
  const { t } = useTranslation('referrals-trader');

  return (
    <td>
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
    </td>
  );
};

const CellLabelTraderBoost = () => {
  const { t } = useTranslation('referrals-trader');

  return (
    <td>
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
    </td>
  );
};

const TiersTable = ({
  tiers,
  referral,
  serviceCommission,
}: TiersTableProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);

  const composeFirstCell = () => {
    if (serviceCommission.commission > 0 && referral.boost > 1) {
      return <CellLabelTraderBoost />;
    } else if (serviceCommission.commission > 0 || referral.boost > 1) {
      return <CellLabelBoost />;
    }

    return <CellLabelBaseCommission />;
  };

  const composeSecondCell = () => {
    if (serviceCommission.commission > 0) {
      return <CellLabelTraderBoost />;
    } else if (serviceCommission.commission > 0 || referral.boost > 1) {
      return <CellLabelBaseCommission />;
    }

    return null;
  };

  const composeThirdCell = () => {
    if (serviceCommission.commission > 1) {
      return <CellLabelBaseCommission />;
    }

    return null;
  };

  return (
    <table>
      <tr>
        {composeFirstCell()}
        {tiers?.map((tier, tierIndex) => (
          <td style={{ verticalAlign: 'bottom' }} key={tier.id}>
            <Box display='flex' justifyContent='center'>
              <TierBar
                showArrow={tierIndex === tiers.length - 1}
                tier={tier}
                boost={referral.boost}
                tiers={tiers}
                serviceCommission={serviceCommission.commission}
              />
            </Box>
          </td>
        ))}
      </tr>
      {composeSecondCell() && (
        <tr>
          {composeSecondCell()}
          {tiers?.map((tier, tierIndex) => (
            <td key={tier.id} style={{ textAlign: 'center' }}>
              <ZigTypography fontWeight={600} fontSize={16} color='#999fe1'>
                {composeInvitesValue(tierIndex, tiers)}
              </ZigTypography>
            </td>
          ))}
        </tr>
      )}
      {composeThirdCell() && (
        <tr>
          {composeThirdCell()}
          {tiers?.map((tier, tierIndex) => (
            <td key={tier.id} style={{ textAlign: 'center' }}>
              <ZigTypography fontWeight={600} fontSize={16} color='#999fe1'>
                {composeInvitesValue(tierIndex, tiers)}
              </ZigTypography>
            </td>
          ))}
        </tr>
      )}
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
                  // todo
                  referral.boost ?? 1,
                  serviceCommission,
                )}
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
