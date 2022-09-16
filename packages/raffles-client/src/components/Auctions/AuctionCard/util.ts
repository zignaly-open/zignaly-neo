import { AuctionType } from '@zignaly-open/raffles-shared/types';

export function getWinningLosingStatus(auction: AuctionType): {
  isActive: boolean;
  isStarted: boolean;
  isWinning: boolean;
  isUserActive: boolean;
  isLosing: boolean;
  hasWon: boolean;
} {
  const isStarted =
    !auction.startDate || new Date(auction.startDate) <= new Date();
  const isActive = +new Date(auction.expiresAt) > Date.now() && isStarted;
  const userBidId = auction.userBid?.id;
  const userBid = userBidId
    ? auction.bids.find((b) => b.id === userBidId)
    : null;
  const isWinning = userBid?.position <= auction.numberOfWinners;
  const isLosing = !isWinning && Boolean(userBid);

  return {
    isLosing,
    isWinning,
    isActive,
    isStarted,
    isUserActive: isLosing || isWinning,
    hasWon: isWinning && !isActive,
  };
}
