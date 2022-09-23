import { useMutation } from '@apollo/client';
import React, { useCallback, useContext, useMemo } from 'react';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { useTranslation } from 'react-i18next';
import useBalance from '../../../hooks/useBalance';
import BN from 'bignumber.js';
import useAuthenticate from '../../../hooks/useAuthenticate';
import { onboardingContext } from '../../../contexts/Onboarding';
import { Button } from '@zignaly-open/ui';
import { BID_AUCTION } from 'queries/auctions';
import { showToast } from 'util/showToast';
import { useModal } from 'mui-modal-provider';
import NotEnoughZIGModal from 'components/Modals/NotEnoughZIG';

enum BidButtonState {
  NotLoggedIn,
  NotEnoughFunds,
  BidNow,
  Ended,
  ComingSoon,
}

// Smarted button in the history of buttons, maybe ever
const BidButton: React.FC<{
  auction: AuctionType;
  isActive: boolean;
  updatedAt: Date;
}> = ({ auction, isActive, updatedAt }) => {
  const [bid] = useMutation(BID_AUCTION);
  const { balance } = useBalance();
  const { user } = useCurrentUser();
  const { balanceOnboarding } = useContext(onboardingContext);
  const authenticate = useAuthenticate();
  const { t } = useTranslation('auction');
  const { showModal } = useModal();

  const state = useMemo(() => {
    if (new Date(auction.startDate) > new Date()) {
      return BidButtonState.ComingSoon;
    } else if (!isActive) {
      return BidButtonState.Ended;
    }

    if (!user) return BidButtonState.NotLoggedIn;
    if (new BN(balance).lt(new BN(auction.bidFee)))
      return BidButtonState.NotEnoughFunds;
    return BidButtonState.BidNow;
  }, [user, balance, auction, BidButtonState, isActive, updatedAt]);

  const customButtonText = useMemo(() => {
    if (state === BidButtonState.Ended) return t('ended');
    if (state === BidButtonState.ComingSoon) return t('coming-soon');
    return t('bid-now');
  }, [state, t]);

  const bidClickHandler = useCallback(() => {
    if (state === BidButtonState.NotLoggedIn) {
      authenticate();
    } else if (
      auction.isExclusiveToKuCoin &&
      !window.ethereum.hasOwnProperty('isKuCoinWallet')
    ) {
      /* Show modal here */
    } else if (state === BidButtonState.NotEnoughFunds) {
      showModal(NotEnoughZIGModal);
    } else {
      bid({
        variables: {
          id: auction.id,
        },
      }).catch((e) => {
        showToast({ size: 'large', variant: 'error', caption: e.message });
      });
    }
  }, [state, authenticate, balanceOnboarding]);

  return (
    <Button
      variant={state === BidButtonState.Ended ? 'secondary' : 'primary'}
      size='large'
      disabled={!isActive}
      onClick={bidClickHandler}
      caption={customButtonText}
    />
  );
};

export default BidButton;
