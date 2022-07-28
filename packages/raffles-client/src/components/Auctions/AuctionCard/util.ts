import { AuctionType } from '@zigraffle/shared/types';

export function getWinningLosingStatus(auction: AuctionType): {
  isActive: boolean;
  isWinning: boolean;
  isUserActive: boolean;
  isLosing: boolean;
  hasWon: boolean;
} {
  const isActive = +new Date(auction.expiresAt) > Date.now();
  const isWinning = auction.userBid?.position <= auction.numberOfWinners;
  const isLosing = auction.userBid?.position > auction.numberOfWinners;
  return {
    isLosing,
    isWinning,
    isActive,
    isUserActive: isLosing || isWinning,
    hasWon: isWinning && !isActive,
  };
}
