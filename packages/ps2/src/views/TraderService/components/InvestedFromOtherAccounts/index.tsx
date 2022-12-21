import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useIsInvestedInService } from '../../../../apis/investment/use';
import ZModal from '../../../../components/ZModal';
import { Service } from '../../../../apis/service/types';
import {
  TextButton,
  UsdPriceLabel,
  ZigTable,
  ZigTablePriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import {
  useActiveExchange,
  useCurrentUser,
  useSelectExchange,
} from '../../../../apis/user/use';
import { Box } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';

function InvestedFromOtherAccounts({
  close,
  service,
  ...props
}: {
  close: () => void;
  service: Service;
} & DialogProps): React.ReactElement {
  const isInvested = useIsInvestedInService(service.id);
  const { exchanges } = useCurrentUser();
  const selectExchange = useSelectExchange();
  const activeExchange = useActiveExchange();
  const { t } = useTranslation('service');
  const allInvestedServices = useMemo(() => {
    return Object.entries(isInvested?.accounts).map(([internalId, data]) => ({
      account: exchanges?.find((x) => x.internalId === internalId)
        ?.internalName,
      invested: data.invested,
      internalId,
    }));
  }, [isInvested?.accounts]);

  return (
    <ZModal
      {...props}
      close={close}
      title={t('other-accounts.title')}
      isLoading={isInvested.isLoading}
    >
      <Box mt={3}>
        <ZigTable
          columns={
            [
              {
                header: t('other-accounts.account'),
                accessorKey: 'account',
              },
              {
                header: t('other-accounts.invested'),
                accessorKey: 'invested',
                cell: ({ getValue }) =>
                  service.ssc === 'USDT' ? (
                    <UsdPriceLabel value={getValue()} />
                  ) : (
                    <ZigTablePriceLabel coin={service.ssc} value={getValue()} />
                  ),
              },
              {
                header: '',
                id: 'internalId',
                accessorKey: 'internalId',
                cell: ({ getValue }) =>
                  getValue() === activeExchange.internalId ? (
                    <ZigTypography color='neutral500'>
                      {t('other-accounts.active')}
                    </ZigTypography>
                  ) : (
                    <TextButton
                      leftElement={
                        <CompareArrowsIcon
                          sx={{
                            color: (theme) => theme.palette.links,
                          }}
                          width={16}
                          height={16}
                        />
                      }
                      caption={t('other-accounts.switch-action')}
                      color={'links'}
                      onClick={() => selectExchange(getValue())}
                    />
                  ),
              },
            ] as ColumnDef<typeof allInvestedServices[number], any>[]
          }
          data={allInvestedServices}
          columnVisibility={false}
          pagination={false}
        />
      </Box>
    </ZModal>
  );
}

export default InvestedFromOtherAccounts;
