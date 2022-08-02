import fetch from 'node-fetch';
import crypto from 'node:crypto';
import { randomHex } from 'web3-utils';
import {
  zignalyAPI,
  zignalyAPIPrivateKey,
  zignalyAPIPublicKey,
} from '../config';

export enum TransactionType {
  Deposit = 'Raffle Deposit',
  Fee = 'Raffle Fee',
  Payout = 'Raffle Payout',
}

const generateChecksum = (body: any) => {
  const rdmString = randomHex(4).slice(2);
  const timestamp = +new Date();
  const str = `p=${JSON.stringify(
    body,
  )}&s=${rdmString}&secret=${zignalyAPIPrivateKey}&t=${timestamp}`;
  const checksum = crypto.createHash('sha256').update(str).digest('hex');
  return { rdmString, timestamp, checksum };
};

const fetchAPI = async (url: string, params?: any) => {
  const { rdmString, timestamp, checksum } = generateChecksum(params?.body);
  const fullUrl = new URL(`${zignalyAPI}${url}`);
  fullUrl.searchParams.set('s', rdmString);
  fullUrl.searchParams.set('t', timestamp.toString());

  const response = await fetch(fullUrl, {
    method: params?.method,
    headers: {
      'Content-Type': 'application/json',
      'X-CODE': zignalyAPIPublicKey,
      'X-CHECKSUM': checksum,
    },
    body: JSON.stringify(params?.body),
  });

  return response.json();
};

export const getBalance = async (address: string) => {
  return fetchAPI(`/balance/all/${address}`).then(
    (data) => data.ZIG?.balance || '0',
  );
};

export const internalTransfer = async (
  from: string,
  to: string,
  amount: string,
  type: TransactionType,
) => {
  return fetchAPI(`/transfer/internal`, {
    method: 'POST',
    body: {
      amount,
      fees: '0',
      currency: 'ZIG',
      user_id: from,
      to_user_id: to,
      locked: 'true',
      type,
    },
  });
};
