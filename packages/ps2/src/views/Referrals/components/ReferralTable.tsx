import { Box, Grid, Paper } from '@mui/material';
import {
  createColumnHelper,
  ZigPriceLabel,
  ZigSelect,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import { FilterWrapperContainer } from '../styles';
import React, { useMemo, useState } from 'react';
import { RewardType, StatusType } from '../constants';
import { ReferralHistoryEntry } from '../../../apis/referrals/types';
import { useTranslation } from 'react-i18next';

const ReferralTable: React.FC<{ referrals: ReferralHistoryEntry[] }> = ({
  referrals,
}) => {
  const { t } = useTranslation('referrals');
  const [status, setStatus] = useState<StatusType>(null as StatusType);
  const statusOptions = useMemo(
    () => [
      { label: t('filter-any'), value: null },
      ...Object.entries(StatusType)
        .map(([k, v]) => ({
          label: t(`statusTypes.${k}`),
          value: v,
        }))
        .filter(({ value }) => referrals.some((r) => r.status === value)),
    ],
    [t, referrals],
  );

  const [rewardType, setRewardType] = useState<RewardType>(null as RewardType);
  const rewardTypeOptions = useMemo(
    () => [
      { label: t('filter-any'), value: null },
      ...Object.values(RewardType)
        .map((v) => ({
          label: t(`rewardTypes.${v}`),
          value: v,
        }))
        .filter(({ value }) => referrals.some((r) => r.type === value)),
    ],
    [t, referrals],
  );

  const columnHelper = createColumnHelper<ReferralHistoryEntry>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('date', {
        header: t('table.time-and-date'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('amount', {
        header: t('common:amount'),
        cell: ({ row: { original } }) => (
          // a hack to make the column width fixed
          <Box
            sx={{ minWidth: '60px', flexDirection: 'column', display: 'flex' }}
          >
            <ZigPriceLabel value={original.amount} coin={original.coin} />
            {!original.coin?.includes('USD') && (
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
      columnHelper.accessor('email', {
        header: t('table.user-trader'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('type', {
        header: t('table.reward-type'),
        cell: ({ getValue }) => (
          <ZigTypography>
            {getValue() in RewardType
              ? t(`rewardTypes.${getValue()}`)
              : getValue()}
          </ZigTypography>
        ),
      }),
      columnHelper.accessor('status', {
        header: t('table.filter-status'),
        cell: ({ getValue }) => (
          <ZigTypography
            color={
              (getValue() === StatusType.Pending && 'yellow') ||
              (getValue() === StatusType.Completed && 'greenGraph') ||
              ([StatusType.Failed, StatusType.Cancelled].includes(
                getValue() as StatusType,
              ) &&
                'red')
            }
          >
            {getValue() in StatusType
              ? t(`statusTypes.${getValue()}`)
              : getValue()}
          </ZigTypography>
        ),
      }),
    ],
    [],
  );

  const filteredHistory = useMemo(
    () =>
      referrals.filter(
        (r) =>
          (!status || r.status === status) &&
          (!rewardType || r.type === rewardType),
      ),
    [referrals, rewardType, status],
  );

  return (
    <Box sx={{ mb: 6, mt: 3 }}>
      <Grid container mb={3}>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ZigTypography sx={{}} variant={'h2'}>
            {t('table.title')}
          </ZigTypography>
        </Grid>
        {referrals.length > 0 && (
          <FilterWrapperContainer item xs={12} sm={8}>
            <ZigSelect
              onChange={setRewardType}
              value={rewardType}
              small
              label={t('table.filter-type')}
              options={rewardTypeOptions}
            />
            <ZigSelect
              onChange={setStatus}
              value={status}
              small
              label={t('table.filter-status')}
              options={statusOptions}
            />
          </FilterWrapperContainer>
        )}
      </Grid>

      {referrals.length ? (
        <ZigTable
          initialState={{
            sorting: [
              {
                id: 'date',
                desc: true,
              },
            ],
          }}
          columns={columns}
          data={filteredHistory}
          columnVisibility={false}
          enableSortingRemoval={false}
          emptyMessage={t('table.no-referrals')}
        />
      ) : (
        <Paper sx={{ p: 2 }}>
          <ZigTypography>{t('table.no-commission-history')}</ZigTypography>
        </Paper>
      )}
    </Box>
  );
};

export default ReferralTable;
