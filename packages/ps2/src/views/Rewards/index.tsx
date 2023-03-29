import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import {
  createColumnHelper,
  PageContainer,
  ZigPriceLabel,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import {
  Benefit,
  BenefitClaimed,
  BenefitClaimedStatus,
} from '../../apis/referrals/types';
import { Box } from '@mui/material';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import {
  useBenefitsClaimedQuery,
  useBenefitsQuery,
} from '../../apis/referrals/api';
import BenefitBox from './components/BenefitBox';
import { formatLocalizedDate } from '../Dashboard/components/MyDashboard/util';

const Rewards: React.FC = () => {
  const { t } = useTranslation(['rewards']);
  useTitle(t('pages:rewards'));
  const benefitsEndpoint = useBenefitsQuery();
  const rewardsClaimed = useBenefitsClaimedQuery();

  const columnHelper = createColumnHelper<BenefitClaimed & { title?: never }>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        header: t('table.time-and-date'),
        cell: ({ getValue }) => (
          <ZigTypography>
            {formatLocalizedDate(getValue(), 'PP pp')}
          </ZigTypography>
        ),
      }),
      columnHelper.accessor('amount', {
        header: t('common:amount'),
        cell: ({ row: { original } }) => (
          // a hack to make the column width fixed
          <Box
            sx={{ minWidth: '60px', flexDirection: 'column', display: 'flex' }}
          >
            <ZigPriceLabel value={original.amount} coin={original.currency} />
            {!original.currency?.includes('USD') && !!original.usdtAmount && (
              <ZigPriceLabel
                prefix={'~'}
                variant={'caption'}
                color={'neutral300'}
                value={original.usdtAmount}
                usd
              />
            )}
          </Box>
        ),
      }),
      columnHelper.accessor('title', {
        header: t('table.reward-description'),
        cell: () => <ZigTypography>{t('success-fee-voucher')}</ZigTypography>,
      }),
      columnHelper.accessor('status', {
        header: t('table.status'),
        cell: ({ getValue }) => (
          <ZigTypography
            color={
              (getValue() === BenefitClaimedStatus.SuccessFee &&
                'neutral175') ||
              (getValue() === BenefitClaimedStatus.Awarded && 'greenGraph')
            }
          >
            {Object.values(BenefitClaimedStatus).includes(getValue())
              ? t(`statusTypes.${getValue()}`)
              : getValue()}
          </ZigTypography>
        ),
      }),
    ],
    [],
  );

  return (
    <PageContainer style={{ maxWidth: '909px' }}>
      <LayoutContentWrapper
        endpoint={[benefitsEndpoint, rewardsClaimed]}
        content={([
          // benefits
          _,
          benefitsClaimed,
        ]: [Benefit[], BenefitClaimed[]]) => (
          <>
            <Box
              sx={{
                mt: 5,
                justifyContent: 'center',
                mb: 6,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  mr: 4,
                  ml: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={'/images/referrals/gift-mini.png'}
                  style={{ width: 100, marginTop: 17 }}
                  alt={'referral'}
                />
              </Box>
              <Box
                sx={{
                  maxWidth: 700,
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <ZigTypography
                  sx={{
                    mb: 1,
                  }}
                  variant={'bigNumber'}
                >
                  {t('title')}
                </ZigTypography>
                <ZigTypography>{t('description')}</ZigTypography>
              </Box>
            </Box>

            <ZigTypography variant={'h2'} sx={{ mt: 3, mb: 3 }}>
              {t('active-rewards')}
            </ZigTypography>

            {[].map(() => (
              <BenefitBox
                label='Success fee voucher'
                description='Deposit any amount and get $20 voucher to save on Success Fees'
                terms='Get a 10% discount on your success fee for 30 days'
                currentAmount={10}
                requiredAmount={20}
                rewardAmount={50}
                actionLabel={'Deposit'}
                onAction={() => alert()}
                key={Math.random() + 'lol'}
              />
            ))}

            <ZigTypography variant={'h2'} sx={{ mt: 5, mb: 3 }}>
              {t('table.title')}
            </ZigTypography>

            <ZigTable
              columns={columns}
              data={benefitsClaimed}
              columnVisibility={false}
              enableSortingRemoval={false}
              emptyMessage={t('table.no-benefits')}
            />
          </>
        )}
      />
    </PageContainer>
  );
};

export default Rewards;
