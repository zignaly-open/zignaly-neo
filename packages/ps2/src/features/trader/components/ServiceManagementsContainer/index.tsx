import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  EditPenIcon,
  Loader,
  ProgressSlider,
  TextButton,
  Typography,
} from '@zignaly-open/ui';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import {
  BottomContainer,
  Box,
  Center,
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
import { coinsToOperateServices } from '../../../../util/coins';
import {
  useTraderServiceBalance,
  useTraderServiceDetails,
  useTraderServiceManagement,
} from '../../use';

function ServiceManagementsContainer({ serviceId }: { serviceId: string }) {
  const theme = useTheme() as Theme;
  const { data: service, isLoading: isLoadingService } =
    useTraderServiceDetails(serviceId);
  const { data: management, isLoading: isLoadingManagement } =
    useTraderServiceManagement(serviceId);
  const { data: balance, isLoading: isLoadingBalance } =
    useTraderServiceBalance(serviceId);
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

  return (
    <Layout>
      {isLoadingManagement || isLoadingService || isLoadingBalance ? (
        <Center>
          <Loader
            color={'#fff'}
            width={'40px'}
            height={'40px'}
            ariaLabel={'Loading Profile'}
          />
        </Center>
      ) : (
        <>
          <Box>
            <Typography variant='h2' color='neutral100'>
              {t('management.totalFunds')}
            </Typography>
            <MainPriceLabel
              stableCoinOperative={checkStableCoinOperate}
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
                    value={parseFloat(balance.staSscFree)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                </Typography>
                <Typography color='neutral400' variant='body2'>
                  {t('management.allocatedTrading')}
                  <InlinePriceLabel
                    stableCoinOperative={checkStableCoinOperate}
                    value={parseFloat(balance.staSscSum)}
                    coin={service?.ssc ?? 'USDT'}
                  />
                </Typography>
              </TradingFunds>
              <LabelHardDisc color='neutral200'>
                {t('management.hardDisconnected')}
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
                    value={parseFloat(balance.scaSscSum)}
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
