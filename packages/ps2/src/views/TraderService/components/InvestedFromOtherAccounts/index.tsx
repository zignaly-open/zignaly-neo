import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useIsInvestedInService } from '../../../../apis/investment/use';
import ZModal from '../../../../components/ZModal';
import { Service } from '../../../../apis/service/types';
import {
  PriceLabel,
  Table,
  TextButton,
  Typography,
  UsdPriceLabel,
} from '@zignaly-open/ui';
import {
  useActiveExchange,
  useCurrentUser,
  useSelectExchange,
} from '../../../../apis/user/use';
import { Box } from '@mui/material';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';

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
        <Table
          columns={
            [
              {
                Header: t('other-accounts.account'),
                accessor: 'account',
              },
              {
                Header: t('other-accounts.invested'),
                accessor: 'invested',
                Cell: ({ cell: { value } }) =>
                  service.ssc === 'USDT' ? (
                    <UsdPriceLabel value={value} />
                  ) : (
                    <PriceLabel coin={service.ssc} value={value} />
                  ),
              },
              {
                Header: '',
                accessor: 'internalId',
                Cell: ({ cell: { value } }) =>
                  value === activeExchange.internalId ? (
                    <Typography color={'neutral500'}>
                      {t('other-accounts.active')}
                    </Typography>
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
                      onClick={() => selectExchange(value)}
                    />
                  ),
              },
            ] as TableProps<{
              account: string;
              invested: string;
              internalId: string;
            }>['columns']
          }
          data={allInvestedServices}
          hideOptionsButton={true}
          isUserTable={false}
        />
      </Box>
    </ZModal>
  );
}

export default InvestedFromOtherAccounts;
