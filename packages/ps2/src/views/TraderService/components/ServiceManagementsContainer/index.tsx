import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  EditPenIcon,
  ProgressSlider,
  TextButton,
  Typography,
} from '@zignaly-open/ui';
import {
  BottomContainer,
  Box,
  Circle,
  HorizontalConnection,
  InlinePriceLabel,
  LabelHardDisc,
  Layout,
  LineSeparator,
  MainPriceLabel,
  MiddleContainer,
  TopConnector,
  TopHorizontalConnection,
  TradingFunds,
} from './styles';

import BigNumber from 'bignumber.js';
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
    <Layout>
      <LayoutContentWrapper
        endpoint={endpoints}
        content={([service, management, balance]: [
          TraderServiceFull,
          TraderServiceManagement,
          TraderServiceBalance,
        ]) => (
          <>
            <Box>
              <Typography variant='h2' color='neutral100'>
                {t('totalFunds')}
              </Typography>
              <MainPriceLabel
                value={parseFloat(balance.sbt)}
                coin={service?.ssc ?? 'USDT'}
              />
            </Box>
            <TopConnector />
            <TopHorizontalConnection />
            <BottomContainer>
              <Box>
                <Circle />
                <Typography variant='h2' color='neutral100'>
                  {t('tradingFunds')}
                </Typography>
                <Typography color='neutral200'>
                  {t('tradingFunds-desc')}
                </Typography>
                <TradingFunds>
                  <Typography color='neutral400' variant='body2'>
                    {t('availableTrading')}
                    <InlinePriceLabel
                      value={parseFloat(balance.staSscFree)}
                      coin={service?.ssc ?? 'USDT'}
                    />
                  </Typography>
                  <Typography color='neutral400' variant='body2'>
                    {t('allocatedTrading')}
                    <InlinePriceLabel
                      value={parseFloat(balance.staSscSum)}
                      coin={service?.ssc ?? 'USDT'}
                    />
                  </Typography>
                </TradingFunds>
                <LabelHardDisc color='neutral200'>
                  {t('instantWithdrawn')}
                </LabelHardDisc>
                <ProgressSlider
                  value={new BigNumber(balance.debt.toString())
                    .dividedBy(new BigNumber(balance.sbt.toString()))
                    .toNumber()}
                  max={50}
                />
              </Box>
              <MiddleContainer>
                <ArrowLeftIcon
                  height={24}
                  width={24}
                  color={theme.palette.neutral600}
                />
                <HorizontalConnection />
                <Button
                  variant='secondary'
                  size='large'
                  caption={t('transfer.title')}
                  onClick={onClickTransfers}
                />
                <HorizontalConnection />
                <ArrowRightIcon
                  height={24}
                  width={24}
                  color={theme.palette.neutral600}
                />
              </MiddleContainer>
              <Box>
                <Circle />
                <Typography variant='h2' color='neutral100'>
                  {t('standbyFunds')}
                </Typography>
                <Typography color='neutral200'>
                  {t('standbyFunds-desc')}
                </Typography>
                <TradingFunds>
                  <Typography color='neutral400' variant='body2'>
                    {t('availableDisconnection')}
                    <InlinePriceLabel
                      value={parseFloat(balance.scaSscSum)}
                      coin={service?.ssc ?? 'USDT'}
                    />
                  </Typography>
                  <Typography color='neutral400' variant='body2'>
                    {t('neededSnapshot')}
                    <InlinePriceLabel
                      value={parseFloat(management.transferOut)}
                      coin={service?.ssc ?? 'USDT'}
                    />
                  </Typography>
                  <Typography color='neutral400' variant='body2'>
                    {t('minBalance.title')}
                    <InlinePriceLabel
                      value={parseFloat(management.minimumSca)}
                      coin={service?.ssc ?? 'USDT'}
                    />
                    <TextButton
                      leftElement={
                        <EditPenIcon
                          height={16}
                          width={16}
                          color={theme.palette.neutral300}
                        />
                      }
                      caption={t('action:edit')}
                      onClick={onClickMinBalance}
                    />
                  </Typography>
                  <LineSeparator />
                  <Typography color='neutral400' variant='body2'>
                    {t('heldHardDisc')}
                    <InlinePriceLabel
                      value={parseFloat(balance.dfa)}
                      coin={service?.ssc ?? 'USDT'}
                    />
                  </Typography>
                </TradingFunds>
              </Box>
            </BottomContainer>
            <ManagementHelper />
          </>
        )}
      />
    </Layout>
  );
}

export default ServiceManagementsContainer;
