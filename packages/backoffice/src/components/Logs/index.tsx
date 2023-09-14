import React, { useMemo, useState } from 'react';
import {
  createColumnHelper,
  Loader,
  PageContainer,
  ZigInput,
  ZigPriceLabel,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ValueOrDash } from '../TableUtils/ValueOrDash';
import { Box, Tooltip } from '@mui/material';
import { useDebounce } from 'react-use';
import { WithdrawalData } from '../../apis/transfers/types';
import { useLazyLogsQuery } from '../../apis/logs/api';
import { LogFilterType } from '../../apis/logs/types';

export default function Withdrawals() {
  const { t } = useTranslation('logs');
  const [filters, setFilters] = useState<LogFilterType>({
    userId: '',
    agentId: '',
    user: '',
    agent: '',
    action: '',
  });

  const [fetchLogs, { data: logs, isFetching }] = useLazyLogsQuery();

  useDebounce(
    async () => {
      fetchLogs(filters);
    },
    500,
    [filters],
  );

  const columnHelper = createColumnHelper<WithdrawalData>();
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
          <ZigPriceLabel
            value={row.original.amount}
            coin={row.original.currency}
          />
        ),
      }),
      columnHelper.accessor('status', {
        header: t('table.status'),
        cell: ({ getValue }) => (
          <ValueOrDash>{getValue() && t('statuses.' + getValue())}</ValueOrDash>
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
      columnHelper.accessor('title', {
        header: t('table.title'),
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
        {t('navigation.logs')}
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
          label={t('table.agentId')}
          placeholder={t('table.agentId')}
          value={filters.agentId}
          onChange={(e) =>
            setFilters((old) => ({ ...old, agentId: e.target.value }))
          }
        />
        <ZigInput
          label={t('table.user')}
          placeholder={t('table.user')}
          value={filters.user}
          onChange={(e) =>
            setFilters((old) => ({ ...old, user: e.target.value }))
          }
        />
        <ZigInput
          label={t('table.agent')}
          placeholder={t('table.agent')}
          value={filters.agent}
          onChange={(e) =>
            setFilters((old) => ({ ...old, agent: e.target.value }))
          }
        />
        <ZigInput
          label={t('table.action')}
          placeholder={t('table.action')}
          value={filters.agent}
          onChange={(e) =>
            setFilters((old) => ({ ...old, action: e.target.value }))
          }
        />
      </Box>

      {logs ? (
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
            data={logs}
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
