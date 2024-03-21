import React from 'react';
import { Box, Tooltip, useTheme } from '@mui/material';
import { ZigTypography, formatCompactNumber } from '@zignaly-open/ui';
import { ZigClockIcon, ZigUserFilledIcon } from '@zignaly-open/ui/icons';
import { MAX_FEES_AMOUNT, getMaxEarnings } from '../../util';
import { useTranslation } from 'react-i18next';
import { TierLevels } from 'apis/referrals/types';
import { numericFormatter } from 'react-number-format';
import { TooltipIcon } from '../../styles';
import TierBar from '../TierBar';
import { TiersTableProps } from './types';
import { useTierLayers } from '../TierBar/util';
import BoostChip from '../BoostChip';
import { Table } from './styles';
import { whitelabel } from '../../../../../../whitelabel';

export const composeInvitesValue = (
  tierIndex: number,
  tiers: TierLevels,
  showPlus = true,
) => {
  const currentTier = tiers[tierIndex];
  const previousTier = tiers[tierIndex - 1];

  if (tierIndex === tiers.length - 1) {
    return `${currentTier.invitees}${showPlus ? '+' : ''}`;
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
      fontWeight={400}
      variant='h4'
      textAlign='end'
      lineHeight='24px'
      color={'neutral200'}
      className='tier-chart__label-base-commission'
    >
      {t('base-commission')}
      <Tooltip title={t('tooltips.base-commission')}>
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
      {!activated && <ZigClockIcon color='#e93ea7' />}
      <ZigTypography
        whiteSpace={'nowrap'}
        fontWeight={500}
        variant='h4'
        textAlign='end'
        lineHeight='24px'
        color={activated ? '#24b68d' : '#e93ea7'}
        className='tier-chart__label-boost'
      >
        {t(activated ? 'welcome-boost' : 'within-1-week')}
        <Tooltip
          title={t(
            activated
              ? 'tooltips.within-1-week-unlocked'
              : 'tooltips.within-1-week',
          )}
        >
          <TooltipIcon />
        </Tooltip>
      </ZigTypography>
    </Box>
  );
};

const CellLabelTraderBoost = ({ traderBoost }: { traderBoost: number }) => {
  const { t } = useTranslation('referrals-trader');

  return (
    <Box
      display='flex'
      alignItems='center'
      gap='10px'
      justifyContent='flex-end'
    >
      <BoostChip boost={traderBoost + 1} showBolt />
      <ZigTypography
        fontWeight={500}
        variant='h4'
        lineHeight='24px'
        color='#24b68d'
        className='tier-chart__label-trader-commission'
        whiteSpace={'nowrap'}
      >
        {t('trader-boost')}
        <Tooltip
          title={t('tooltips.trader-boost', {
            commission: traderBoost * whitelabel.zignalySuccessFee,
          })}
        >
          <TooltipIcon />
        </Tooltip>
      </ZigTypography>
    </Box>
  );
};

const TiersTable = ({
  tiers,
  referral,
  boostRunning,
  boost,
  traderBoost,
}: TiersTableProps) => {
  const { t } = useTranslation(['referrals-trader', 'service']);
  const theme = useTheme();
  const layers = useTierLayers(tiers, tiers[0].id, boost, traderBoost);

  const composeCellTierLabels = () => {
    return (
      <td style={{ verticalAlign: 'bottom', position: 'relative' }}>
        {traderBoost >= 1 && (
          <Box position='absolute' bottom={layers[1].height} right={0}>
            <CellLabelTraderBoost traderBoost={traderBoost} />
          </Box>
        )}
        {boost > 1 && (
          <Box
            position='absolute'
            bottom={[...layers].reverse().find((l) => l.value).height}
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
    <Table>
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
                traderBoost={traderBoost}
                boost={boost}
              />
            </Box>
          </td>
        ))}
      </tr>
      <tr>
        <td height='34px'>
          <Box
            display={'flex'}
            alignItems={'center'}
            gap='12px'
            justifyContent='flex-end'
          >
            <ZigUserFilledIcon
              color={theme.palette.paleBlue}
              height={19.5}
              width={16.5}
            />
            <ZigTypography
              fontWeight={500}
              variant='h3'
              textAlign='end'
              lineHeight='24px'
              color={theme.palette.paleBlue}
              className='tier-chart__label-referrals'
            >
              {t('referrals')}
              <Tooltip title={t('tooltips.number-referrals')}>
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
              gap='6px'
              justifyContent='center'
            >
              <ZigTypography
                fontWeight={600}
                fontSize={16}
                color='paleBlue'
                lineHeight={'23px'}
                className='tier-chart__referrals-value'
              >
                {composeInvitesValue(tierIndex, tiers)}
              </ZigTypography>
              <ZigUserFilledIcon
                color={theme.palette.paleBlue}
                height={12}
                width={10}
              />
            </Box>
          </td>
        ))}
      </tr>
      <tr>
        <td>
          <ZigTypography
            fontWeight={400}
            variant='h4'
            mt='2px'
            mr='16px'
            textAlign='end'
            lineHeight='18px'
            whiteSpace='pre-line'
            color={'neutral200'}
            className='tier-chart__label-earnings'
          >
            {t('max-earnings-from-fees', {
              amount: numericFormatter(
                (
                  Math.round(MAX_FEES_AMOUNT * whitelabel.zignalySuccessFee) /
                  100
                ).toString(),
                {
                  thousandSeparator: true,
                  prefix: '$',
                },
              ),
            })}
          </ZigTypography>
        </td>
        {tiers?.map((tier) => (
          <td key={tier.id} style={{ textAlign: 'center' }}>
            <ZigTypography
              fontWeight={500}
              fontSize={16}
              color=' rgba(36, 184, 142, 0.9);'
              className='tier-chart__earnings-value'
            >
              {'$'}
              {formatCompactNumber(
                getMaxEarnings(
                  tier.commissionPct,
                  boost,
                  traderBoost,
                ).toFixed(),
              )}
            </ZigTypography>
          </td>
        ))}
      </tr>
    </Table>
  );
};

export default TiersTable;
