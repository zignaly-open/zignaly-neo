import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from '../../../../../apis/user/use';
import {
  useCurrentBalance,
  useInvestedAccountsCount,
} from '../../../../../apis/investment/use';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ZigRocketIcon } from '@zignaly-open/ui/icons';
import { ReactComponent as ZigRocketExhaustIcon } from './assets/rocket-icon-exhaust.svg';
import ZigRocketStarBackground from './assets/rocket-icon-star-background.svg';
import OtherAccountsButton from './OtherAccountsButton';
import { Box, keyframes } from '@mui/material';
import { useOpenInvestDepositModal } from 'views/Dashboard/components/ManageInvestmentModals/InvestDepositModal';
import useMaybeNavigateNotLoggedIn from 'util/hooks/useMaybeNavigateNotLoggedIn';

const rocketLaunch = keyframes`
    0% {
        transform: translate(0, 0)
    }

    20% {
        transform: rotate(0deg) translate(0, 0)
    }

    40% {
        transform: rotate(-2deg) translate(2px, -2px)
    }

    60% {
        transform: rotate(2deg) translate(-2px, 2px)
    }

    80% {
        transform: rotate(-2deg) translate(2px, -2px)
    }

    100% {
        transform: rotate(0deg) translate(0, 0)
    }
`;

const spaceMoving = keyframes`
    0% {
        background-position-y: 0
    }
    
    100% {
        background-position-y: 64px
    }
`;

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
          '.MuiButton-endIcon': {
            position: 'relative',
            '&:after': {
              position: 'absolute',
              pointerEvents: 'none',
              content: '""',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              opacity: 0,
              transform: 'rotate(45deg)',
              background: `url(${ZigRocketStarBackground})`,
              transition: 'opacity .3s',
              backgroundRepeat: 'repeat-y',
            },
          },
          '.MuiButton-endIcon svg.zignaly-rocket': {
            position: 'relative',
            zIndex: 2,
          },
          '.MuiButton-endIcon svg.zignaly-rocket-exhaust': {
            position: 'absolute',
            zIndex: 1,
          },
          '&:hover .MuiButton-endIcon svg.zignaly-rocket-exhaust': {
            animation: `${rocketLaunch} .3s infinite ease`,
          },
          '&:hover .MuiButton-endIcon:after': {
            opacity: 0.8,
            animation: `${spaceMoving} .8s infinite linear`,
          },
        }}
        tooltip={maxReached ? t('invest-button.max-reached-tooltip') : null}
        endIcon={
          showRocket && (
            <>
              <ZigRocketIcon
                className='zignaly-rocket'
                width={'34px'}
                height={'34px'}
              />
              <ZigRocketExhaustIcon
                className='zignaly-rocket-exhaust'
                width={'34px'}
                height={'34px'}
              />
            </>
          )
        }
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
