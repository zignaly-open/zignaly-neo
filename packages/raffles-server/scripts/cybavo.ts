import crypto from 'node:crypto';
import axios, { AxiosResponse } from 'axios';
import { randomHex } from 'web3-utils';
import {
  zignalyAPI,
  zignalyAPIPrivateKey,
  zignalyAPIPublicKey,
} from '../config';

type CybavoBalance = Record<string, { balance: string }>;
type CybavoTransfer = { transaction_id: string };

type CybavoOperations = {
  internal_type: string;
  amount: number;
  created_at: string;
}[];

enum TransactionType {
  Deposit = 'ZigBids Deposit',
  Fee = 'ZigBids Fee',
  Payout = 'ZigBids Claim',
  RedeemCode = 'ZigBids Redeem Code',
  ReferralCode = 'ZigBids Referral Code',
}

const axiosInstance = axios.create({
  baseURL: zignalyAPI,
});

const generateChecksum = (data: any) => {
  const rdmString = randomHex(4).slice(2);
  const timestamp = +new Date();
  const str = `p=${
    data ? JSON.stringify(data) : ''
  }&s=${rdmString}&secret=${zignalyAPIPrivateKey}&t=${timestamp}`;
  const checksum = crypto.createHash('sha256').update(str).digest('hex');
  return { rdmString, timestamp, checksum };
};

const fetchAPI = async (url: string, params?: any): Promise<AxiosResponse> => {
  const { rdmString, timestamp, checksum } = generateChecksum(params?.data);

  return axiosInstance({
    url: url,
    method: params?.method,
    headers: {
      'Content-Type': 'application/json',
      'X-CODE': zignalyAPIPublicKey,
      'X-CHECKSUM': checksum,
    },
    params: {
      s: rdmString,
      t: timestamp,
    },
    data: params?.data,
  });
};

export const getUserBalance = async (address: string) => {
  return fetchAPI(`/balance/all/${address}`).then(
    ({ data }: { data: CybavoBalance }) => {
      return data.ZIG?.balance || '0';
    },
  );
};

export const getUserDeposits = async (address: string) => {
  return fetchAPI(`/operations/all/${address}`).then(
    ({ data }: { data: CybavoOperations }) => {
      return data.filter((d) => d.internal_type === TransactionType.Deposit);
    },
  );
};

export const internalTransfer = async (
  from: string,
  to: string,
  amount: string,
  type: TransactionType,
  locked: boolean,
): Promise<CybavoTransfer> => {
  return fetchAPI(`/transfer/internal`, {
    method: 'POST',
    data: {
      amount: amount.toString(),
      fees: '0',
      currency: 'ZIG',
      user_id: from,
      to_user_id: to,
      locked: locked.toString(),
      type,
    },
  }).then(({ data }) => data);
};
