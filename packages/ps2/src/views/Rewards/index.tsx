import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
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
import { Box, Paper } from '@mui/material';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import {
  useBenefitsClaimedQuery,
  useBenefitsQuery,
} from '../../apis/referrals/api';
import BenefitBox from './components/BenefitBox';
import { formatLocalizedDate } from '../Dashboard/components/MyDashboard/util';
import { useOpenDepositModal } from '../Dashboard/components/ManageInvestmentModals/DepositModal';
import TermsButtonModal from './components/TermsButtonModal';

const Rewards: React.FC = () => {
  const { t } = useTranslation(['rewards']);
  useTitle(t('pages:rewards'));
  const benefitsEndpoint = useBenefitsQuery();
  const rewardsClaimed = useBenefitsClaimedQuery();
  const deposit = useOpenDepositModal();

  const columnHelper = createColumnHelper<BenefitClaimed & { title?: never }>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        header: t('table.time-and-date'),
        cell: ({ getValue }) => (
          <ZigTypography>
            {formatLocalizedDate(getValue(), 'P p')}
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
              showTooltip
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
            {original.status === BenefitClaimedStatus.SuccessFee ? (
              <Trans i18nKey={'rewards:table.description-success_fee'} t={t}>
                <ZigPriceLabel
                  showTooltip
                  value={original.spent}
                  coin={original.currency}
                  usd
                />
                <ZigPriceLabel
                  showTooltip
                  value={original.remaining}
                  coin={original.currency}
                  usd
                />
              </Trans>
            ) : (
              <Trans i18nKey={'rewards:table.description-awarded'} t={t}>
                <ZigPriceLabel
                  showTooltip
                  value={original.amount}
                  coin={original.currency}
                  usd
                />
              </Trans>
            )}{' '}
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
    <PageContainer style={{ maxWidth: '915px' }}>
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
                  variant={'h1'}
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
                actionLabel={t(
                  b.status === BenefitType.Deposit
                    ? 'action:deposit'
                    : 'active',
                )}
                tooltip={
                  b.status === BenefitType.Deposit
                    ? undefined
                    : t('disabled-voucher')
                }
                buttonId={
                  b.status === BenefitType.Deposit
                    ? 'rewards__deposit-button'
                    : 'rewards__already-active-button'
                }
                showProgress={b.status === BenefitType.FeeVoucher}
                onAction={
                  b.status === BenefitType.Deposit ? deposit : undefined
                }
                // eslint-disable-next-line react/no-array-index-key
                key={`reward-${i}`}
              />
            ))}

            {!benefits?.length && (
              <Paper sx={{ p: 2 }}>
                <ZigTypography>{t('no-active-rewards')}</ZigTypography>
              </Paper>
            )}

            <ZigTypography variant={'h2'} sx={{ mt: 5, mb: 3 }}>
              {t('table.title')}
            </ZigTypography>

            {benefitsClaimed?.length > 0 ? (
              <ZigTable
                columns={columns}
                data={benefitsClaimed}
                columnVisibility={false}
                enableSortingRemoval={false}
                emptyMessage={t('table.no-benefits')}
              />
            ) : (
              <Paper sx={{ p: 2 }}>
                <ZigTypography>{t('table.no-benefits')}</ZigTypography>
              </Paper>
            )}
          </>
        )}
      />
    </PageContainer>
  );
};

export default Rewards;
