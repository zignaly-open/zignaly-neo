import { useMutation } from '@apollo/client';
import { BID_AUCTION } from '../queries';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { AuctionType } from '@zigraffle/shared/types';
import useCurrentUser from '../../../hooks/useCurrentUser';
import { useTranslation } from 'react-i18next';
import useBalance from '../../../hooks/useBalance';
import { BigNumber } from 'ethers';
import { getWinningLosingStatus } from './util';
import useAuthenticate from '../../../hooks/useAuthenticate';
import { onboardingContext } from '../../../contexts/Onboarding';
import { Button } from 'zignaly-ui';

enum BidButtonState {
  NotLoggedIn,
  NotEnoughFunds,
  Default,
  Winning,
  Losing,
}

// Smarted button in the history of buttons, maybe ever
const BidButton: React.FC<{ auction: AuctionType; isActive: boolean }> = ({
  auction,
  isActive,
}) => {
  const [bid, { loading: isBidding }] = useMutation(BID_AUCTION);
  const { balance } = useBalance();
  const { user } = useCurrentUser();
  const { balanceOnboarding } = useContext(onboardingContext);
  const authenticate = useAuthenticate();
  const [showTrueSelf /* setShowTrueSelf */] = useState(false);
  const { t } = useTranslation('auction');

  const state = useMemo(() => {
    if (!user) return BidButtonState.NotLoggedIn;
    if (
      BigNumber.from(balance).lt(
        BigNumber.from(auction.minimalBid).add(auction.bidFee),
      )
    )
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
      balanceOnboarding();
    } else {
      bid({
        variables: {
          id: auction.id,
          value: auction.minimalBid,
        },
      }).catch((e) => {
        // TODO: better alerts
        alert(e.toString());
      });
    }
  }, [state, authenticate, balanceOnboarding]);

  return (
    <Button
      size='small'
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
