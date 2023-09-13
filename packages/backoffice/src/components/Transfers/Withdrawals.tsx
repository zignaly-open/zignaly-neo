import React, { useMemo, useState } from 'react';
import {
  createColumnHelper,
  Loader,
  PageContainer,
  ZigButton,
  ZigInput,
  ZigPriceLabel,
  ZigSelect,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import {
  useDepositApproveMutation,
  useLazyDepositsQuery,
} from '../../apis/transfers/api';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ValueOrDash } from '../TableUtils/ValueOrDash';
import { Box, Tooltip } from '@mui/material';
import { useDebounce } from 'react-use';
import useConfirmActionModal from '../TableUtils/useConfirmAction';
import {
  DepositData,
  DepositStatuses,
  TransferFilterType,
} from '../../apis/transfers/types';
import { withdrawalStatusColorMap } from './constants';

export default function Withdrawals() {
  const { t } = useTranslation('transfers');
  const [filters, setFilters] = useState<TransferFilterType>({
    userId: '',
    amount: 0,
    operator: 'gte',
    status: '',
  });

  const operators = useMemo<
    { value: TransferFilterType['operator']; label: string }[]
  >(
    () => [
      { value: 'eq', label: '=' },
      { value: 'gt', label: '>' },
      { value: 'lt', label: '<' },
      { value: 'gte', label: '>=' },
      { value: 'lte', label: '<=' },
    ],
    [],
  );

  const statusOptions = useMemo<
    { value: DepositStatuses | ''; label: JSX.Element }[]
  >(
    () => [
      { value: '', label: t('common:all') },
      ...Object.entries(t('statuses', { returnObjects: true })).map(
        ([value, label]) => ({
          value: value as unknown as DepositStatuses,
          label: (
            <ZigTypography color={withdrawalStatusColorMap[value]}>
              {label}
            </ZigTypography>
          ),
        }),
      ),
    ],
    [t],
  );

  const [fetchDeposits, { data: deposits, isFetching }] =
    useLazyDepositsQuery();
  const [approve] = useDepositApproveMutation();
  const showConfirmAction = useConfirmActionModal();

  useDebounce(
    async () => {
      fetchDeposits(filters);
    },
    500,
    [filters],
  );

  const columnHelper = createColumnHelper<DepositData>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('id', {
        header: t('table.id'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('email', {
        header: t('table.user'),
        cell: ({ getValue, row }) => (
          <Box>
            <ZigTypography component={'p'}>{getValue()}</ZigTypography>
            <ZigTypography component={'p'} variant={'body2'}>
              {row.original.userId}
            </ZigTypography>
          </Box>
        ),
      }),
      columnHelper.accessor('amount', {
        header: t('table.amount'),
        cell: ({ row }) => (
          <ZigPriceLabel value={row.original.amount} coin={row.original.coin} />
        ),
      }),
      columnHelper.accessor('status', {
        header: t('table.status'),
        cell: ({ getValue }) => (
          <ValueOrDash color={withdrawalStatusColorMap[getValue()]}>
            {getValue() && t('statuses.' + getValue())}
          </ValueOrDash>
        ),
      }),
      columnHelper.accessor('transactionId', {
        header: t('table.transactionId'),
        cell: ({ getValue }) => (
          <Tooltip title={getValue()}>
            <ZigTypography
              sx={{
                display: 'block',
                maxWidth: 220,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {getValue()}
            </ZigTypography>
          </Tooltip>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: t('table.date'),
        cell: ({ getValue }) => (
          <ZigTypography>{format(new Date(getValue()), 'PP p')}</ZigTypography>
        ),
      }),
      columnHelper.accessor('exposureType', {
        header: t('table.exposureType'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor('riskLevel', {
        header: t('table.riskLevel'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor((v) => 'actions' + v.id, {
        id: 'actions',
        header: t('table.actions'),
        cell: ({ row }) =>
          row.original.status !== DepositStatuses.STATUS_COMPLETED && (
            <ZigButton
              onClick={() =>
                showConfirmAction({
                  title: t(`actions.approve-confirm`),
                  description: t(`actions.approve-confirm-description`, {
                    email: row.original.email,
                    amount: row.original.amount,
                    coin: row.original.coin,
                  }),
                  yesLabel: t('actions.approve'),
                  action: async () => {
                    await approve({ id: row.original.id }).unwrap();
                    await fetchDeposits(filters);
                  },
                })
              }
              variant={'text'}
            >
              {t('actions.approve')}
            </ZigButton>
          ),
      }),
    ];
  }, [filters]);

  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ZigTypography sx={{ mb: 4 }} variant={'h1'}>
        {t('navigation.withdrawals')}
      </ZigTypography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          mb: 4,
          width: 1000,
          '& > *': {
            flex: 1,
          },
        }}
      >
        <ZigInput
          label={t('table.userId')}
          placeholder={t('table.userId')}
          value={filters.userId}
          onChange={(e) =>
            setFilters((old) => ({ ...old, userId: e.target.value }))
          }
        />
        <Box>
          <ZigTypography>{t('table.amount')}</ZigTypography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: '10px',
              gap: '10px',
            }}
          >
            <ZigSelect
              width={100}
              value={filters.operator}
              onChange={(operator) =>
                setFilters((old) => ({ ...old, operator }))
              }
              options={operators}
            />
            <ZigInput
              placeholder={t('table.amount')}
              value={filters.amount}
              onChange={(e) =>
                setFilters((old) => ({ ...old, amount: +e.target.value }))
              }
            />
          </Box>
        </Box>
        <ZigSelect
          label={t('table.status')}
          value={filters.status}
          onChange={(status) => setFilters((old) => ({ ...old, status }))}
          options={statusOptions}
        />
      </Box>

      {deposits ? (
        <Box
          sx={{
            '& table': {
              minWidth: '1000px',
            },
            ...(isFetching
              ? {
                  opacity: 0.5,
                  cursor: 'not-allowed',
                  pointerEvents: 'none',
                }
              : {}),
          }}
        >
          <ZigTable
            initialState={{
              sorting: [
                {
                  id: 'userId',
                  desc: true,
                },
              ],
            }}
            columns={columns}
            data={deposits}
            columnVisibility={false}
            enableSortingRemoval={false}
            emptyMessage={t('no-data')}
          />
        </Box>
      ) : (
        <Loader />
      )}
    </PageContainer>
  );
}
