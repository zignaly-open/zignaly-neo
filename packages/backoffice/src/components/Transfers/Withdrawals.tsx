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
  TransferFilterType,
  WithdrawalData,
  WithdrawalStatuses,
} from '../../apis/transfers/types';
import { withdrawalStatusColorMap } from './constants';
import { useOperatorOptions, useWithdrawalStatusOptions } from './use';
import Shorten from '../TableUtils/Shorten';
import DateDisplay from '../TableUtils/DateDisplay';
import { isEqual as _isEqual } from 'lodash-es';
import FilterButtons from '../TableUtils/FilterButtons';
import { convertUserInputToNumberFormat } from './utils';

const initialFilter: TransferFilterType = {
  userId: '',
  amount: '0',
  operator: 'gte',
  status: '',
};

export default function Withdrawals() {
  const { t } = useTranslation('transfers');

  const [filters, setFilters] = useState<TransferFilterType>(initialFilter);
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
        cell: ({ getValue }) => (
          <Shorten
            typographyProps={{ sx: { minWidth: 150 } }}
            text={getValue()}
            width={200}
          />
        ),
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
        cell: ({ getValue }) => (
          <Shorten breakLines text={getValue()} width={210} />
        ),
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
          [
            WithdrawalStatuses.STATUS_REVIEWING,
            WithdrawalStatuses.STATUS_PENDING_TO_APPROVE,
          ].includes(row.original.status as WithdrawalStatuses) && (
            <>
              <ZigButton
                onClick={() =>
                  showConfirmAction({
                    title: t(`actions.approve-withdrawal`),
                    description: t(`actions.approve-withdrawal-description`, {
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
                    title: t(`actions.reject-withdrawal`),
                    description: t(`actions.reject-withdrawal-description`, {
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
          mb: 3,
          width: 1000,
          '& > *': {
            flex: 1,
          },
        }}
      >
        <ZigInput
          size={'small'}
          label={t('table.userId')}
          placeholder={t('table.userId')}
          value={filters.userId}
          onChange={(e) =>
            setFilters((old) => ({ ...old, userId: e.target.value }))
          }
        />
        <Box mt={'-2px'}>
          <ZigTypography fontSize={'13px'} lineHeight={'20px'}>
            {t('table.amount')}
          </ZigTypography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: '5px',
              gap: '10px',
            }}
          >
            <ZigSelect
              medium
              width={100}
              value={filters.operator}
              onChange={(operator) =>
                setFilters((old) => ({ ...old, operator }))
              }
              options={operators}
            />
            <ZigInput
              size={'small'}
              placeholder={t('table.amount')}
              value={filters.amount}
              onChange={(e) =>
                setFilters((old) => ({
                  ...old,
                  amount: convertUserInputToNumberFormat(
                    e.target.value,
                    old.amount,
                  ),
                }))
              }
            />
          </Box>
        </Box>
        <ZigSelect
          medium
          label={t('table.status')}
          value={filters.status}
          onChange={(status) => setFilters((old) => ({ ...old, status }))}
          options={statusOptions}
        />
        <FilterButtons
          onClick={() => {
            if (_isEqual(filters, filtersSubmitted)) ref.current?.refetch();
            else setFiltersSubmitted(filters);
          }}
          onClear={() => {
            setFilters({ ...initialFilter });
            setFiltersSubmitted({ ...initialFilter });
          }}
        />
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
