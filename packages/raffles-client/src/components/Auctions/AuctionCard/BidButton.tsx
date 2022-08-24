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
}> = ({ auction, isActive }) => {
  const [bid, { loading: isBidding }] = useMutation(BID_AUCTION);
  const { balance } = useBalance();
  const { user } = useCurrentUser();
  const { balanceOnboarding } = useContext(onboardingContext);
  const authenticate = useAuthenticate();
  const { t } = useTranslation('auction');

  const state = useMemo(() => {
    if (auction.comingSoon) {
      return BidButtonState.ComingSoon;
    } else if (!isActive && !auction.comingSoon) {
      return BidButtonState.Ended;
    }

    if (!user) return BidButtonState.NotLoggedIn;
    if (new BN(balance).lt(new BN(auction.bidFee)))
      return BidButtonState.NotEnoughFunds;
    return BidButtonState.BidNow;
  }, [user, balance, auction, BidButtonState, isActive]);

  const customButtonText = useMemo(() => {
    if (state === BidButtonState.Ended) return t('ended');
    if (state === BidButtonState.ComingSoon) return t('coming-soon');
    return t('bid-now');
  }, [state, t]);

  const bidClickHandler = useCallback(() => {
    if (state === BidButtonState.NotLoggedIn) {
      authenticate();
    } else if (state === BidButtonState.NotEnoughFunds) {
      showToast({
        size: 'large',
        variant: 'error',
        caption: 'Not Enough Funds!',
      });
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
      size='large'
      loading={isBidding}
      disabled={!isActive}
      onClick={bidClickHandler}
      caption={customButtonText}
    />
  );
};

export default BidButton;
