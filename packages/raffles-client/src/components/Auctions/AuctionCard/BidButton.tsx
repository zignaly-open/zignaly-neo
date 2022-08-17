import { useMutation } from '@apollo/client';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { AuctionType } from '@zignaly-open/raffles-shared/types';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { useTranslation } from 'react-i18next';
import useBalance from '../../../hooks/useBalance';
import BN from 'bignumber.js';
import { getWinningLosingStatus } from './util';
import useAuthenticate from '../../../hooks/useAuthenticate';
import { onboardingContext } from '../../../contexts/Onboarding';
import { Button } from '@zignaly-open/ui';
import { BID_AUCTION } from 'queries/auctions';
import { ShowToast } from 'util/showToast';

enum BidButtonState {
  NotLoggedIn,
  NotEnoughFunds,
  Default,
  Winning,
  Losing,
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
  const [showTrueSelf /* setShowTrueSelf */] = useState(false);
  const { t } = useTranslation('auction');

  const state = useMemo(() => {
    if (!user) return BidButtonState.NotLoggedIn;
    if (new BN(balance).lt(new BN(auction.bidFee)))
      return BidButtonState.NotEnoughFunds;
    const winState = getWinningLosingStatus(auction);
    if (winState.isWinning) return BidButtonState.Winning;
    if (winState.isLosing) return BidButtonState.Losing;
    return BidButtonState.Default;
  }, [user, balance, auction]);

  // const buttonColor = useMemo(() => {
  //   if (state === BidButtonState.NotLoggedIn) return 'prettyPink';
  //   if (state === BidButtonState.NotEnoughFunds) return 'greedyGreen';
  //   return 'primary';
  // }, [state]);

  const customButtonText = useMemo(() => {
    if (state === BidButtonState.NotLoggedIn) return t('global:log-in');
    if (state === BidButtonState.NotEnoughFunds) return t('global:get-funds');
  }, [state]);

  const bidClickHandler = useCallback(() => {
    if (state === BidButtonState.NotLoggedIn) {
      authenticate();
    } else if (state === BidButtonState.NotEnoughFunds) {
      ShowToast({
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
        ShowToast({ size: 'large', variant: 'error', caption: e });
      });
    }
  }, [state, authenticate, balanceOnboarding]);

  return (
    <Button
      size='large'
      loading={isBidding}
      disabled={!isActive}
      // onMouseEnter={() => setShowTrueSelf(true)}
      // onMouseLeave={() => setShowTrueSelf(false)}
      onClick={bidClickHandler}
      caption={
        (showTrueSelf && customButtonText) || isActive
          ? t('bid-now')
          : t('ended')
      }
    />
  );
};

export default BidButton;
