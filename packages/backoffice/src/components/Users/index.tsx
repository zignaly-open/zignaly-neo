import React, { useEffect, useMemo, useState } from 'react';
import {
  createColumnHelper,
  Loader,
  PageContainer,
  ZigButton,
  ZigDotsVerticalIcon,
  ZigDropdown,
  ZigInput,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import {
  useBanMutation,
  useDisable2FAMutation,
  useLazyUsersQuery,
  useUnbanMutation,
} from '../../apis/users/api';
import { useTranslation } from 'react-i18next';
import { UserData, UserFilterType } from '../../apis/users/types';
import { ValueOrDash } from '../TableUtils/ValueOrDash';
import { Box, IconButton, useTheme } from '@mui/material';
import useConfirmActionModal from '../TableUtils/useConfirmAction';
import SearchIcon from '@mui/icons-material/Search';

export default function Users() {
  const { t } = useTranslation('users');
  const [filters, setFilters] = useState<UserFilterType>({
    id: '',
    email: '',
    access: '',
    subscriptionCode: '',
  });
  const [fetchUsers, { data: users, isFetching }] = useLazyUsersQuery();
  const [banUser] = useBanMutation();
  const [unbanUser] = useUnbanMutation();
  const [disable2fa] = useDisable2FAMutation();
  const showConfirmAction = useConfirmActionModal();
  const theme = useTheme();

  useEffect(() => {
    fetchUsers(filters);
  }, []);

  const columnHelper = createColumnHelper<UserData>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('userId', {
        header: t('table.userId'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('email', {
        header: t('table.email'),
        cell: ({ getValue }) => <ZigTypography>{getValue()}</ZigTypography>,
      }),
      columnHelper.accessor('accessLevel', {
        header: t('table.accessLevel'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor('kycLevels', {
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
        header: t('table.subscriptionCode'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor('subscriptionLevel', {
        header: t('table.subscriptionLevel'),
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
      }),
      columnHelper.accessor('2faEnabled', {
        header: t('table.2faEnabled'),
        cell: ({ getValue }) => (
          <ZigTypography color={getValue() ? 'greenGraph' : 'redGraphOrError'}>
            {getValue() ? t('common:on') : t('common:off')}
          </ZigTypography>
        ),
      }),
      columnHelper.accessor((v) => v.accessLevel === -100, {
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
                    showConfirmAction({
                      title: t(
                        `actions.${isBanned ? 'unban' : 'ban'}-confirm`,
                        {
                          email: original.email,
                        },
                      ),
                      description: t('common:generic-confirm'),
                      yesLabel: isBanned
                        ? t('actions.unban')
                        : t('actions.ban'),
                      action: async () => {
                        await (isBanned
                          ? unbanUser({ userId: original.userId })
                          : banUser({ userId: original.userId })
                        ).unwrap();
                        await fetchUsers(filters);
                      },
                    }),
                },
              ].concat(
                original['2faEnabled']
                  ? {
                      label: t('actions.disable2FA'),
                      onClick: () =>
                        showConfirmAction({
                          title: t(`actions.disable2FA-confirm`, {
                            email: original.email,
                          }),
                          description: t('common:generic-confirm'),
                          yesLabel: t(`actions.disable2FA-confirm`, {
                            email: original.email,
                          }),
                          action: async () => {
                            await disable2fa({
                              userId: original.userId,
                            }).unwrap();
                            await fetchUsers(filters);
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
        {t('navigation.users')}
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
          value={filters.id}
          onChange={(e) =>
            setFilters((old) => ({ ...old, id: e.target.value }))
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
          value={filters.access}
          onChange={(e) =>
            setFilters((old) => ({ ...old, access: e.target.value }))
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
        <Box sx={{ flex: 0, alignSelf: 'flex-end' }}>
          <ZigButton
            size='xlarge'
            onClick={() => fetchUsers(filters)}
            startIcon={<SearchIcon />}
            loading={isFetching}
          >
            {t('common:filter')}
          </ZigButton>
        </Box>
      </Box>

      {users ? (
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
            data={users}
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
