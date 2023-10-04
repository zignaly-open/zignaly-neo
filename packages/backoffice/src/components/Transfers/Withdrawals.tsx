import React, { useMemo, useRef, useState } from 'react';
import {
  createColumnHelper,
  PageContainer,
  ZigButton,
  ZigInput,
  ZigPriceLabel,
  ZigSelect,
  ZigTable,
  ZigTableQueryRef,
  ZigTypography,
} from '@zignaly-open/ui';
import {
  useWithdrawalApproveMutation,
  useWithdrawalRejectMutation,
  useWithdrawalsQuery,
} from '../../apis/transfers/api';
import { useTranslation } from 'react-i18next';
import { ValueOrDash } from '../TableUtils/ValueOrDash';
import { Box } from '@mui/material';
import useConfirmActionModal from '../TableUtils/useConfirmAction';
import {
  DepositStatuses,
  TransferFilterType,
  WithdrawalData,
} from '../../apis/transfers/types';
import { withdrawalStatusColorMap } from './constants';
import { useOperatorOptions, useWithdrawalStatusOptions } from './use';
import SearchIcon from '@mui/icons-material/Search';
import Shorten from '../TableUtils/Shorten';
import DateDisplay from '../TableUtils/DateDisplay';
import { isEqual as _isEqual } from 'lodash-es';

export default function Withdrawals() {
  const { t } = useTranslation('transfers');
  const [filters, setFilters] = useState<TransferFilterType>({
    userId: '',
    amount: 0,
    operator: 'gte',
    status: '',
  });
  const [filtersSubmitted, setFiltersSubmitted] =
    useState<TransferFilterType>(filters);

  const ref = useRef<ZigTableQueryRef>();
  const operators = useOperatorOptions();
  const statusOptions = useWithdrawalStatusOptions();
  const [approve] = useWithdrawalApproveMutation();
  const [reject] = useWithdrawalRejectMutation();
  const showConfirmAction = useConfirmActionModal();

  const columnHelper = createColumnHelper<WithdrawalData>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('id', {
        header: t('table.id'),
        cell: ({ getValue }) => <Shorten text={getValue()} width={150} />,
      }),
      columnHelper.accessor('createdAt', {
        header: t('table.date'),
        cell: ({ getValue }) => <DateDisplay date={getValue()} />,
      }),
      columnHelper.accessor('email', {
        enableSorting: false,
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
          <ZigPriceLabel
            value={row.original.amount}
            coin={row.original.currency}
          />
        ),
      }),
      columnHelper.accessor('status', {
        header: t('table.status'),
        cell: ({ getValue }) => (
          <ValueOrDash color={withdrawalStatusColorMap[getValue()]}>
            {getValue() && t('withdrawalStatuses.' + getValue())}
          </ValueOrDash>
        ),
      }),
      columnHelper.accessor('transactionId', {
        enableSorting: false,
        header: t('table.transactionId'),
        cell: ({ getValue }) => <Shorten text={getValue()} width={200} />,
      }),
      columnHelper.accessor('exposureType', {
        enableSorting: false,
        header: t('table.exposureType'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor('riskLevel', {
        enableSorting: false,
        header: t('table.riskLevel'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor((v) => 'actions' + v.id, {
        enableSorting: false,
        id: 'actions',
        header: t('table.actions'),
        cell: ({ row }) =>
          row.original.status !== DepositStatuses.STATUS_COMPLETED && (
            <>
              <ZigButton
                onClick={() =>
                  showConfirmAction({
                    title: t(`actions.approve-confirm`),
                    description: t(`actions.approve-confirm-description`, {
                      email: row.original.email,
                      amount: row.original.amount,
                      coin: row.original.currency,
                    }),
                    yesLabel: t('actions.approve'),
                    action: async () => {
                      await approve({ id: row.original.id }).unwrap();
                      ref.current?.refetch();
                    },
                  })
                }
                variant={'text'}
              >
                {t('actions.approve')}
              </ZigButton>
              <ZigButton
                onClick={() =>
                  showConfirmAction({
                    title: t(`actions.reject-confirm`),
                    description: t(`actions.reject-confirm-description`, {
                      email: row.original.email,
                      amount: row.original.amount,
                      coin: row.original.currency,
                    }),
                    yesLabel: t('actions.reject'),
                    action: async () => {
                      await reject({ id: row.original.id }).unwrap();
                      ref.current?.refetch();
                    },
                  })
                }
                variant={'text'}
              >
                {t('actions.reject')}
              </ZigButton>
            </>
          ),
      }),
    ];
  }, [filters, ref]);

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
        <Box sx={{ flex: 0, alignSelf: 'flex-end' }}>
          <ZigButton
            size='xlarge'
            onClick={() => {
              if (_isEqual(filters, filtersSubmitted)) ref.current?.refetch();
              else setFiltersSubmitted(filters);
            }}
            startIcon={<SearchIcon />}
          >
            {t('common:filter')}
          </ZigButton>
        </Box>
      </Box>

      <Box
        sx={{
          '& table': {
            minWidth: '1000px',
          },
        }}
      >
        <ZigTable
          ref={ref}
          initialState={{
            sorting: [
              {
                id: 'createdAt',
                desc: true,
              },
            ],
          }}
          // https://github.com/zignaly-open/zignaly-neo/issues/1215
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          columns={columns}
          defaultHiddenColumns={['id']}
          useQuery={useWithdrawalsQuery}
          queryExtraParams={filtersSubmitted}
          enableSortingRemoval={false}
          emptyMessage={t('no-data')}
        />
      </Box>
    </PageContainer>
  );
}
