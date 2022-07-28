import { Algorithm } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IERC20 } from '@zignaly/raffles-shared/abis';

dotenv.config();

export const algorithm = (process.env.ALGORITHM || 'HS256') as Algorithm;
export const secret = process.env.SECRET || 'razrazrazetohardbass';
export const postgresUrl = process.env.POSTGRES_URL;
export const numberOfConfirmationsRequired =
  +process.env.NUMBER_OF_CONFIRMATIONS_REQUIRED || 1;
export const rpcUrl = process.env.RPC_URL as string;
export const rpcSocketUrl = process.env.RPC_SOCKET_URL as string;
export const receivingAddress = process.env.RECEIVING_ACCOUNT as string;
export const contractAddress = process.env.CONTRACT_ADDRESS as string;
export const abi = IERC20;
export const isTest = process.env.NODE_ENV === 'test';
export const port = process.env.PORT || 4000;
