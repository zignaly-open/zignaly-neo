import { AuctionType } from '@zigraffle/shared/types';

export function getWinningLosingStatus(auction: AuctionType): {
  isActive: boolean;
  isWinning: boolean;
  isUserActive: boolean;
  isLosing: boolean;
} {
  const [lastBidId, yourLastBidId] = [
    auction.bids?.[0]?.id,
    auction.userBid?.[0]?.id,
  ];
  const isActive = +new Date(auction.expiresAt) > Date.now();
  const isWinning = yourLastBidId && yourLastBidId === lastBidId;
  const isLosing = yourLastBidId && yourLastBidId !== lastBidId;
  return { isLosing, isWinning, isActive, isUserActive: isLosing || isWinning };
}
