import { Auction, AuctionBid } from './model';
import BN from 'bignumber.js';
import {
  AuctionBidType,
  AuctionType,
} from '@zignaly-open/raffles-shared/types';
import { getUserBalance } from '../../cybavo';

export function getMinRequiredBidForAuction(
  auction: Auction | AuctionType,
  lastBid: AuctionBid | AuctionBidType,
): string {
  return new BN(lastBid?.value || auction.startingBid)
    .plus(new BN(auction.bidStep))
    .toString();
}

export function getPayoutPrizeForAuction(
  auction: Auction | AuctionType,
  lastBid: AuctionBid | AuctionBidType,
): string {
  if (lastBid) {
    return new BN(lastBid.value).toString();
  } else {
    return auction.startingBid;
  }
}

export function isBalanceSufficientForPayment(
  payment: string,
  balance: string,
): boolean {
  return new BN(payment).lte(new BN(balance));
}

export async function verifyPositiveBalance(address: string) {
  if (+(await getUserBalance(address)) < 0) {
    // this means our cowboy somehow managed to become the fastest head on the west
    // noinspection ExceptionCaughtLocallyJS
    throw new Error('Ne tak bistro, pidor');
  }
}
