import React from 'react';
import { Service } from '../../../../apis/service/types';
import {
  Button,
  PencilIcon,
  PriceLabel,
  TextButton,
  Typography,
  UsdPriceLabel,
} from '@zignaly-open/ui';
import theme from 'theme';
import { Trans, useTranslation } from 'react-i18next';
import {
  BigNumberWrapper,
  GreySubHeader,
  GreySubHeaderHighlight,
  InvestButtonContainer,
  InvestButtonSubtext,
  Separator,
  ServiceHeader,
  StyledCalendarMonthIcon,
  StyledPersonIcon,
  LiquidatedLabel as LiquidatedLabelElement,
  InvestButtonWrap,
  StyledVerifiedIcon,
  LinkIconWithSafariFix,
} from './styles';
import { formatDistance } from 'date-fns';
import copy from 'copy-to-clipboard';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_TRADING_SERVICE } from '../../../../routes';
import { useToast } from '../../../../util/hooks/useToast';
import { Box, useMediaQuery } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  useCurrentBalance,
  useIsInvestedInService,
  useSetSelectedInvestment,
} from '../../../../apis/investment/use';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import InvestedFromOtherAccounts from '../InvestedFromOtherAccounts';
import { serviceToInvestmentServiceDetail } from '../../../../apis/investment/util';
import EditInvestmentModal from '../../../Dashboard/components/ManageInvestmentModals/EditInvestmentModal';
import InvestModal from '../../../Dashboard/components/ManageInvestmentModals/InvestModal';
import {
  useIsAuthenticated,
  useSetMissedRoute,
} from '../../../../apis/user/use';
import DepositModal from '../../../Dashboard/components/ManageInvestmentModals/DepositModal';

export const InvestButton: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { t } = useTranslation('service');
  const isAuthenticated = useIsAuthenticated();
  const { showModal } = useModal();
  const selectInvestment = useSetSelectedInvestment();
  const navigate = useNavigate();
  const setMissedRoute = useSetMissedRoute();
  const { balance } = useCurrentBalance(service.ssc);

  const onClickMakeInvestment = () => {
    if (isAuthenticated) {
      selectInvestment(serviceToInvestmentServiceDetail(service));
      const showDeposit = +balance === 0;
      const modal: ShowFnOutput<void> = showModal(
        showDeposit ? DepositModal : InvestModal,
        {
          close: () => modal.hide(),
          ...(showDeposit
            ? {
                allowedCoins: [service.ssc],
              }
            : {}),
        },
      );
    } else {
      setMissedRoute();
      navigate(ROUTE_LOGIN);
    }
  };

  return (
    <InvestButtonWrap>
      <Button
        onClick={onClickMakeInvestment}
        caption={t('invest-button.invest-now')}
        bottomElement={
          <InvestButtonSubtext
            variant={'h5'}
            color='neutral150'
            weight='regular'
          >
            {t('invest-button.x-success-fee', {
              fee: service.successFee,
            })}
          </InvestButtonSubtext>
        }
        variant={'primary'}
        size={'xlarge'}
      />
    </InvestButtonWrap>
  );
};

export const OtherAccountsButton: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { t } = useTranslation('service');
  const { showModal } = useModal();
  const isInvested = useIsInvestedInService(service.id);

  const onClickViewOther = () => {
    const modal: ShowFnOutput<void> = showModal(InvestedFromOtherAccounts, {
      close: () => modal.hide(),
      service,
    });
  };

  return (
    <Box mt={2} textAlign={'center'}>
      <Button
        caption={t('invest-button.all-accounts', {
          count: Object.values(isInvested.accounts || {})?.length,
        })}
        variant={'secondary'}
        onClick={onClickViewOther}
        rightElement={<ChevronRightIcon color={'neutral300'} />}
      />
    </Box>
  );
};

export const InvestedButton: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { showModal } = useModal();
  const selectInvestment = useSetSelectedInvestment();

  const onClickEditInvestment = () => {
    selectInvestment(serviceToInvestmentServiceDetail(service));
    const modal: ShowFnOutput<void> = showModal(EditInvestmentModal, {
      close: () => {
        modal.hide();
      },
    });
  };

  const { investedAmount } = useIsInvestedInService(service.id);
  const { t } = useTranslation(['service', 'action']);
  return (
    <InvestButtonContainer>
      <Typography variant={'body2'} color='neutral200'>
        {t('invested-label')}
      </Typography>
      <BigNumber ssc={service.ssc} value={investedAmount} green />
      <TextButton
        leftElement={<PencilIcon color='#65647E' width={16} height={16} />}
        caption={t('action:edit')}
        color={'links'}
        onClick={onClickEditInvestment}
      />
    </InvestButtonContainer>
  );
};

export const LiquidatedLabel: React.FC = () => {
  const { t } = useTranslation('service');
  return (
    <LiquidatedLabelElement sx={{ p: 2.5 }}>
      <Typography
        weight={'demibold'}
        variant={'buttonxl'}
        color='redGraphOrError'
      >
        {t('liquidated')}
      </Typography>
    </LiquidatedLabelElement>
  );
};

export const BigNumber: React.FC<{
  ssc?: string;
  green?: boolean;
  red?: boolean;
  value: string;
}> = ({ ssc, green = false, red = false, value }) => {
  return (
    <BigNumberWrapper>
      {ssc === 'USDT' && (
        <UsdPriceLabel value={value} green={green} red={red} />
      )}
      {ssc && ssc !== 'USDT' && (
        <PriceLabel coin={ssc} value={value} green={green} red={red} />
      )}
      {!ssc && (
        <PriceLabel
          hideCoinName
          coin={ssc}
          value={value}
          green={green}
          red={red}
        />
      )}
    </BigNumberWrapper>
  );
};

export const ServiceInformation: React.FC<{
  service?: Service;
}> = ({ service }) => {
  const toast = useToast();
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('service');
  return (
    <>
      <ServiceHeader component={'h1'}>{service.name}</ServiceHeader>
      <Box
        sx={{
          flexDirection: md ? 'row' : 'column',
          display: 'flex',
          alignItems: 'center',
          paddingRight: md ? 3 : 0,
        }}
      >
        <GreySubHeader component={md ? 'span' : 'p'}>
          <StyledPersonIcon />
          <Trans
            t={t}
            i18nKey={'service-by'}
            components={[<GreySubHeaderHighlight key={'--service--by'} />]}
            values={{ name: service.ownerName }}
          />
          {service.ownerVerified && (
            <StyledVerifiedIcon width={13} height={13} />
          )}
        </GreySubHeader>
        {md && <Separator />}
        <GreySubHeader component={md ? 'span' : 'p'}>
          <StyledCalendarMonthIcon />
          <Trans
            t={t}
            i18nKey={'service-age'}
            values={{
              date: formatDistance(new Date(), new Date(service.createdAt)),
            }}
            components={[<GreySubHeaderHighlight key={'--service--by'} />]}
          />
        </GreySubHeader>
        {md ? <Separator /> : <Box mt={2} />}
        <Button
          minWidth={30}
          onClick={() => {
            copy(
              window.location.origin +
                generatePath(ROUTE_TRADING_SERVICE, {
                  serviceId: service.id,
                }),
            );
            toast.success(t('link-copied'));
          }}
          leftElement={
            md ? null : (
              <LinkIconWithSafariFix
                style={{ width: '13px', height: '13px' }}
                color='neutral300'
                width={13}
                height={13}
              />
            )
          }
          size={'xsmall'}
          variant={'secondary'}
          caption={
            md ? (
              <LinkIconWithSafariFix
                color='neutral300'
                width={13}
                height={13}
              />
            ) : (
              t('copy-link')
            )
          }
        />
      </Box>
    </>
  );
};
