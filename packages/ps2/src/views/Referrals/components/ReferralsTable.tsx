import { Box, Grid } from '@mui/material';
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

const ReferralsTable: React.FC<{ referrals: ReferralHistoryEntry[] }> = ({
  referrals,
}) => {
  const { t } = useTranslation('referrals');
  const [status, setStatus] = useState<StatusType>(null as StatusType);
  const statusOptions = useMemo(
    () => [
      { label: t('filter-any'), value: null },
      ...Object.values(StatusType).map((v) => ({
        label: t(`statusTypes.${v}`),
        value: v,
      })),
    ],
    [t],
  );

  const [rewardType, setRewardType] = useState<RewardType>(null as RewardType);
  const rewardTypeOptions = useMemo(
    () => [
      { label: t('filter-any'), value: null },
      ...Object.values(RewardType).map((v) => ({
        label: t(`rewardTypes.${v}`),
        value: v,
      })),
    ],
    [t],
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
        cell: ({ getValue }) => <ZigPriceLabel value={getValue()} usd />,
      }),
      columnHelper.accessor('email', {
        header: t('table.user-trader'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('type', {
        header: t('table.user-trader'),
        cell: ({ getValue }) => (
          <ZigTypography>
            {getValue() in RewardType
              ? t(`rewardTypes.${getValue()}`)
              : getValue()}
          </ZigTypography>
        ),
      }),
      columnHelper.accessor('status', {
        header: t('table.user-trader'),
        cell: ({ getValue }) => (
          <ZigTypography>
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
          <ZigTypography
            sx={{
              mb: 3,
            }}
            variant={'h2'}
          >
            {t('table.title')}
          </ZigTypography>
        </Grid>
        <FilterWrapperContainer item xs={12} sm={8}>
          <ZigSelect
            onChange={setStatus}
            value={status}
            small
            label={'eee'}
            options={statusOptions}
          />
          <ZigSelect
            onChange={setRewardType}
            value={rewardType}
            small
            label={'ee'}
            options={rewardTypeOptions}
          />
        </FilterWrapperContainer>
      </Grid>

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
    </Box>
  );
};

export default ReferralsTable;
