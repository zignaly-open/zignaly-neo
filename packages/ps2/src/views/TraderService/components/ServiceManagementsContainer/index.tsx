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
  TraderServiceBalance,
  TraderServiceFull,
  TraderServiceManagement,
} from '../../../../apis/service/types';
import { useZModal } from '../../../../components/ZModal/use';
import { useTheme } from '@mui/material';

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

  return (
    <LayoutContentWrapper
      endpoint={endpoints}
      content={([service, management, balance]: [
        TraderServiceFull,
        TraderServiceManagement,
        TraderServiceBalance,
      ]) => (
        <Layout>
          <Box>
            <ZigTypography variant='h2' color='neutral100'>
              {t('totalFunds')}
            </ZigTypography>
            <ZigPriceLabel
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
              <ZigTypography variant='h2' color='neutral100'>
                {t('tradingFunds')}
              </ZigTypography>
              <ZigTypography color='neutral200'>
                {t('tradingFunds-desc')}
              </ZigTypography>
              <TradingFunds>
                <ZigTypography color='neutral400' variant='body2'>
                  {t('availableTrading')}
                  <InlinePriceLabel
                    value={parseFloat(balance.staSscFree)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                </ZigTypography>
                <ZigTypography color='neutral400' variant='body2'>
                  {t('allocatedTrading')}
                  <InlinePriceLabel
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
                id={'trader-service__transfer'}
                variant='outlined'
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
              <ZigTypography variant='h2' color='neutral100'>
                {t('standbyFunds')}
              </ZigTypography>
              <ZigTypography color='neutral200'>
                {t('standbyFunds-desc')}
              </ZigTypography>
              <TradingFunds>
                <ZigTypography color='neutral400' variant='body2'>
                  {t('availableWithdrawals')}
                  <InlinePriceLabel
                    value={parseFloat(balance.scaSscSum)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                </ZigTypography>
                <ZigTypography color='neutral400' variant='body2'>
                  {t('neededSnapshot')}
                  <InlinePriceLabel
                    value={parseFloat(management.transferOut)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                </ZigTypography>
                <ZigTypography color='neutral400' variant='body2'>
                  {t('minBalance.title')}
                  <InlinePriceLabel
                    value={parseFloat(management.minimumSca)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                  <ZigButton
                    sx={{ ml: 1.5 }}
                    variant={'text'}
                    id={'trader-service__edit'}
                    startIcon={<EditIcon />}
                    onClick={onClickMinBalance}
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
