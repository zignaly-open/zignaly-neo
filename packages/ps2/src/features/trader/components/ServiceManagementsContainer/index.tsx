import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  EditPenIcon,
  ProgressSlider,
  TextButton,
  Typography,
} from '@zignaly-open/ui';
import Theme from '@zignaly-open/ui/lib/theme/theme';
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
  useTraderServiceBalance,
  useServiceDetails,
  useTraderServiceManagement,
} from '../../use';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import EditMinimumBalanceModal from '../EditMinimumBalanceModal';
import TransferFundsModal from '../TransferFundsModal';
import CenteredLoader from '../../../../components/CenteredLoader';

function ServiceManagementsContainer({ serviceId }: { serviceId: string }) {
  const theme = useTheme() as Theme;
  const { data: service, isFetching: isLoadingService } =
    useServiceDetails(serviceId);
  const { data: management, isFetching: isLoadingManagement } =
    useTraderServiceManagement(serviceId);
  const { data: balance, isFetching: isLoadingBalance } =
    useTraderServiceBalance(serviceId);
  const { t } = useTranslation(['management', 'action']);
  const { showModal } = useModal();

  const onClickTransfers = useCallback(() => {
    const modal: ShowFnOutput<void> = showModal(TransferFundsModal, {
      serviceId,
      close: () => modal.hide(),
    });
  }, [serviceId]);

  const onClickMinBalance = () => {
    const modal: ShowFnOutput<void> = showModal(EditMinimumBalanceModal, {
      serviceId,
      close: () => modal.hide(),
    });
  };

  return (
    <Layout>
      {isLoadingManagement || isLoadingService || isLoadingBalance ? (
        <CenteredLoader />
      ) : (
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
                {t('hardDisconnected')}
              </LabelHardDisc>
              <ProgressSlider
                value={new BigNumber(balance.debt.toString())
                  .dividedBy(new BigNumber(balance.sbt.toString()))
                  .toNumber()}
                max={50}
              />
            </Box>
            <MiddleContainer>
              <ArrowLeftIcon height={24} width={24} color={theme.neutral600} />
              <HorizontalConnection />
              <Button
                variant='secondary'
                size='large'
                caption={t('transfer.title')}
                onClick={onClickTransfers}
              />
              <HorizontalConnection />
              <ArrowRightIcon height={24} width={24} color={theme.neutral600} />
            </MiddleContainer>
            <Box>
              <Circle />
              <Typography variant='h2' color='neutral100'>
                {t('disconnectionFunds')}
              </Typography>
              <Typography color='neutral200'>
                {t('disconnectionFunds-desc')}
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
                        color={theme.neutral300}
                      />
                    }
                    caption={t('action:action.edit')}
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
        </>
      )}
    </Layout>
  );
}

export default ServiceManagementsContainer;
