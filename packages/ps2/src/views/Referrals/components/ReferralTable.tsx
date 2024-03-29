import { Box, Paper } from '@mui/material';
import {
  createColumnHelper,
  ZigPriceLabel,
  ZigTable,
  ZigTypography,
  downloadTableCsv,
  ZigButton,
  ZigFilters,
  ZigFiltersType,
  useFilteredCollection,
} from '@zignaly-open/ui';
import React, { useMemo } from 'react';
import { RewardType, StatusType } from '../constants';
import { ReferralHistoryEntry } from '../../../apis/referrals/types';
import { useTranslation } from 'react-i18next';
import { OpenInNew } from '@mui/icons-material';
import { TableId } from 'apis/settings/types';
import { usePersistTable } from 'apis/settings/use';

const ReferralTable: React.FC<{ referrals: ReferralHistoryEntry[] }> = ({
  referrals,
}) => {
  const { t } = useTranslation('referrals');

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
      columnHelper.accessor('subtrack', {
        header: t('table.subtrack'),
        cell: ({ getValue }) => (
          <Box display={'flex'} justifyContent={'center'}>
            <ZigTypography
              overflow={'hidden'}
              maxWidth={'250px'}
              textOverflow={'ellipsis'}
            >
              {getValue()}
            </ZigTypography>
          </Box>
        ),
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

  const defaultFilters: ZigFiltersType = useMemo(
    () => [
      {
        type: 'select',
        value: null,
        label: t('table.filter-type'),
        options: rewardTypeOptions,
        id: 'type',
        primary: true,
      },
      {
        type: 'select',
        value: null,
        label: t('table.filter-status'),
        options: statusOptions,
        id: 'status',
        primary: true,
      },
    ],
    [rewardTypeOptions, statusOptions, t],
  );

  const tablePersist = usePersistTable(TableId.Referrals, defaultFilters);
  const filteredHistory = useFilteredCollection(
    referrals,
    tablePersist.filters,
  );

  const exporter = () =>
    downloadTableCsv(
      filteredHistory.map((r) => [
        r.date,
        `${r.amount} ${r.coin}`,
        r.email,
        r.subtrack,
        r.type in RewardType ? t(`rewardTypes.${r.type}`) : r.type,
        r.status in StatusType ? t(`statusTypes.${r.status}`) : r.status,
      ]),
      [
        t('table.time-and-date'),
        t('common:amount'),
        t('table.user-trader'),
        t('table.subtrack'),
        t('table.reward-type'),
        t('table.filter-status'),
      ],
      'commissions.csv',
    );

  return (
    <Box sx={{ mb: 6, mt: 3 }}>
      {referrals.length > 0 && (
        <>
          <ZigFilters
            leftComponent={
              <ZigTypography whiteSpace={'nowrap'} variant={'h2'}>
                {t('table.title')}
              </ZigTypography>
            }
            rightComponent={
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
            }
            defaultFilters={defaultFilters}
            filters={tablePersist.filters}
            onChange={tablePersist.filterTable}
          />
        </>
      )}

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
          sorting={tablePersist.sorting}
          columns={columns}
          data={filteredHistory}
          columnVisibility={false}
          enableSortingRemoval={false}
          emptyMessage={t('table.no-referrals')}
          onSortingChange={tablePersist.sortTable}
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
