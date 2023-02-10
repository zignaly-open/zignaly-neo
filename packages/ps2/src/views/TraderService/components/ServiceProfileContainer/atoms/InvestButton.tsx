import React, { useEffect, useState } from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from '../../../../../apis/user/use';
import { useZModal } from '../../../../../components/ZModal/use';
import {
  useCurrentBalance,
  useInvestedAccountsCount,
  useSetSelectedInvestment,
} from '../../../../../apis/investment/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { serviceToInvestmentServiceDetail } from '../../../../../apis/investment/util';
import InvestModal from '../../../../Dashboard/components/ManageInvestmentModals/InvestModal';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../../../../routes';
import { InvestButtonSubtext, InvestButtonWrap } from '../styles';
import { Button } from '@zignaly-open/ui';
import DepositModal from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';
import OtherAccountsButton from './OtherAccountsButton';
import { Box } from '@mui/material';

const InvestButton: React.FC<{
  id?: string;
  service: Service;
  ctaId?: string;
  showMultipleAccountButton?: boolean;
}> = ({ id, service, ctaId, showMultipleAccountButton }) => {
  const { t } = useTranslation('service');
  const isAuthenticated = useIsAuthenticated();
  const { showModal } = useZModal({ disableAutoDestroy: true });
  const selectInvestment = useSetSelectedInvestment();
  const navigate = useNavigate();
  const { balance, isFetching } = useCurrentBalance(service.ssc);
  const location = useLocation();
  const investedFromAccounts = useInvestedAccountsCount(service.id, {
    skip: !showMultipleAccountButton,
  });
  const [needsToOpenWhenBalancesLoaded, setNeedsToOpenWhenBalancesLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    if (needsToOpenWhenBalancesLoaded && !isFetching) {
      setNeedsToOpenWhenBalancesLoaded(false);
      onClickMakeInvestment();
    }
  }, [needsToOpenWhenBalancesLoaded, isFetching]);

  const onClickMakeInvestment = () => {
    if (isAuthenticated) {
      if (isFetching) {
        setNeedsToOpenWhenBalancesLoaded(true);
        return;
      }
      selectInvestment(serviceToInvestmentServiceDetail(service));
      const showDeposit = +balance === 0;
      if (showDeposit)
        showModal(DepositModal, {
          allowedCoins: [service.ssc],
          ctaId,
        });
      else showModal(InvestModal, { ctaId });
    } else {
      const newUser = !localStorage.getItem('hasLoggedIn');
      navigate(newUser ? ROUTE_SIGNUP : ROUTE_LOGIN, {
        state: { redirectTo: location },
      });
    }
  };

  const showOtherAccounts =
    investedFromAccounts > 1 && showMultipleAccountButton;

  return (
    <>
      <InvestButtonWrap>
        <Button
          id={id}
          onClick={onClickMakeInvestment}
          loading={needsToOpenWhenBalancesLoaded && isFetching}
          caption={t('invest-button.invest-now')}
          bottomElement={
            <InvestButtonSubtext
              variant={'h5'}
              color='neutral150'
              fontWeight='regular'
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

      {showOtherAccounts && (
        <Box sx={{ pt: 0.5, textAlign: 'center' }}>
          <OtherAccountsButton service={service} />
        </Box>
      )}
    </>
  );
};

export default InvestButton;
