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
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import OtherAccountsButton from './OtherAccountsButton';
import { Box } from '@mui/material';
import ChooseDepositTypeModal from 'views/Dashboard/components/ManageInvestmentModals/ChooseDepositTypeModal';

const InvestButton: React.FC<{
  prefixId?: string;
  service: Service;
  ctaId?: string;
  showMultipleAccountButton?: boolean;
}> = ({ prefixId, service, ctaId, showMultipleAccountButton }) => {
  const { t } = useTranslation([
    'service',
    // we need these two otherwise a Suspense will trigger when we load the other ns
    // and the page will scroll to top
    'purchase-deposit-crypto',
    'deposit-crypto',
  ]);
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
        showModal(ChooseDepositTypeModal, {
          selectedCoin: service.ssc,
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
  const maxReached = +service.invested + service.pending >= service.maximumSbt;

  return (
    <>
      <ZigButton
        id={prefixId && `${prefixId}__invest-${service.id}`}
        onClick={onClickMakeInvestment}
        loading={needsToOpenWhenBalancesLoaded && isFetching}
        variant='contained'
        size={'large'}
        disabled={maxReached}
        sx={{ flexDirection: 'column', minWidth: 165 }}
        tooltip={maxReached ? t('invest-button.max-reached-tooltip') : null}
      >
        <>
          <ZigTypography
            variant='body2'
            color='neutral000'
            fontWeight={600}
            letterSpacing={1.1}
          >
            {t(
              maxReached
                ? 'invest-button.max-reached'
                : 'invest-button.invest-now',
            )}
          </ZigTypography>
          {!maxReached && (
            <ZigTypography variant={'h5'} color='neutral150' fontWeight={500}>
              {t('invest-button.x-success-fee', {
                fee: service.successFee,
              })}
            </ZigTypography>
          )}
        </>
      </ZigButton>

      {showOtherAccounts && (
        <Box sx={{ pt: 0.5, textAlign: 'center' }}>
          <OtherAccountsButton service={service} />
        </Box>
      )}
    </>
  );
};

export default InvestButton;
