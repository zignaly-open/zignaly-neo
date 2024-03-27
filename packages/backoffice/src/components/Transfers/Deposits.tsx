import React, { useMemo, useRef, useState } from 'react';
import {
  createColumnHelper,
  PageContainer,
  ZigButton,
  ZigInput,
  ZigTablePriceLabel,
  ZigSelect,
  ZigTable,
  ZigTableQueryRef,
  ZigTypography,
} from '@zignaly-open/ui';
import {
  useDepositApproveMutation,
  useDepositsQuery,
} from '../../apis/transfers/api';
import { useTranslation } from 'react-i18next';
import { ValueOrDash } from '../TableUtils/ValueOrDash';
import { Box } from '@mui/material';
import useConfirmActionModal from '../TableUtils/useConfirmAction';
import {
  DepositData,
  DepositStatuses,
  TransferFilterType,
} from '../../apis/transfers/types';
import { depositStatusColorMap } from './constants';
import { useDepositStatusOptions, useOperatorOptions } from './use';
import DateDisplay from '../TableUtils/DateDisplay';
import { isEqual as _isEqual } from 'lodash-es';
import Shorten from '../TableUtils/Shorten';
import FilterButtons from '../TableUtils/FilterButtons';
import TableWrap from '../TableUtils/TableWrap';
import { convertUserInputToNumberFormat } from './utils';

const initialFilter: TransferFilterType = {
  userId: '',
  amount: '0',
  operator: 'gte',
  status: '',
};

export default function Deposits() {
  const { t } = useTranslation(['transfers', 'common']);

  const [errorInputId, setErrorInputId] = useState<string>('');

  const [filters, setFilters] = useState<TransferFilterType>(initialFilter);
  const [filtersSubmitted, setFiltersSubmitted] =
    useState<TransferFilterType>(filters);

  const ref = useRef<ZigTableQueryRef>();
  const [approve] = useDepositApproveMutation();
  const operators = useOperatorOptions();
  const statusOptions = useDepositStatusOptions();
  const showConfirmAction = useConfirmActionModal();

  const columnHelper = createColumnHelper<DepositData>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('id', {
        header: t('table.id'),
        cell: ({ getValue }) => (
          <ZigTypography variant={'body2'}>{getValue()}</ZigTypography>
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
          <ZigTablePriceLabel
            value={row.original.amount}
            coin={row.original.coin}
          />
        ),
      }),
      columnHelper.accessor('status', {
        header: t('table.status'),
        cell: ({ getValue }) => (
          <ValueOrDash color={depositStatusColorMap[getValue()]}>
            {getValue() && t('depositStatuses.' + getValue())}
          </ValueOrDash>
        ),
      }),
      columnHelper.accessor('transactionId', {
        enableSorting: false,
        header: t('table.transactionId'),
        cell: ({ getValue }) => (
          <Shorten
            typographyProps={{ sx: { minWidth: 150 }, variant: 'body2' }}
            breakLines
            text={getValue()}
            width={200}
          />
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
            DepositStatuses.STATUS_BLOCKED_BY_LIMIT,
            DepositStatuses.STATUS_BLOCKED_BY_RISK,
          ].includes(row.original.status as DepositStatuses) && (
            <ZigButton
              onClick={() =>
                showConfirmAction({
                  title: t(`actions.approve-deposit`),
                  description: t(`actions.approve-deposit-description`, {
                    email: row.original.email,
                    amount: row.original.amount,
                    coin: row.original.coin,
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
        {t('navigation.deposits')}
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
          onChange={(e) => {
            setErrorInputId('');
            setFilters((old) => ({ ...old, userId: e.target.value }));
          }}
          error={errorInputId}
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
          label={t('table.status')}
          medium
          value={filters.status}
          onChange={(status) => setFilters((old) => ({ ...old, status }))}
          options={statusOptions}
        />
        <FilterButtons
          onClick={() => {
            if (
              !filters.userId.match(/^[0-9a-fA-F]{24}$/) &&
              filters.userId !== ''
            ) {
              setErrorInputId(t('error.invalid-value'));
              return;
            }
            if (_isEqual(filters, filtersSubmitted)) ref.current?.refetch();
            else setFiltersSubmitted(filters);
          }}
          onClear={() => {
            setFilters({ ...initialFilter });
            setFiltersSubmitted({ ...initialFilter });
          }}
        />
      </Box>

      <TableWrap>
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
          useQuery={useDepositsQuery}
          queryExtraParams={filtersSubmitted}
          enableSortingRemoval={false}
          emptyMessage={t('no-data')}
        />
      </TableWrap>
    </PageContainer>
  );
}
