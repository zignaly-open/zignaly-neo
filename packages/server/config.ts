// TODO: put in README
import { Algorithm } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const algorithm = (process.env.ALGORITHM || 'HS256') as Algorithm;
export const secret = process.env.ALGORITHM || 'razrazrazetohardbass';
export const auctionTtlPerBid = +process.env.AUCTION_TTL_PER_BID || 15 * 60_000;
export const postgresUrl = process.env.POSTGRES_URL;
