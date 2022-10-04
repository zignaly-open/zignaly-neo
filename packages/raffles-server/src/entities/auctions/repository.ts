import { AuctionType } from '@zignaly-open/raffles-shared/types';
import { Includeable } from 'sequelize';
import { ContextUser } from '../../types';
import { User } from '../users/model';
import { Auction, AuctionBid } from './model';
import redisService from '../../redisService';

const AuctionsRepository = () => {
  const lastBidPopulation = {
    model: AuctionBid,
    as: 'bids',
    order: [['id', 'DESC']],
    limit: 1,
    include: [User],
  } as Includeable;

  async function findAuction(user: ContextUser, id: number): Promise<Auction> {
    return await Auction.findByPk(id, {
      include: lastBidPopulation,
    }).then(async (auction) => {
      if (!auction) throw new Error('Auction not found');
      return auction;
    });
  }

  async function findUsers(ids: number[]): Promise<User[]> {
    return await User.findAll({ where: { id: ids } });
  }

  async function getAuctionsWithBids(auctionId?: number, user?: ContextUser) {
    const auctions = (await Auction.findAll({
      where: {
        ...(auctionId && { id: auctionId }),
      },
      include: [{ model: AuctionBid, include: [User] }],
      order: [
        ['id', 'DESC'],
        [{ model: AuctionBid, as: 'bids' }, 'position', 'ASC'],
      ],
    })) as unknown as (AuctionType & { dataValues: AuctionType })[];

    for await (const a of auctions) {
      // Apply redis data
      if (a.inRedis) {
        const redisData = await redisService.getAuctionData(a.id);
        a.currentBid = redisData.price;
        a.expiresAt = redisData.expire;
        // todo: store usernames in redis to avoid querying db for users
        const users = await findUsers(redisData.ranking);
        a.bids = redisData.ranking.map((userId, i) => ({
          position: i + 1,
          user: {
            id: userId,
            username: users?.find((u) => u.id === +userId)?.username,
          },
        }));
      } else {
        a.isClaimed = Boolean(
          user &&
            a.bids.find((b) => b.user.id === user.id && b.claimTransactionId),
        );
      }
    }

    return auctions;
  }

  return {
    getAuctionsWithBids,
    findAuction,
    lastBidPopulation,
    findUsers,
  };
};

export default AuctionsRepository();
