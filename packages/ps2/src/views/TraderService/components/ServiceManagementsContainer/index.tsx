import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ZigArrowLeftIcon,
  ZigArrowRightIcon,
  ZigButton,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import EditIcon from '@mui/icons-material/Edit';
import {
  BottomContainer,
  Box,
  Circle,
  HorizontalConnection,
  InlinePriceLabel,
  Layout,
  MiddleContainer,
  TopConnector,
  TopHorizontalConnection,
  TradingFunds,
} from './styles';
import { Box as MuiBox } from '@mui/material';
import {
  useServiceDetails,
  useTraderServiceBalance,
  useTraderServiceManagement,
} from '../../../../apis/service/use';
import EditMinimumBalanceModal from '../EditMinimumBalanceModal';
import TransferFundsModal from '../TransferFundsModal';
import ManagementHelper from '../ManagementHelper';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import {
  Service,
  TraderServiceBalance,
  TraderServiceManagement,
} from '../../../../apis/service/types';
import { useZModal } from '../../../../components/ZModal/use';
import { Tooltip, useTheme } from '@mui/material';
import { servicesThatAllowKeyCreation } from '../../../../apis/service/constants';

function ServiceManagementsContainer({ serviceId }: { serviceId: string }) {
  const theme = useTheme();
  const endpoints = [
    useServiceDetails(serviceId),
    useTraderServiceManagement(serviceId),
    useTraderServiceBalance(serviceId),
  ];

  const { t } = useTranslation(['management', 'action']);
  const { showModal } = useZModal();

  const onClickTransfers = useCallback(() => {
    showModal(TransferFundsModal, {
      serviceId,
    });
  }, [serviceId]);

  const onClickMinBalance = () => {
    showModal(EditMinimumBalanceModal, {
      serviceId,
    });
  };

  const { exchange } = (endpoints[0]?.data || {}) as Service;
  const extraDisablePropsForEditButtons =
    servicesThatAllowKeyCreation?.includes(exchange)
      ? {}
      : {
          disabled: true,
          tooltip: t('no-api-key-management-in-this-exchange', {
            exchange,
          }),
        };

  return (
    <LayoutContentWrapper
      endpoint={endpoints}
      unmountOnRefetch
      content={([service, management, balance]: [
        Service,
        TraderServiceManagement,
        TraderServiceBalance,
      ]) => (
        <Layout>
          <Box>
            <ZigTypography
              variant='h2'
              color='neutral100'
              id={'service-manage-funds__total-funds-label'}
            >
              {t('totalFunds')}
            </ZigTypography>
            <ZigPriceLabel
              id={'service-manage-funds__total-funds'}
              variant={'bigNumber'}
              coinProps={{
                color: 'highlighted',
                variant: 'body1',
              }}
              value={parseFloat(balance.sbt)}
              coin={service?.ssc ?? 'USDT'}
            />
          </Box>
          <TopConnector />
          <TopHorizontalConnection />
          <BottomContainer>
            <Box>
              <Circle />
              <ZigTypography
                variant='h2'
                color='neutral100'
                id={'service-manage-funds__trading-funds-title'}
              >
                {t('tradingFunds')}
              </ZigTypography>
              <ZigTypography
                color='neutral200'
                id={'service-manage-funds__trading-funds-description'}
              >
                {t('tradingFunds-desc')}
              </ZigTypography>
              <TradingFunds>
                <ZigTypography
                  color='neutral400'
                  variant='body2'
                  id={
                    'service-manage-funds__trading-funds-available-trading-label'
                  }
                >
                  {t('availableTrading')}
                  <InlinePriceLabel
                    id={'service-manage-funds__trading-funds-available-trading'}
                    value={parseFloat(balance.staSscFree)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                </ZigTypography>
                <ZigTypography
                  color='neutral400'
                  variant='body2'
                  id={
                    'service-manage-funds__trading-funds-allocated-trading-label'
                  }
                >
                  {t('allocatedTrading')}
                  <InlinePriceLabel
                    id={'service-manage-funds__trading-funds-allocated-trading'}
                    value={parseFloat(balance.staSscSum)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                </ZigTypography>
              </TradingFunds>
              {/* <LabelHardDisc color='neutral200'>
                  {t('instantWithdrawn')}
                </LabelHardDisc>
                <ZigProgressBar
                  value={new BigNumber(balance.debt.toString())
                    .dividedBy(new BigNumber(balance.sbt.toString()))
                    .toNumber()}
                  max={50}
                /> */}
            </Box>
            <MiddleContainer>
              <ZigArrowLeftIcon
                height={24}
                width={24}
                color={theme.palette.neutral600}
              />
              <HorizontalConnection />
              <ZigButton
                id={'service-manage-funds__transfer'}
                variant='outlined'
                {...extraDisablePropsForEditButtons}
                size='large'
                onClick={onClickTransfers}
              >
                {t('transfer.title')}
              </ZigButton>
              <HorizontalConnection />
              <ZigArrowRightIcon
                height={24}
                width={24}
                color={theme.palette.neutral600}
              />
            </MiddleContainer>
            <Box>
              <Circle />
              <ZigTypography
                variant='h2'
                color='neutral100'
                id={'service-manage-funds__standby-funds-title'}
              >
                {t('standbyFunds')}
              </ZigTypography>
              <ZigTypography
                color='neutral200'
                id={'service-manage-funds__standby-funds-description'}
              >
                {t('standbyFunds-desc')}
              </ZigTypography>
              <TradingFunds>
                <ZigTypography
                  color='neutral400'
                  variant='body2'
                  id={
                    'service-manage-funds__standby-funds-available-withdrawals-label'
                  }
                >
                  {t('availableWithdrawals')}
                  <InlinePriceLabel
                    id={
                      'service-manage-funds__standby-funds-available-withdrawals'
                    }
                    value={parseFloat(balance.scaSscSum)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                </ZigTypography>

                <ZigTypography
                  color='neutral400'
                  variant='body2'
                  id={
                    'service-manage-funds__standby-funds-needed-snapshots-label'
                  }
                >
                  {t('neededSnapshot')}
                  <Tooltip
                    title={
                      <MuiBox sx={{ whiteSpace: 'nowrap' }}>
                        {t(
                          `${
                            management?.claims >= 0 ? 'positive' : 'negative'
                          }-claim`,
                          {
                            claim: Math.abs(management?.claims),
                            coin: service?.ssc ?? 'USDT',
                          },
                        )}
                      </MuiBox>
                    }
                  >
                    <div>
                      <InlinePriceLabel
                        id={
                          'service-manage-funds__standby-funds-needed-snapshots'
                        }
                        value={
                          management?.claims < 0
                            ? parseFloat((-management?.claims).toString())
                            : 0
                        }
                        coin={service?.ssc ?? 'USDT'}
                      />
                    </div>
                  </Tooltip>
                </ZigTypography>

                <ZigTypography
                  color='neutral400'
                  variant='body2'
                  id={'service-manage-funds__standby-funds-min-balance-label'}
                >
                  {t('minBalance.title')}
                  <InlinePriceLabel
                    id={'service-manage-funds__standby-funds-min-balance'}
                    value={parseFloat(management.minimumSca)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                  <ZigButton
                    sx={{ ml: 1.5 }}
                    variant={'text'}
                    id={'service-manage-funds__standby-funds-edit'}
                    startIcon={
                      <EditIcon sx={{ width: '12px', height: '12px' }} />
                    }
                    onClick={onClickMinBalance}
                    {...extraDisablePropsForEditButtons}
                  >
                    {t('action:edit')}
                  </ZigButton>
                </ZigTypography>
                {/* <LineSeparator />
                  <ZigTypography color='neutral400' variant='body2'>
                    {t('heldInstantWithdrawals')}
                    <InlinePriceLabel
                      value={parseFloat(balance.dfa)}
                      coin={service?.ssc ?? 'USDT'}
                    />
                  </ZigTypography> */}
              </TradingFunds>
            </Box>
          </BottomContainer>
          <ManagementHelper />
        </Layout>
      )}
    />
  );
}

export default ServiceManagementsContainer;
