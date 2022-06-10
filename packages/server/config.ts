// TODO: put in README
import { Algorithm } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IERC20 } from '@zigraffle/shared/abis';
dotenv.config();

export const algorithm = (process.env.ALGORITHM || 'HS256') as Algorithm;
export const secret = process.env.ALGORITHM || 'razrazrazetohardbass';
export const auctionTtlPerBid = +process.env.AUCTION_TTL_PER_BID || 15 * 60_000;
export const postgresUrl = process.env.POSTGRES_URL;
export const serverName = process.env.SERVER_NAME || 'Zirgaffle';
export const numberOfConfirmationsRequired =
  +process.env.NUMBER_OF_CONFIRMATIONS_REQUIRED || 1;
export const rpcUrl = process.env.RPC_URL as string;
export const rpcSocketUrl = process.env.RPC_SOCKET_URL as string;
export const receivingAddress = process.env.RECEIVING_ACCOUNT as string;
export const contractAddress = process.env.CONTRACT_ADDRESS as string;
export const abi = IERC20;
