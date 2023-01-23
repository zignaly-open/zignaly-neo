import {
  AuctionBidType,
  AuctionType,
} from '@zignaly-open/raffles-shared/types';
import { ContextUser, ResourceOptions } from '../../types';
import { User } from '../users/model';
import { Auction, AuctionBid } from './model';
import redisService from '../../redisService';
import { Op } from 'sequelize';
import { checkAdmin } from '../../util/admin';
import { isTest } from '../../../config';
import pubsub from '../../pubsub';
import { BALANCE_CHANGED } from '../users/constants';
import { isBalanceSufficientForPayment } from './util';
import { emitBalanceChanged } from '../users/util';
import { Payout } from '../payouts/model';
import { BID_MADE } from './constants';
import { AuctionFilter, AuctionPayload } from './types';
import { getUserBalance, makePayout } from '../balances/service';

const omitPrivateFields = {
  attributes: { exclude: ['announcementDate', 'maxExpiryDate'] },
};

const auctionsFilter = (
  auctionId?: number,
  filter: AuctionFilter = {},
  bypassChecks = false,
) => {
  const {
    unannounced,
    privateCode,
    title,
    startDateLte,
    startDateGte,
    ...restFilters
  } = filter;
  const startDateFilters =
    startDateLte && startDateGte
      ? {
          [Op.and]: [
            {
              [Op.lte]: startDateLte,
            },
            {
              [Op.gte]: startDateGte,
            },
          ],
        }
      : startDateLte
      ? { [Op.lte]: startDateLte }
      : startDateGte
      ? { [Op.gte]: startDateGte }
      : null;

  return {
    ...restFilters,
    ...(title && { title: { [Op.iLike]: `%${title}%` } }),
    ...(!unannounced &&
      !bypassChecks && {
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
    ...(startDateFilters && { startDate: startDateFilters }),
    ...(!bypassChecks && {
      privateCode: {
        [Op.or]: [null, privateCode ?? null],
      },
    }),
  };
};

export async function getAuctionsWithBids(
  auctionId?: number,
  user?: ContextUser | boolean,
  data?: ResourceOptions,
) {
  const {
    sortField = 'id',
    sortOrder = 'desc',
    page = 0,
    perPage = 25,
    filter,
  } = data || {};
  // User = true when called from admin endpoint to return additional fields and private auctions.
  // Aso when called from system places such as bidding notification.

  const auctions = (await Auction.findAll({
    where: auctionsFilter(auctionId, filter, user === true),
    include: [{ model: AuctionBid, include: [User] }],
    order: [
      [sortField, sortOrder],
      [{ model: AuctionBid, as: 'bids' }, 'position', 'ASC'],
    ],
    limit: perPage,
    offset: page * perPage,
    ...(user !== true && omitPrivateFields),
  })) as unknown as AuctionType[];

  for await (const a of auctions) {
    // Apply redis data
    if (a.inRedis) {
      const redisData = await redisService.getAuctionData(a.id);
      a.currentBid = redisData.price;
      a.expiresAt = redisData.expire;
      a.bids = redisData.ranking.map((user, i) => ({
        position: i + 1,
        user,
      }));
    } else {
      a.isClaimed = Boolean(
        typeof user === 'object' &&
          user &&
          a.bids.find((b) => b.user.id === user.id && b.claimTransactionId),
      );
    }
  }

  return auctions;
}

const broadcastAuctionChange = async (
  auctionId: number,
  user: { id: number; username: string },
) => {
  pubsub.publish(BID_MADE, {
    bidMade: {
      user: {
        id: user.id,
        username: user.username,
      },
      auctionId: auctionId,
    },
  });
};

const broadcastBalanceChange = async (balance: string, user: ContextUser) => {
  pubsub.publish(BALANCE_CHANGED, {
    balanceChanged: {
      id: user.id,
      balance,
    },
  });
};

export const generateService = (user: ContextUser) => ({
  getAll: async (data: ResourceOptions, asAdmin = false) => {
    if (asAdmin) {
      checkAdmin(user);
    }
    return getAuctionsWithBids(null, asAdmin || user, data);
  },

  getById: async (id: number) => {
    checkAdmin(user);
    const auction = await Auction.findByPk(id, {
      include: {
        model: AuctionBid,
        as: 'bids',
        include: [User],
      },
      order: [['bids', 'position', 'ASC']],
    });
    auction.bids.forEach(
      (b: AuctionBidType) => (b.isClaimed = Boolean(b.claimTransactionId)),
    );
    return auction;
  },

  count: async (data: ResourceOptions, asAdmin = false) => {
    if (asAdmin) {
      checkAdmin(user);
    }
    const count = await Auction.count({
      where: auctionsFilter(null, data.filter, asAdmin),
    });
    return { count };
  },

  update: async (data: AuctionPayload) => {
    checkAdmin(user);
    try {
      const auction = await Auction.findByPk(data.id);
      if (!auction) throw new Error('Auction Not Found');
      if (
        ((data.startDate &&
          data.startDate !== auction.startDate.toISOString()) ||
          (data.expiresAt &&
            data.expiresAt !== auction.expiresAt.toISOString()) ||
          (data.maxExpiryDate &&
            data.maxExpiryDate !== auction.maxExpiryDate.toISOString())) &&
        auction.startDate <= new Date()
      ) {
        throw new Error("Can't change dates of auction already started");
      }

      const [, [updatedAuction]] = await Auction.update(data, {
        where: { id: data.id },
        returning: true,
      });
      if (!updatedAuction) throw new Error("Auction couldn't update");

      await redisService.redisImport(updatedAuction.id);

      return updatedAuction;
    } catch (e) {
      if (!isTest) {
        // In memory db doesn't return object
        console.error(e);
      }
      throw e;
    }
  },

  create: async (data: Partial<Auction>) => {
    checkAdmin(user);
    try {
      const auction = await Auction.create(data, { returning: true });
      if (!auction) throw new Error("Can't create auction");

      await redisService.redisImport(auction.id, false);

      return auction;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  delete: async (id: number) => {
    checkAdmin(user);
    const auction = await Auction.findByPk(id);
    if (!auction) throw new Error('Auction not found');
    if (auction.startDate <= new Date())
      throw new Error('Cannot delete auction already started');

    await redisService.deleteAuctionFromRedis(id);
    return Boolean(
      await Auction.destroy({
        where: {
          id,
        },
      }),
    );
  },

  bid: async (id: number) => {
    if (!user) {
      throw new Error('User not found');
    }
    try {
      const balance = await redisService.bid(user.id, id);
      const username = await redisService.getUsernameFromRedisCache(user.id);
      broadcastBalanceChange(balance, user);
      !isTest && broadcastAuctionChange(id, { id: user.id, username });
      return 'ok';
    } catch (e) {
      if (!isTest) {
        console.error(e);
      }
      throw e;
    }
  },

  claim: async (id: number) => {
    if (!user) {
      throw new Error('User not found');
    }
    const [auction] = await getAuctionsWithBids(id, true);

    if (!auction.isFinalized) throw new Error('Auction not finalized');
    if (auction.maxClaimDate && +new Date(auction.maxClaimDate) < Date.now())
      throw new Error('Can not claim after the max claim date');

    const userBid = auction.bids
      .filter((b) => b.position <= auction.numberOfWinners)
      .find((b) => b.user.id === user.id);
    if (!userBid) {
      throw new Error('Can not find the bid');
    }

    if (userBid.claimTransactionId) {
      throw new Error('Already claimed');
    }

    if (
      !isBalanceSufficientForPayment(
        auction.currentBid,
        await getUserBalance(user.publicAddress),
      )
    ) {
      throw new Error('Insufficient funds');
    }

    try {
      const tx = await makePayout({
        walletAddress: user.publicAddress,
        zhits: auction.currentBid,
        note: `${auction.id}`,
      });

      userBid.claimTransactionId = `${tx.id}`;
      (userBid as AuctionBid).save();
    } catch (error) {
      throw new Error('Could not transfer');
    }

    await Payout.create({
      auctionId: id,
      userId: user.id,
      publicAddress: user.publicAddress,
    });

    emitBalanceChanged(user);

    return { id: auction.id, isClaimed: true };
  },
});
