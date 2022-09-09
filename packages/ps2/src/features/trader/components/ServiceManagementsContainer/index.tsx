import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import {
  TextButton,
  Typography,
  EditPenIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Loader,
  ProgressSlider,
  Button,
} from '@zignaly-open/ui';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import {
  Box,
  Circle,
  Layout,
  TopConnector,
  TradingFunds,
  LabelHardDisc,
  MainPriceLabel,
  BottomContainer,
  MiddleContainer,
  InlinePriceLabel,
  HorizontalConnection,
  TopHorizontalConnection,
  LineSeparator,
  Center,
} from './styles';

import { ServiceManagementsContainerProps } from './types';

import BigNumber from 'bignumber.js';
import { coinsToOperateServices } from '../../../../util/coins';

function ServiceManagementsContainer({
  serviceId,
  balances,
  management,
  service,
  isLoading = true,
}: ServiceManagementsContainerProps) {
  const theme = useTheme() as Theme;
  const { t } = useTranslation(['management', 'action']);
  const dispatch = useDispatch();

  const onClickTransfers = useCallback(() => {
    // dispatch(
    //   openModal(modalsIds.TRANSFER_OWNER_MANAGE_FUND, {
    //     serviceId,
    //   }),
    // );
  }, [dispatch, serviceId]);

  const onClickMinBalance = useCallback(() => {
    // dispatch(
    //   openModal(modalsIds.MIN_BALANCE_MODAL, {
    //     serviceId,
    //   }),
    // );
  }, [dispatch, serviceId]);

  const checkStableCoinOperate = useMemo(
    () => coinsToOperateServices.stableCoins.includes(service?.ssc ?? 'USDT'),
    [service?.ssc],
  );

  const renderView = () => (
    <>
      <Box>
        <Typography variant='h2' color='neutral100'>
          {t('management.totalFunds')}
        </Typography>
        <MainPriceLabel
          stableCoinOperative={checkStableCoinOperate}
          value={parseFloat(balances.sbt)}
          coin={service?.ssc ?? 'USDT'}
        />
      </Box>
      <TopConnector />
      <TopHorizontalConnection />
      <BottomContainer>
        <Box>
          <Circle />
          <Typography variant='h2' color='neutral100'>
            {t('management.tradingFunds')}
          </Typography>
          <Typography color='neutral200'>
            {t('management.tradingFunds-desc')}
          </Typography>
          <TradingFunds>
            <Typography color='neutral400' variant='body2'>
              {t('management.availableTrading')}
              <InlinePriceLabel
                stableCoinOperative={checkStableCoinOperate}
                value={parseFloat(balances.staSscFree)}
                coin={service?.ssc ?? 'USDT'}
              />
            </Typography>
            <Typography color='neutral400' variant='body2'>
              {t('management.allocatedTrading')}
              <InlinePriceLabel
                stableCoinOperative={checkStableCoinOperate}
                value={parseFloat(balances.staSscSum)}
                coin={service?.ssc ?? 'USDT'}
              />
            </Typography>
          </TradingFunds>
          <LabelHardDisc color='neutral200'>
            {t('management.hardDisconnected')}
          </LabelHardDisc>
          <ProgressSlider
            value={new BigNumber(balances.debt.toString())
              .dividedBy(new BigNumber(balances.sbt.toString()))
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
            caption={t('management.transfer.title')}
            onClick={onClickTransfers}
          />
          <HorizontalConnection />
          <ArrowRightIcon height={24} width={24} color={theme.neutral600} />
        </MiddleContainer>
        <Box>
          <Circle />
          <Typography variant='h2' color='neutral100'>
            {t('management.disconnectionFunds')}
          </Typography>
          <Typography color='neutral200'>
            {t('management.disconnectionFunds-desc')}
          </Typography>
          <TradingFunds>
            <Typography color='neutral400' variant='body2'>
              {t('management.availableDisconnection')}
              <InlinePriceLabel
                stableCoinOperative={checkStableCoinOperate}
                value={parseFloat(balances.scaSscSum)}
                coin={service?.ssc ?? 'USDT'}
              />
            </Typography>
            <Typography color='neutral400' variant='body2'>
              {t('management.neededSnapshot')}
              <InlinePriceLabel
                stableCoinOperative={checkStableCoinOperate}
                value={parseFloat(management.transferOut)}
                coin={service?.ssc ?? 'USDT'}
              />
            </Typography>
            <Typography color='neutral400' variant='body2'>
              {t('management.minBalance.title')}
              <InlinePriceLabel
                stableCoinOperative={checkStableCoinOperate}
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
              {t('management.heldHardDisc')}
              <InlinePriceLabel
                stableCoinOperative={checkStableCoinOperate}
                value={parseFloat(balances.dfa)}
                coin={service?.ssc ?? 'USDT'}
                coinType='not-margin'
              />
            </Typography>
          </TradingFunds>
        </Box>
      </BottomContainer>
    </>
  );

  return (
    <Layout>
      {balances &&
      Object.keys(balances).length > 0 &&
      management &&
      Object.keys(management).length > 0 &&
      service &&
      Object.keys(service).length > 0 ? (
        renderView()
      ) : isLoading ? (
        <Center>
          <Loader
            color={'#fff'}
            width={'40px'}
            height={'40px'}
            ariaLabel={'Loading Profile'}
          />
        </Center>
      ) : (
        renderView()
      )}
    </Layout>
  );
}

export default ServiceManagementsContainer;
