import { Box, Grid, Paper } from '@mui/material';
import {
  createColumnHelper,
  ZigPriceLabel,
  ZigTable,
  ZigTypography,
  downloadTableCsv,
  ZigButton,
  ZigFilters,
} from '@zignaly-open/ui';
import React, { useMemo, useState } from 'react';
import { RewardType, StatusType } from '../constants';
import { ReferralHistoryEntry } from '../../../apis/referrals/types';
import { useTranslation } from 'react-i18next';
import { OpenInNew } from '@mui/icons-material';

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
                'red') ||
              (getValue() === StatusType.TransferOrdered && 'neutral175')
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

  const exporter = () =>
    downloadTableCsv(
      filteredHistory.map((r) => [
        r.date,
        `${r.amount} ${r.coin}`,
        r.email,
        r.type in RewardType ? t(`rewardTypes.${r.type}`) : r.type,
        r.status in StatusType ? t(`statusTypes.${r.status}`) : r.status,
      ]),
      [
        t('table.time-and-date'),
        t('common:amount'),
        t('table.user-trader'),
        t('table.reward-type'),
        t('table.filter-status'),
      ],
      'commissions.csv',
    );

  const filters = [
    {
      type: 'select',
      value: null,
      label: t('table.filter-type'),
      options: rewardTypeOptions,
      id: 'type',
      showInBar: true,
    },
    {
      type: 'select',
      value: null,
      label: t('table.filter-status'),
      options: statusOptions,
      id: 'status',
      showInBar: true,
    },
  ];

  const [localFilters, setLocalFilters] = useState(filters);

  const columnFilters = useMemo(() => {
    return localFilters.flatMap(({ id, value }) => {
      if (value === null) return [];
      return {
        id,
        value,
      };
    });
  }, [localFilters]);

  return (
    <Box sx={{ mb: 6, mt: 3 }}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexWrap='wrap'
        gap={1}
        mb='36px'
      >
        <Box display={'flex'} flex={3} flexBasis={{ xs: '100%', md: 0 }}>
          <ZigTypography variant={'h2'}>{t('table.title')}</ZigTypography>
        </Box>
        {referrals.length > 0 && (
          <>
            <Box
              justifyContent='center'
              display='flex'
              gap={1}
              alignItems='center'
              flex={3}
            >
              <ZigFilters
                defaultFilters={filters}
                initialFilters={filters}
                onChange={setLocalFilters}
              />
            </Box>
            <Box
              flex={3}
              display='flex'
              alignItems='center'
              justifyContent={'flex-end'}
            >
              <ZigButton
                onClick={exporter}
                variant={'text'}
                sx={{
                  '.MuiSvgIcon-root.MuiSvgIcon-root': {
                    fill: (theme) => theme.palette.links,
                  },
                }}
                endIcon={
                  <OpenInNew sx={{ width: '17.33px', height: '17.33px' }} />
                }
              >
                {t('export')}
              </ZigButton>
            </Box>
          </>
        )}
      </Box>

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
          state={{ columnFilters }}
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
