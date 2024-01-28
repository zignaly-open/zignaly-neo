import React, { useCallback, useMemo } from 'react';
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
  downloadTableCsv,
  ZigButton,
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
import {
  ConnectionStateLabelId,
  connectionStateName,
} from '../ConnectionStateLabel/types';
import { OpenInNew } from '@mui/icons-material';

const ServiceInvestorsContainer: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const { showModal } = useZModal();
  const investorsEndpoint = useTraderServiceInvestors(serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const managementEndpoint = useTraderServiceManagement(serviceId);

  const { data: service } = serviceDetailsEndpoint;
  const exchange = useActiveExchange();
  const exporter = useCallback(
    (investors: Investor[]) =>
      downloadTableCsv(
        investors.map((r) => [
          r.email,
          r.userId,
          service?.ssc,
          r.invested,
          r.pnlNetLc,
          r.pnlPctLc,
          r.pnlNetAt,
          r.sfOwnerAt,
          getServiceTotalFee(
            r.ownerSuccessFee,
            service?.zglySuccessFee || 0,
            r.account_id === exchange?.internalId || r.accountType === 'owner',
          ),
          t(connectionStateName[r.accountType]),
        ]),
        [
          t('tableHeader.email'),
          t('tableHeader.userId'),
          t('common:coin'),
          t('tableHeader.invested'),
          t('tableHeader.P&L'),
          t('tableHeader.P&L-percent'),
          t('tableHeader.P&LTotal'),
          t('tableHeader.totalFeesPaid'),
          t('tableHeader.successFee'),
          t('tableHeader.status'),
        ],
        `Investors ${service.name}.csv`,
      ),
    [service],
  );

  const [searchFilter, setSearchFilter] = React.useState('');
  const theme = useTheme();
  const { t } = useTranslation('investors');
  const toast = useToast();
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
          accountId === exchange?.internalId ? (
            <Tooltip title={t('it-is-you')}>
              <ZigTypography id={`service-investors-table__email-${accountId}`}>
                {getValue()}
              </ZigTypography>
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
          accountId === exchange?.internalId ? (
            <Tooltip title={t('it-is-you')}>
              <ZigTypography
                id={`service-investors-table__userId-${accountId}`}
              >
                {getValue()}
              </ZigTypography>
            </Tooltip>
          ) : (
            getValue()
          ),
        sortingFn: 'basic',
      }),
      columnHelper.accessor((row) => new BigNumber(row.invested).toNumber(), {
        header: () => (
          <Box
            display={'flex'}
            flexDirection={'column'}
            id={`service-investors-table__header-invested`}
          >
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
              id={`service-investors-table__invested-${props.row.original.account_id}`}
              coin={service?.ssc ?? 'USDT'}
              value={props.getValue()}
            />
            <ZigTablePriceLabel
              id={`service-investors-table__pending-${props.row.original.account_id}`}
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
              id={`service-investors-table__p&l-${props.row.original.account_id}`}
              coin={service?.ssc ?? 'USDT'}
              value={parseFloat(props.getValue())}
            />
            <ChangeIndicator
              value={props.row.original.pnlPctLc}
              id={`service-investors-table__p&l-change-${props.row.original.account_id}`}
            />
          </>
        ),
      }),
      columnHelper.accessor((row) => +row.pnlNetAt, {
        header: t('tableHeader.P&LTotal'),
        id: 'pnlNetAt',
        cell: (props) => (
          <ZigTablePriceLabel
            id={`service-investors-table__p&l-total-${props.row.original.account_id}`}
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
            id={`service-investors-table__total-fees-${props.row.original.account_id}`}
            coin={service?.ssc ?? 'USDT'}
            value={props.getValue()}
          />
        ),
      }),
      columnHelper.accessor(
        (row) =>
          getServiceTotalFee(
            row.ownerSuccessFee,
            service?.zglySuccessFee,
            row.account_id === exchange?.internalId ||
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
              componentsProps={{ tooltip: { sx: { maxWidth: '310px' } } }}
              title={
                <Box whiteSpace={'nowrap'}>
                  {accountId === exchange?.internalId
                    ? t('it-is-you-0-fee')
                    : t(
                        `success-fee-explainer${
                          ownerSfDiscount
                            ? !ownerSuccessFee
                              ? '-max-discounted'
                              : '-with-discount'
                            : ''
                        }`,
                        {
                          discounted: ownerSuccessFee,
                          owner: ownerSuccessFee + ownerSfDiscount,
                          serviceTotal: service?.successFee,
                          zignalyFee: getServiceZignalyFee(
                            ownerSuccessFee,
                            service?.zglySuccessFee,
                          ),
                          discount: ownerSfDiscount,
                        },
                      )}
                </Box>
              }
            >
              <ZigTypography
                id={`service-investors-table__success-fee-${accountId}`}
              >
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
        cell: (props) => (
          <ConnectionStateLabel
            id={`service-investors-table__status-${props.row.original.account_id}`}
            stateId={props.getValue()}
          />
        ),
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
          accountId !== exchange?.internalId &&
          accountType !== ConnectionStateLabelId.DISCONNECTED &&
          accountType !== 'owner' && (
            <ZigDropdown
              component={() => (
                <IconButton
                  sx={{ mr: '-4px' }}
                  id={`service-investors-table__show-menu-button-${accountId}`}
                >
                  <ZigDotsVerticalIcon
                    color={theme.palette.neutral200}
                    height={16}
                    width={16}
                  />
                </IconButton>
              )}
              options={[
                {
                  label: (
                    <span
                      id={`service-investors-table__menu-edit-fee-${accountId}`}
                    >
                      {t('change-fee')}
                    </span>
                  ),
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
      ]) => {
        const processedInvestorsList = investors.map((inv) => ({
          ...inv,
          successFee: inv.accountType === 'owner' ? '0' : management.successFee,
        }));

        return (
          <PageWithHeaderContainer>
            <InvestorCounts>
              <ZigUserIcon
                width={'17px'}
                height={'20px'}
                color={theme.palette.backgrounds.investorsIcon}
                id={`service-investors__investors-number-icon`}
              />
              <ZigTypography
                variant={'h3'}
                color={'contrasting'}
                id={`service-investors__investors-number`}
              >
                {t('number-of-investors', {
                  count: investors?.length,
                })}
              </ZigTypography>
              <Box
                display={'flex'}
                flex={1}
                justifyContent={'flex-end'}
                gap={2}
              >
                <ZigSearch
                  value={searchFilter}
                  onChange={setSearchFilter}
                  id={`service-investors__search`}
                />

                <ZigButton
                  id={`service-investors__export`}
                  onClick={() => exporter(processedInvestorsList)}
                  variant={'text'}
                  sx={{
                    '.MuiSvgIcon-root.MuiSvgIcon-root': {
                      fill: theme.palette.links,
                    },
                  }}
                  endIcon={
                    <OpenInNew sx={{ width: '17.33px', height: '17.33px' }} />
                  }
                >
                  {t('action:export')}
                </ZigButton>
              </Box>
            </InvestorCounts>

            <ZigTable
              prefixId={'investors'}
              columns={columns}
              data={processedInvestorsList}
              emptyMessage={t('no-investors')}
              enableSortingRemoval={false}
              state={{ globalFilter: searchFilter }}
              getColumnCanGlobalFilter={(column) =>
                ['email', 'userId'].includes(column.id)
              }
            />
          </PageWithHeaderContainer>
        );
      }}
    />
  );
};

export default ServiceInvestorsContainer;
