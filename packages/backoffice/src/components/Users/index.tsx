import React, { useMemo } from 'react';
import {
  createColumnHelper,
  Loader,
  PageContainer,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import { useUsersQuery } from '../../apis/users/api';
import { useTranslation } from 'react-i18next';
import { UserData } from '../../apis/users/types';
import TogglerButton from '../TogglerButton';
import { ValueOrDash } from './atoms';

export default function Users() {
  const { t } = useTranslation('users');
  const { data: users } = useUsersQuery();
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
        cell: ({ getValue }) => (
          <TogglerButton
            text={getValue() ? t('common:yes') : t('common:no')}
            isPositive={!getValue()}
            buttonText={getValue() ? t('unban') : t('ban')}
            action={() => {}}
          />
        ),
      }),
    ];
  }, []);

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

      {users ? (
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
      ) : (
        <Loader />
      )}
    </PageContainer>
  );
}
