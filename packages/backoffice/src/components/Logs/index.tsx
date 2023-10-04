import React, { useMemo, useRef, useState } from 'react';
import {
  createColumnHelper,
  PageContainer,
  ZigButton,
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
import SearchIcon from '@mui/icons-material/Search';
import { LogEntry, LogFilterType } from '../../apis/logs/types';
import { useLogActionOptions } from './use';
import { isEqual as _isEqual } from 'lodash-es';
import { useLogsQuery } from '../../apis/logs/api';

export default function Withdrawals() {
  const { t } = useTranslation('logs');
  const actionOptions = useLogActionOptions();
  const [filters, setFilters] = useState<LogFilterType>({
    userId: '',
    agentId: '',
    user: '',
    agent: '',
    action: '',
  });
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
      columnHelper.accessor('agentEmail', {
        enableSorting: false,
        header: t('table.agent'),
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
        <ZigSelect
          label={t('table.action')}
          value={filters.action}
          onChange={(action) => setFilters((old) => ({ ...old, action }))}
          options={actionOptions}
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
                id: 'userId',
                desc: true,
              },
            ],
          }}
          queryExtraParams={filtersSubmitted}
          // https://github.com/zignaly-open/zignaly-neo/issues/1215
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          columns={columns}
          useQuery={useLogsQuery}
          enableSortingRemoval={false}
          emptyMessage={t('no-data')}
        />
      </Box>
    </PageContainer>
  );
}
