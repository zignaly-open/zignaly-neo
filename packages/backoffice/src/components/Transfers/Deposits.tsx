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
import SearchIcon from '@mui/icons-material/Search';
import DateDisplay from '../TableUtils/DateDisplay';
import { isEqual as _isEqual } from 'lodash-es';
import Shorten from '../TableUtils/Shorten';

export default function Deposits() {
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
  const [approve] = useDepositApproveMutation();
  const operators = useOperatorOptions();
  const statusOptions = useDepositStatusOptions();
  const showConfirmAction = useConfirmActionModal();

  const columnHelper = createColumnHelper<DepositData>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('id', {
        header: t('table.id'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
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
          <ZigPriceLabel value={row.original.amount} coin={row.original.coin} />
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
          useQuery={useDepositsQuery}
          queryExtraParams={filtersSubmitted}
          enableSortingRemoval={false}
          emptyMessage={t('no-data')}
        />
      </Box>
    </PageContainer>
  );
}
