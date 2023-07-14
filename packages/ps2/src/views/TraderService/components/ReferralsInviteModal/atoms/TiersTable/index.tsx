import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { ZigTypography, ZigUserFilledIcon } from '@zignaly-open/ui';
import { MAX_FEES_AMOUNT, getMaxEarnings } from '../../util';
import { useTranslation } from 'react-i18next';
import { TierLevels } from 'apis/referrals/types';
import { numericFormatter } from 'react-number-format';
import { TooltipIcon } from '../../styles';
import TierBar from '../TierBar';
import { TiersTableProps } from './types';
import { useTierLayers } from '../TierBar/util';
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

const CellLabelBoost = ({
  boost,
  activated,
}: {
  boost: number;
  activated: boolean;
}) => {
  const { t } = useTranslation('referrals-trader');

  return (
    <Box display='flex' alignItems='center' gap='7px' justifyContent='flex-end'>
      <BoostChip boost={boost} />
      <ZigTypography
        fontWeight={500}
        variant='h4'
        textAlign='end'
        lineHeight='24px'
        color={activated ? '#24b68d' : '#e93ea7'}
      >
        {t(activated ? 'welcome-boost' : 'within-1-week')}
        <Tooltip title={t('zig-held-tooltip')}>
          <TooltipIcon />
        </Tooltip>
      </ZigTypography>
    </Box>
  );
};

const CellLabelTraderBoost = ({ boost }: { boost: number }) => {
  const { t } = useTranslation('referrals-trader');

  return (
    <Box
      display='flex'
      alignItems='center'
      gap='10px'
      justifyContent='flex-end'
    >
      <BoostChip boost={boost} showBolt />
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
  boostRunning,
  boost,
}: TiersTableProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);

  const layers = useTierLayers(
    tiers,
    tiers[0].id,
    boost,
    serviceCommission,
    zignalyCommission,
  );
  const composeCellTierLabels = () => {
    return (
      <td style={{ verticalAlign: 'bottom', position: 'relative' }}>
        {serviceCommission > 0 && (
          <Box position='absolute' bottom={layers[1].height} right={0}>
            <CellLabelTraderBoost boost={layers[0].value / layers[1].value} />
          </Box>
        )}
        {boost > 1 && (
          <Box
            position='absolute'
            bottom={layers.reverse().find((l) => l.value).height}
            right={0}
          >
            <CellLabelBoost activated={!boostRunning} boost={boost} />
          </Box>
        )}
        <CellLabelBaseCommission />
      </td>
    );
  };

  return (
    <table
      style={{
        marginTop: '16px',
        backgroundImage:
          'radial-gradient(circle at center, rgba(16, 13, 70, 0.4) 0%, rgba(16, 25, 70, 0.4) 27%, transparent 51%)',
      }}
    >
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
                zignalyCommission={zignalyCommission}
                boost={boost}
              />
            </Box>
          </td>
        ))}
      </tr>
      <tr>
        <td height='36px'>
          <Box
            display={'flex'}
            alignItems={'center'}
            gap='12px'
            justifyContent='flex-end'
          >
            <ZigUserFilledIcon color='#979ce0' height={19.5} width={16.5} />
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
          </Box>
        </td>
        {tiers?.map((tier, tierIndex) => (
          <td key={tier.id} style={{ textAlign: 'center' }}>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap='9px'
              justifyContent='center'
            >
              <ZigTypography fontWeight={600} fontSize={16} color='#999fe1'>
                {composeInvitesValue(tierIndex, tiers)}
              </ZigTypography>
              <ZigUserFilledIcon color='#979ce0' height={12} width={10} />
            </Box>
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
