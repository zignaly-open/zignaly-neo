import {
  AuctionStatus,
  AuctionType,
  BasketItem,
} from '../../../types/src/Auction';
import _sample from 'lodash/sampleSize';

const basket = [
  { ticker: 'ETC', amount: 2 },
  { ticker: 'BTC', amount: 10 },
  { ticker: 'XRP', amount: 10 },
  { ticker: 'NFT', amount: 5 },
  { ticker: 'DOGE', amount: 100000 },
] as BasketItem[];

const generateAuctionItem = () => {
  const id = Math.round(Math.random() * 1000000);
  return {
    id,
    title: 'Auction #' + id,
    description: 'Blah blah blah!'.repeat(Math.round(Math.random() * 10)),
    image: `/images/${1 + Math.floor(Math.random() * 8)}.jpg`,
    createdAt: new Date(),
    monetaryValue: '$84.52',
    expiresAt: new Date(Date.now() + 3600_000),
    status: AuctionStatus.Active,
    basket: _sample(basket),
    lastBid: {
      value: 100,
      date: new Date(),
    },
  };
};

// TODO
const auctions = [
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
  generateAuctionItem(),
] as AuctionType[];

export const resolvers = {
  Query: {
    auctions: async (_: any, { id }: { id: number }) =>
      id ? auctions.filter((x) => x.id === +id) : auctions,
  },
  Mutation: {
    bid: async (_: any, { id, bid }: { id: number; bid: number }) => {
      const auction = auctions.find((x) => x.id === +id);
      auction.lastBid = {
        value: bid,
        date: new Date(),
      };
      return auction;
    },
  },
};
