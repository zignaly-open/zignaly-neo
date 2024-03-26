import React, { useMemo, useRef, useState } from 'react';
import {
  createColumnHelper,
  PageContainer,
  ZigDropdown,
  ZigInput,
  ZigSelect,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import { ZigDotsVerticalIcon } from '@zignaly-open/ui/icons';
import {
  useBanMutation,
  useDisable2FAMutation,
  useUnbanMutation,
  useUsersQuery,
} from '../../apis/users/api';
import { useTranslation } from 'react-i18next';
import {
  UserAccessLevel,
  UserData,
  UserFilterType,
} from '../../apis/users/types';
import { ValueOrDash } from '../TableUtils/ValueOrDash';
import { Box, IconButton, useTheme } from '@mui/material';
import type { ZigTableQueryRef } from '@zignaly-open/ui';
import { isEqual as _isEqual } from 'lodash-es';
import { useAccessLevelOptions } from './use';
import FilterButtons from '../TableUtils/FilterButtons';
import { useZTypeWordConfirm } from 'components/ZModal/use';
import TableWrap from '../TableUtils/TableWrap';

const initialFilter: UserFilterType = {
  id: '',
  email: '',
  access: '',
  code: '',
};

export default function Users() {
  const { t } = useTranslation('users');
  const [filters, setFilters] = useState<UserFilterType>(initialFilter);
  const [filtersSubmitted, setFiltersSubmitted] =
    useState<UserFilterType>(filters);

  const [banUser] = useBanMutation();
  const [unbanUser] = useUnbanMutation();
  const [disable2fa] = useDisable2FAMutation();
  const theme = useTheme();
  const accessLevelOptions = useAccessLevelOptions();
  const askConfirm = useZTypeWordConfirm();

  const ref = useRef<ZigTableQueryRef>();
  const columnHelper = createColumnHelper<UserData>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('userId', {
        header: t('table.userId'),
        cell: ({ getValue }) => (
          <ZigTypography variant={'body2'}>{getValue()}</ZigTypography>
        ),
      }),
      columnHelper.accessor('email', {
        header: t('table.email'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('accessLevel', {
        enableSorting: false,
        header: t('table.accessLevel'),
        cell: ({ getValue }) => (
          <ValueOrDash>
            {UserAccessLevel[getValue()]
              ? t('accessLevels.' + UserAccessLevel[getValue()])
              : getValue()}
          </ValueOrDash>
        ),
      }),
      columnHelper.accessor('kycLevels', {
        enableSorting: false,
        header: t('table.kycLevels'),
        cell: ({ getValue, row }) => (
          <ValueOrDash>
            {getValue() && (
              <>
                {Object.entries(getValue())
                  .map(([name, level]) => `${name}: ${level}`)
                  .map((x) => (
                    <ZigTypography
                      variant={'body2'}
                      component={'div'}
                      key={'kyc' + x + row.original.userId}
                    >
                      {x}
                    </ZigTypography>
                  ))}
              </>
            )}
          </ValueOrDash>
        ),
      }),
      columnHelper.accessor('subscriptionCode', {
        enableSorting: false,
        header: t('table.subscriptionCode'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor('subscriptionLevel', {
        enableSorting: false,
        header: t('table.subscriptionLevel'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor('2faEnabled', {
        enableSorting: false,
        header: t('table.2faEnabled'),
        cell: ({ getValue }) => (
          <ZigTypography color={getValue() ? 'greenGraph' : 'redGraphOrError'}>
            {getValue() ? t('common:on') : t('common:off')}
          </ZigTypography>
        ),
      }),
      columnHelper.accessor((v) => v.accessLevel === -100, {
        enableSorting: false,
        id: 'isBanned',
        header: t('table.isBanned'),

        cell: ({ getValue }) => (
          <ZigTypography color={!getValue() ? 'greenGraph' : 'redGraphOrError'}>
            {getValue() ? t('common:yes') : t('common:no')}
          </ZigTypography>
        ),
      }),
      columnHelper.accessor(({ userId }) => userId, {
        header: '',
        id: 'actions',
        enableSorting: false,
        cell: ({ row: { original } }) => {
          const isBanned = original.accessLevel === -100;
          return (
            <ZigDropdown
              component={() => (
                <IconButton sx={{ mr: '-4px' }}>
                  <ZigDotsVerticalIcon
                    color={theme.palette.neutral200}
                    height={16}
                    width={16}
                  />
                </IconButton>
              )}
              options={[
                {
                  label: t(isBanned ? 'actions.unban' : 'actions.ban'),
                  onClick: () =>
                    askConfirm({
                      description: t(
                        `actions.${isBanned ? 'unban' : 'ban'}-confirm`,
                        {
                          email: original.email,
                        },
                      ),
                      title: t(
                        isBanned ? 'actions.unban-user' : 'actions.ban-user',
                      ),
                      safeWord: t(isBanned ? 'actions.unban' : 'actions.ban'),
                      yesLabel: isBanned
                        ? t('actions.unban')
                        : t('actions.ban'),
                      yesAction: async () => {
                        await (isBanned
                          ? unbanUser({ userId: original.userId })
                          : banUser({ userId: original.userId })
                        ).unwrap();
                        ref.current?.refetch();
                      },
                    }),
                },
              ].concat(
                original['2faEnabled']
                  ? {
                      label: t('actions.disable2FA'),
                      onClick: () =>
                        askConfirm({
                          title: t('actions.disable2FA'),
                          safeWord: t('actions.disable2FA-short'),
                          description: t(`actions.disable2FA-confirm`, {
                            email: original.email,
                          }),
                          yesLabel: t('actions.disable2FA'),
                          yesAction: async () => {
                            await disable2fa({
                              userId: original.userId,
                            }).unwrap();
                            ref.current?.refetch();
                          },
                        }),
                    }
                  : [],
              )}
            />
          );
        },
        enableColumnFilter: false,
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
        {t('navigation.users')}
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
          value={filters.id}
          onChange={(e) =>
            setFilters((old) => ({ ...old, id: e.target.value }))
          }
        />
        <ZigInput
          size={'small'}
          label={t('table.email')}
          placeholder={t('table.email')}
          value={filters.email}
          onChange={(e) =>
            setFilters((old) => ({ ...old, email: e.target.value }))
          }
        />
        <ZigSelect
          medium
          label={t('table.accessLevel')}
          value={filters.access}
          onChange={(access) =>
            setFilters((old) => ({ ...old, access: access as string }))
          }
          options={accessLevelOptions}
        />
        <ZigInput
          size={'small'}
          label={t('table.subscriptionCode')}
          placeholder={t('table.subscriptionCode')}
          value={filters.code}
          onChange={(e) =>
            setFilters((old) => ({ ...old, code: e.target.value }))
          }
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
          useQuery={useUsersQuery}
          enableSortingRemoval={false}
          emptyMessage={t('no-data')}
        />
      </TableWrap>
    </PageContainer>
  );
}
