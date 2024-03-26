import React, { useMemo, useRef, useState } from 'react';
import {
  createColumnHelper,
  PageContainer,
  ZigInput,
  ZigSelect,
  ZigTable,
  ZigTableQueryRef,
  ZigTypography,
} from '@zignaly-open/ui';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ValueOrDash } from '../TableUtils/ValueOrDash';
import { Box } from '@mui/material';
import { LogEntry, LogFilterType } from '../../apis/logs/types';
import { useLogActionOptions } from './use';
import { isEqual as _isEqual } from 'lodash-es';
import { useLogsQuery } from '../../apis/logs/api';
import FilterButtons from '../TableUtils/FilterButtons';
import TableWrap from '../TableUtils/TableWrap';

const initialFilter: LogFilterType = {
  userId: '',
  agentId: '',
  user: '',
  action: '',
};

export default function Logs() {
  const { t } = useTranslation(['logs', 'common']);

  const [errorInputUserId, setErrorInputUserId] = useState<string>('');
  const [errorInputAgentId, setErrorInputAgentId] = useState<string>('');

  const actionOptions = useLogActionOptions();
  const [filters, setFilters] = useState<LogFilterType>(initialFilter);
  const [filtersSubmitted, setFiltersSubmitted] =
    useState<LogFilterType>(filters);

  const ref = useRef<ZigTableQueryRef>();
  const columnHelper = createColumnHelper<LogEntry>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('userId', {
        header: t('table.userId'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('agentId', {
        header: t('table.agentId'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('userEmail', {
        enableSorting: false,
        header: t('table.user'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('action', {
        header: t('table.action'),
        cell: ({ getValue }) => (
          <ValueOrDash>{getValue() && t('statuses.' + getValue())}</ValueOrDash>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: t('table.date'),
        cell: ({ getValue }) => (
          <ZigTypography>{format(new Date(getValue()), 'PP p')}</ZigTypography>
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
        {t('navigation.logs')}
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
          error={errorInputUserId}
          onChange={(e) => {
            setErrorInputUserId('');
            setFilters((old) => ({ ...old, userId: e.target.value }));
          }}
        />
        <ZigInput
          size={'small'}
          label={t('table.agentId')}
          placeholder={t('table.agentId')}
          value={filters.agentId}
          error={errorInputAgentId}
          onChange={(e) => {
            setErrorInputAgentId('');
            setFilters((old) => ({ ...old, agentId: e.target.value }));
          }}
        />
        <ZigInput
          size={'small'}
          label={t('table.user')}
          placeholder={t('table.user')}
          value={filters.user}
          onChange={(e) =>
            setFilters((old) => ({ ...old, user: e.target.value }))
          }
        />
        <ZigSelect
          medium
          label={t('table.action')}
          value={filters.action}
          onChange={(action) => setFilters((old) => ({ ...old, action }))}
          options={actionOptions}
        />
        <FilterButtons
          onClick={() => {
            if (
              !filters.userId.match(/^[0-9a-fA-F]{24}$/) &&
              filters.userId !== ''
            ) {
              setErrorInputUserId(t('error.invalid-value'));
              return;
            }
            if (
              !filters.agentId.match(/^[0-9a-fA-F]{24}$/) &&
              filters.agentId !== ''
            ) {
              setErrorInputAgentId(t('error.invalid-value'));
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
                id: 'userId',
                desc: true,
              },
            ],
          }}
          queryExtraParams={filtersSubmitted}
          columns={columns}
          useQuery={useLogsQuery}
          enableSortingRemoval={false}
          emptyMessage={t('no-data')}
        />
      </TableWrap>
    </PageContainer>
  );
}
