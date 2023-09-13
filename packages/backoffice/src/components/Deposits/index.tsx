import React, { useMemo, useState } from 'react';
import {
  createColumnHelper,
  Loader,
  PageContainer,
  ZigButton,
  ZigInput,
  ZigPriceLabel,
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
import { DepositData, TransferFilterType } from '../../apis/transfers/types';

export default function Deposits() {
  const { t } = useTranslation('deposits');
  const [filters, setFilters] = useState<TransferFilterType>({
    userId: '',
    user: '',
    amount: 0,
    operator: 'gt',
  });
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
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
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
        cell: ({ row }) => (
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
        {t('navigation.deposits')}
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
        <ZigInput
          label={t('table.email')}
          placeholder={t('table.email')}
          value={filters.email}
          onChange={(e) =>
            setFilters((old) => ({ ...old, email: e.target.value }))
          }
        />
        <ZigInput
          label={t('table.accessLevel')}
          placeholder={t('table.accessLevel')}
          value={filters.accessLevel}
          onChange={(e) =>
            setFilters((old) => ({ ...old, accessLevel: e.target.value }))
          }
        />
        <ZigInput
          label={t('table.subscriptionCode')}
          placeholder={t('table.subscriptionCode')}
          value={filters.subscriptionCode}
          onChange={(e) =>
            setFilters((old) => ({ ...old, subscriptionCode: e.target.value }))
          }
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
