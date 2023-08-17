import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { InvestorCounts } from './styles';
import {
  ZigUserIcon,
  ZigTypography,
  ChangeIndicator,
  ZigTable,
  createColumnHelper,
  ZigTablePriceLabel,
  ZigDropdown,
  ZigDotsVerticalIcon,
  dark,
} from '@zignaly-open/ui';
import {
  useTraderServiceInvestors,
  useServiceDetails,
  useTraderServiceManagement,
} from '../../../../apis/service/use';
import {
  Investor,
  TraderServiceManagement,
} from '../../../../apis/service/types';
import ConnectionStateLabel from '../ConnectionStateLabel';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { Box, IconButton } from '@mui/material';
import { TraderServicePageContainer } from '../styles';
import { useZModal } from '../../../../components/ZModal/use';
import InvestorEditFee from '../InvestorEditFee/InvestorEditFee';

const ServiceInvestorsContainer: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { showModal } = useZModal();
  const investorsEndpoint = useTraderServiceInvestors(serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const managementEndpoint = useTraderServiceManagement(serviceId);

  const { data: service } = serviceDetailsEndpoint;

  const { t } = useTranslation('investors');

  const columnHelper = createColumnHelper<Investor & { successFee: string }>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('email', {
        header: t('tableHeader.email'),
      }),
      columnHelper.accessor('userId', {
        header: t('tableHeader.userId'),
      }),
      columnHelper.accessor((row) => new BigNumber(row.invested).toNumber(), {
        header: () => (
          <Box display={'flex'} flexDirection={'column'}>
            {t('tableHeader.invested')}
            <Box fontSize={'12px'} color={'neutral300'}>
              {t('tableHeader.pending')}
            </Box>
          </Box>
        ),
        id: 'investment',
        cell: (props) => (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <ZigTablePriceLabel
              coin={service?.ssc ?? 'USDT'}
              value={props.getValue()}
            />
            <ZigTablePriceLabel
              showApproximate
              variant={'body2'}
              coin={service?.ssc ?? 'USDT'}
              value={props.row.original.pending}
              color={'neutral300'}
            />
          </Box>
        ),
      }),
      columnHelper.accessor('pnlNetLc', {
        header: t('tableHeader.P&L'),
        cell: (props) => (
          <>
            <ZigTablePriceLabel
              coin={service?.ssc ?? 'USDT'}
              value={parseFloat(props.getValue())}
            />
            <ChangeIndicator value={props.row.original.pnlPctLc} />
          </>
        ),
      }),
      columnHelper.accessor('pnlNetAt', {
        header: t('tableHeader.P&LTotal'),
        cell: (props) => (
          <ZigTablePriceLabel
            coin={service?.ssc ?? 'USDT'}
            value={parseFloat(props.getValue())}
          />
        ),
      }),
      columnHelper.accessor('sfOwnerAt', {
        header: t('tableHeader.totalFeesPaid'),
        cell: (props) => (
          <ZigTablePriceLabel
            coin={service?.ssc ?? 'USDT'}
            value={parseFloat(props.getValue())}
          />
        ),
      }),
      columnHelper.accessor('successFee', {
        header: t('tableHeader.successFee'),
        cell: (props) => `${props.getValue()}%`,
      }),
      columnHelper.accessor('accountType', {
        header: t('tableHeader.status'),
        cell: (props) => <ConnectionStateLabel stateId={props.getValue()} />,
      }),
      columnHelper.accessor('actions', {
        header: '',
        enableSorting: false,
        cell: () => (
          <ZigDropdown
            component={() => (
              <IconButton>
                <ZigDotsVerticalIcon
                  color={dark.neutral200}
                  height={16}
                  width={16}
                />
              </IconButton>
            )}
            options={[
              {
                label: t('change-fee'),
                onClick: () =>
                  showModal(InvestorEditFee, {
                    serviceId,
                  }),
              },
            ]}
          />
        ),
      }),
    ];
  }, []);

  return (
    <LayoutContentWrapper
      endpoint={[investorsEndpoint, managementEndpoint, serviceDetailsEndpoint]}
      content={([investors, management]: [
        Investor[],
        TraderServiceManagement,
      ]) => (
        <TraderServicePageContainer>
          <InvestorCounts>
            <ZigUserIcon width={'17px'} height={'20px'} color={'#65647E'} />
            <ZigTypography variant={'h3'} color={'almostWhite'}>
              {t('number-of-investors', {
                count: investors?.length,
              })}
            </ZigTypography>
          </InvestorCounts>

          <ZigTable
            prefixId={'investor'}
            columns={columns}
            data={investors.map((inv) => ({
              ...inv,
              successFee:
                inv.accountType === 'owner' ? '0' : management.successFee,
            }))}
            emptyMessage={t('no-investors')}
            enableSortingRemoval={false}
          />
        </TraderServicePageContainer>
      )}
    />
  );
};

export default ServiceInvestorsContainer;
