import { random } from 'lodash';
import { Auction } from '../model';

function calculateNewExpiryDate(auction: Auction) {
  if (auction.expiresAt < auction.maxExpiryDate) {
    const expiryDate = +new Date(auction.expiresAt);
    const currentDate = Date.now();
    if (expiryDate - currentDate >= 3600_000 * 10) {
      return new Date(expiryDate + 60 * random(1, 4) * 60_000);
    } else if (expiryDate - currentDate > 60_000 * 10) {
      return new Date(expiryDate + 10 * random(1, 4) * 60_000);
    } else {
      return new Date(expiryDate + random(5, 11) * 60_000);
    }
  }
}

export default calculateNewExpiryDate;
