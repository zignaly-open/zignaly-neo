import React, { useMemo, useState } from 'react';
import {
  createColumnHelper,
  Loader,
  PageContainer,
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
import { UserData } from '../../apis/users/types';
import TogglerButton from '../TableUtils/TogglerButton';
import { ValueOrDash } from '../TableUtils/ValueOrDash';
import { Box } from '@mui/material';
import { useDebounce } from 'react-use';
import useConfirmActionModal from '../TableUtils/useConfirmAction';

export default function Users() {
  const { t } = useTranslation('users');
  const [filters, setFilters] = useState({
    userId: '',
    email: '',
    accessLevel: '',
    subscriptionCode: '',
  });
  const [fetchUsers, { data: users, isFetching }] = useLazyUsersQuery();
  const [banUser] = useBanMutation();
  const [unbanUser] = useUnbanMutation();
  const [disable2fa] = useDisable2FAMutation();
  const showConfirmAction = useConfirmActionModal();

  useDebounce(
    async () => {
      fetchUsers(filters);
    },
    500,
    [filters],
  );

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
        cell: ({ getValue }) => <ValueOrDash>{getValue()}</ValueOrDash>,
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
          <TogglerButton
            text={getValue() ? t('common:on') : t('common:off')}
            isPositive={getValue()}
            buttonText={t('actions.disable2FA')}
            action={getValue() ? () => {} : undefined}
          />
        ),
      }),
      columnHelper.accessor((v) => v.accessLevel === -100, {
        id: 'isBanned',
        header: t('table.isBanned'),
        cell: ({ getValue, row }) => {
          const value = getValue();
          return (
            <TogglerButton
              text={getValue() ? t('common:yes') : t('common:no')}
              isPositive={!getValue()}
              buttonText={getValue() ? t('actions.unban') : t('actions.ban')}
              action={() =>
                showConfirmAction({
                  title: t(`actions.${value ? 'unban' : 'ban'}-confirm`, {
                    email: row.original.email,
                  }),
                  description: t('common:generic-confirm'),
                  yesLabel: value ? t('actions.unban') : t('actions.ban'),
                  action: async () => {
                    await (value
                      ? unbanUser({ userId: row.original.userId })
                      : banUser({ userId: row.original.userId })
                    ).unwrap();
                    await fetchUsers(filters);
                  },
                })
              }
            />
          );
        },
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
