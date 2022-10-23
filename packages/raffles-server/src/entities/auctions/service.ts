import { AuctionType } from '@zignaly-open/raffles-shared/types';
import { Includeable } from 'sequelize';
import { ContextUser } from '../../types';
import { User } from '../users/model';
import { Auction, AuctionBid } from './model';
import redisService from '../../redisService';
import { Op } from 'sequelize';

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

  type AuctionFilter = {
    unannounced?: boolean;
    privateCode?: string;
  };

  const auctionsFilter = (auctionId?: number, filter: AuctionFilter = {}) => ({
    ...(!filter.unannounced && {
      announcementDate: {
        [Op.or]: [
          null,
          {
            [Op.lte]: new Date(),
          },
        ],
      },
    }),
    ...(auctionId && { id: auctionId }),
    privateCode: {
      [Op.or]: [null, filter.privateCode ?? null],
    },
  });

  async function getAuctionsWithBids(
    auctionId?: number,
    user?: ContextUser,
    sortField = 'id',
    sortOrder = 'desc',
    page = 0,
    perPage = 25,
    filter?: AuctionFilter,
  ) {
    const auctions = (await Auction.findAll({
      where: auctionsFilter(auctionId, filter),
      include: [{ model: AuctionBid, include: [User] }],
      order: [
        [sortField, sortOrder],
        [{ model: AuctionBid, as: 'bids' }, 'position', 'ASC'],
      ],
      limit: perPage,
      offset: page * perPage,
    })) as unknown as AuctionType[];

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

  async function countAuctions(filter?: AuctionFilter) {
    const count = await Auction.count({
      where: auctionsFilter(null, filter),
    });
    return { count };
  }

  async function checkAdmin(id: number) {
    const fullUser = await User.findByPk(id);
    if (!fullUser?.isAdmin) throw new Error('Not authorized');
  }

  async function updateAuction(user: ContextUser, data: Partial<Auction>) {
    await checkAdmin(user?.id);

    const [, [auction]] = await Auction.update(data, {
      where: { id: data.id },
      returning: true,
    });
    if (!auction) throw new Error('Auction Not Found');

    return auction;
  }

  async function createAuction(user: ContextUser, data: Partial<Auction>) {
    await checkAdmin(user?.id);

    const auction = await Auction.create(data, { returning: true });
    if (!auction) throw new Error("Can't create auction");

    return auction;
  }

  return {
    getAuctionsWithBids,
    countAuctions,
    findAuction,
    lastBidPopulation,
    findUsers,
    updateAuction,
    createAuction,
  };
};

export default AuctionsRepository();
