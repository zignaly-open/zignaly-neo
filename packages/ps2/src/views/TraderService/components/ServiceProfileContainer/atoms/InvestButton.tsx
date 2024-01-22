import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from '../../../../../apis/user/use';
import {
  useCurrentBalance,
  useInvestedAccountsCount,
} from '../../../../../apis/investment/use';
import { ZigButton, ZigRocketIcon, ZigTypography } from '@zignaly-open/ui';
import OtherAccountsButton from './OtherAccountsButton';
import { Box } from '@mui/material';
import { useOpenInvestDepositModal } from 'views/Dashboard/components/ManageInvestmentModals/InvestDepositModal';
import useMaybeNavigateNotLoggedIn from 'util/hooks/useMaybeNavigateNotLoggedIn';

const InvestButton: React.FC<{
  prefixId?: string;
  service: Service;
  modalRoute?: string;
  showMultipleAccountButton?: boolean;
  showRocket?: boolean;
  fullSize?: boolean;
}> = ({
  prefixId,
  modalRoute,
  service,
  showMultipleAccountButton,
  showRocket,
  fullSize,
}) => {
  const { t } = useTranslation([
    'service',
    // we need these two otherwise a Suspense will trigger when we load the other ns
    // and the page will scroll to top
    'deposit-crypto',
    'edit-investment',
  ]);
  const isAuthenticated = useIsAuthenticated();
  const openInvestModal = useOpenInvestDepositModal(modalRoute);
  useCurrentBalance(service.ssc);
  const investedFromAccounts = useInvestedAccountsCount(service.id, {
    skip: !showMultipleAccountButton,
  });
  const navigateIfNotLoggedIn = useMaybeNavigateNotLoggedIn();

  const onClickMakeInvestment = () => {
    if (isAuthenticated) {
      openInvestModal(service.id);
    } else {
      navigateIfNotLoggedIn();
    }
  };

  const showOtherAccounts =
    investedFromAccounts >= 1 && showMultipleAccountButton;
  const maxReached = +service.invested + service.pending >= service.maximumSbt;

  return (
    <Box display={'flex'} flexDirection={'column'} position={'relative'}>
      <ZigButton
        id={prefixId && `${prefixId}__invest-${service.id}`}
        onClick={onClickMakeInvestment}
        variant='contained'
        size={'large'}
        disabled={maxReached}
        sx={{
          flexDirection: 'row',
          gap: '5px',
          padding: '6px 26px',
        }}
        tooltip={maxReached ? t('invest-button.max-reached-tooltip') : null}
        endIcon={showRocket && <ZigRocketIcon width={'34px'} height={'34px'} />}
      >
        <div>
          <ZigTypography
            variant='body2'
            color='neutral000'
            fontWeight={600}
            letterSpacing={1.1}
          >
            {t(
              maxReached && fullSize
                ? 'invest-button.max-reached'
                : 'invest-button.invest-now',
            )}
          </ZigTypography>
          {!maxReached && fullSize && (
            <ZigTypography
              variant={'caption'}
              component='p'
              color='neutral150'
              fontWeight={500}
            >
              {t('invest-button.x-success-fee', {
                fee: service.successFee,
              })}
            </ZigTypography>
          )}
        </div>
      </ZigButton>

      {!fullSize && (
        <ZigTypography
          variant={'caption'}
          component='p'
          color='neutral300'
          fontWeight={400}
          mt='12px'
        >
          {maxReached
            ? t('invest-button.max-reached')
            : t('invest-button.success-fee', {
                fee: service.successFee,
              })}
        </ZigTypography>
      )}

      {showOtherAccounts && (
        <Box
          sx={{
            pt: 0.5,
            textAlign: 'center',
            position: 'absolute',
            bottom: '-25px',
            width: '100%',
          }}
        >
          <OtherAccountsButton service={service} />
        </Box>
      )}
    </Box>
  );
};

export default InvestButton;
