import { ContextUser } from '../../../types';
import { Auction, lastBidPopulation } from '../model';

async function findAuction(user: ContextUser, id: number): Promise<Auction> {
  return await Auction.findByPk(id, {
    include: lastBidPopulation,
  }).then(async (auction) => {
    if (!auction) throw new Error('Auction not found');
    return auction;
  });
}

export default findAuction;
