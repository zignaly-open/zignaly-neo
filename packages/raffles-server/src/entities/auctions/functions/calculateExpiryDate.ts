import { random } from 'lodash';
import { Auction } from '../model';

function calculateNewExpiryDate(auction: Auction): Date {
  if (auction.expiresAt < auction.maxExpiryDate) {
    const expiryDate = +new Date(auction.expiresAt);
    const currentDate = Date.now();
    if (expiryDate - currentDate <= 10_000) {
      return new Date(expiryDate + random(5, 12) * 1_000);
    }
  }
}

export default calculateNewExpiryDate;
