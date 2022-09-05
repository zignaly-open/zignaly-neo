import { AuctionType } from '@zignaly-open/raffles-shared/types';

export function getWinningLosingStatus(auction: AuctionType): {
  isActive: boolean;
  isWinning: boolean;
  isUserActive: boolean;
  isLosing: boolean;
  hasWon: boolean;
} {
  const isActive = +new Date(auction.expiresAt) > Date.now();
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
    isUserActive: isLosing || isWinning,
    hasWon: isWinning && !isActive,
  };
}
