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
  ZigSearch,
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
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { PageWithHeaderContainer } from '../styles';
import { useZModal } from '../../../../components/ZModal/use';
import InvestorEditFee from '../InvestorEditFee/InvestorEditFee';
import { getServiceTotalFee, getServiceZignalyFee } from '../../../../util/fee';
import { useToast } from '../../../../util/hooks/useToast';
import { useActiveExchange } from '../../../../apis/user/use';
import { ConnectionStateLabelId } from '../ConnectionStateLabel/types';

const ServiceInvestorsContainer: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { showModal } = useZModal();
  const investorsEndpoint = useTraderServiceInvestors(serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const managementEndpoint = useTraderServiceManagement(serviceId);

  const { data: service } = serviceDetailsEndpoint;

  const [searchFilter, setSearchFilter] = React.useState('');
  const theme = useTheme();
  const { t } = useTranslation('investors');
  const toast = useToast();
  const exchange = useActiveExchange();
  const columnHelper = createColumnHelper<Investor>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor('email', {
        header: t('tableHeader.email'),
        cell: ({
          getValue,
          row: {
            original: { account_id: accountId },
          },
        }) =>
          accountId === exchange.internalId ? (
            <Tooltip title={t('it-is-you')}>
              <ZigTypography>{getValue()}</ZigTypography>
            </Tooltip>
          ) : (
            getValue()
          ),
      }),
      columnHelper.accessor('userId', {
        header: t('tableHeader.userId'),
        cell: ({
          getValue,
          row: {
            original: { account_id: accountId },
          },
        }) =>
          accountId === exchange.internalId ? (
            <Tooltip title={t('it-is-you')}>
              <ZigTypography>{getValue()}</ZigTypography>
            </Tooltip>
          ) : (
            getValue()
          ),
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
      columnHelper.accessor((row) => +row.pnlNetAt, {
        header: t('tableHeader.P&LTotal'),
        id: 'pnlNetAt',
        cell: (props) => (
          <ZigTablePriceLabel
            coin={service?.ssc ?? 'USDT'}
            value={props.getValue()}
          />
        ),
      }),
      columnHelper.accessor((row) => +row.sfOwnerAt, {
        header: t('tableHeader.totalFeesPaid'),
        id: 'totalFeesPaid',
        cell: (props) => (
          <ZigTablePriceLabel
            coin={service?.ssc ?? 'USDT'}
            value={props.getValue()}
          />
        ),
      }),
      columnHelper.accessor(
        (row) =>
          getServiceTotalFee(
            row.ownerSuccessFee,
            row.account_id === exchange.internalId ||
              row.accountType === 'owner',
          ),
        {
          header: t('tableHeader.successFee'),
          id: 'ownerSuccessFee',
          cell: ({
            getValue,
            row: {
              original: {
                ownerSuccessFee,
                ownerSfDiscount,
                account_id: accountId,
              },
            },
          }) => (
            <Tooltip
              title={
                accountId === exchange.internalId
                  ? t('it-is-you-0-fee')
                  : t(
                      `success-fee-explainer${
                        ownerSfDiscount ? '-with-discount' : ''
                      }`,
                      {
                        discounted: ownerSuccessFee,
                        owner: ownerSuccessFee + ownerSfDiscount,
                        zignalyFee: getServiceZignalyFee(ownerSuccessFee),
                        discount: ownerSfDiscount,
                      },
                    )
              }
            >
              <ZigTypography>
                {getValue()}
                {/* eslint-disable-next-line i18next/no-literal-string */}
                {'%'}
              </ZigTypography>
            </Tooltip>
          ),
        },
      ),
      columnHelper.accessor('accountType', {
        header: t('tableHeader.status'),
        cell: (props) => <ConnectionStateLabel stateId={props.getValue()} />,
      }),
      columnHelper.accessor('actions', {
        header: '',
        enableSorting: false,
        cell: ({
          row: {
            original: {
              account_id: accountId,
              ownerSfDiscount,
              ownerSuccessFee,
              accountType,
            },
          },
        }) =>
          accountId !== exchange.internalId &&
          accountType !== ConnectionStateLabelId.DISCONNECTED &&
          accountType !== 'owner' && (
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
                  label: t('change-fee'),
                  onClick: () => {
                    if ((+service?.successFee || 0) > 0) {
                      showModal(InvestorEditFee, {
                        serviceId,
                        accountId,
                        ownerSuccessFee,
                        ownerSfDiscount,
                      });
                    } else {
                      toast.error(t('change-fee-modal.already-0'));
                    }
                  },
                },
              ]}
            />
          ),
      }),
    ];
  }, [service]);

  return (
    <LayoutContentWrapper
      unmountOnRefetch
      endpoint={[investorsEndpoint, managementEndpoint, serviceDetailsEndpoint]}
      content={([investors, management]: [
        Investor[],
        TraderServiceManagement,
      ]) => (
        <PageWithHeaderContainer>
          <InvestorCounts>
            <ZigUserIcon
              width={'17px'}
              height={'20px'}
              color={theme.palette.backgrounds.investorsIcon}
            />
            <ZigTypography variant={'h3'} color={'contrasting'}>
              {t('number-of-investors', {
                count: investors?.length,
              })}
            </ZigTypography>
            <ZigSearch value={searchFilter} onChange={setSearchFilter} />
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
            state={{ globalFilter: searchFilter }}
            getColumnCanGlobalFilter={(column) =>
              ['email', 'userId'].includes(column.id)
            }
          />
        </PageWithHeaderContainer>
      )}
    />
  );
};

export default ServiceInvestorsContainer;
