import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from '../../../../../apis/user/use';
import {
  useCurrentBalance,
  useInvestedAccountsCount,
} from '../../../../../apis/investment/use';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../../../../routes';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import OtherAccountsButton from './OtherAccountsButton';
import { Box } from '@mui/material';
import { useOpenInvestDepositModal } from 'views/Dashboard/components/ManageInvestmentModals/InvestDepositModal';

const InvestButton: React.FC<{
  prefixId?: string;
  service: Service;
  modalRoute?: string;
  showMultipleAccountButton?: boolean;
}> = ({ prefixId, modalRoute, service, showMultipleAccountButton }) => {
  const { t } = useTranslation([
    'service',
    // we need these two otherwise a Suspense will trigger when we load the other ns
    // and the page will scroll to top
    'deposit-crypto',
    'edit-investment',
  ]);
  const isAuthenticated = useIsAuthenticated();
  const openInvestModal = useOpenInvestDepositModal(modalRoute);
  const navigate = useNavigate();
  useCurrentBalance(service.ssc);
  const location = useLocation();
  const investedFromAccounts = useInvestedAccountsCount(service.id, {
    skip: !showMultipleAccountButton,
  });

  const onClickMakeInvestment = () => {
    if (isAuthenticated) {
      openInvestModal(service.id);
    } else {
      const newUser = !localStorage.getItem('hasLoggedIn');
      navigate(newUser ? ROUTE_SIGNUP : ROUTE_LOGIN, {
        state: {
          redirectTo: location,
        },
      });
    }
  };

  const showOtherAccounts =
    investedFromAccounts > 1 && showMultipleAccountButton;
  const maxReached = +service.invested + service.pending >= service.maximumSbt;

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <ZigButton
        id={prefixId && `${prefixId}__invest-${service.id}`}
        onClick={onClickMakeInvestment}
        variant='contained'
        size={'large'}
        disabled={maxReached}
        sx={{ flexDirection: 'column', minWidth: 165, padding: '6px 26px' }}
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
            <ZigTypography
              variant={'caption'}
              component='p'
              color='neutral150'
              fontWeight={500}
              sx={{ textTransform: 'lowercase !important' }}
            >
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
    </Box>
  );
};

export default InvestButton;
