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
  BenefitType,
} from '../../apis/referrals/types';
import { Box } from '@mui/material';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import {
  useBenefitsClaimedQuery,
  useBenefitsQuery,
} from '../../apis/referrals/api';
import BenefitBox from './components/BenefitBox';
import { formatLocalizedDate } from '../Dashboard/components/MyDashboard/util';
import DepositModal from '../Dashboard/components/ManageInvestmentModals/DepositModal';
import { useZModal } from '../../components/ZModal/use';
import TermsButtonModal from './components/TermsButtonModal';

const Rewards: React.FC = () => {
  const { t } = useTranslation(['rewards']);
  useTitle(t('pages:rewards'));
  const benefitsEndpoint = useBenefitsQuery();
  const rewardsClaimed = useBenefitsClaimedQuery();
  const { showModal } = useZModal();
  const deposit = () =>
    showModal(DepositModal, {
      ctaId: 'rewards-deposit-button',
    });

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
            <ZigPriceLabel
              value={original.amount}
              usd={original.currency?.includes('USD')}
              coin={original.currency}
            />
          </Box>
        ),
      }),
      columnHelper.accessor('title', {
        header: t('table.reward-description'),
        cell: ({ row: { original } }) => (
          <ZigTypography>
            {t('table.description', { amount: original.amount })}{' '}
            <TermsButtonModal />
          </ZigTypography>
        ),
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
        content={([benefits, benefitsClaimed]: [
          Benefit[],
          BenefitClaimed[],
        ]) => (
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
                  src={'/images/referrals/gift-large.png'}
                  style={{ width: 100 }}
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

            {benefits.map((b, i) => (
              <BenefitBox
                label={t(`rewardTypes.${b.status}`)}
                description={t(`rewardDescriptions.${b.status}`, {
                  amount: b.amount,
                })}
                currentAmount={b.amount - b.currentAmount}
                requiredAmount={b.amount}
                rewardAmount={b.amount}
                actionLabel={t('action:deposit')}
                showProgress={b.status !== BenefitType.FeeVoucher}
                onAction={
                  b.status === BenefitType.FeeVoucher ? deposit : undefined
                }
                // eslint-disable-next-line react/no-array-index-key
                key={`reward-${i}`}
              />
            ))}

            {!benefits?.length && (
              <ZigTypography sx={{ textAlign: 'center' }}>
                {t('no-active-rewards')}
              </ZigTypography>
            )}

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
