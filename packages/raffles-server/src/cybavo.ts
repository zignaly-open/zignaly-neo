import crypto from 'node:crypto';
import axios, { AxiosResponse } from 'axios';
import { randomHex } from 'web3-utils';
import {
  zignalyAPI,
  zignalyAPIPrivateKey,
  zignalyAPIPublicKey,
} from '../config';
import { CybavoBalance, CybavoTransfer, TransactionType } from './types';

export const axiosInstance = axios.create({
  baseURL: zignalyAPI,
});

const generateChecksum = (data: any) => {
  const rdmString = randomHex(4).slice(2);
  const timestamp = +new Date();
  const str = `p=${JSON.stringify(
    data,
  )}&s=${rdmString}&secret=${zignalyAPIPrivateKey}&t=${timestamp}`;
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

export const internalTransfer = async (
  from: string,
  to: string,
  amount: string,
  type: TransactionType,
): Promise<CybavoTransfer> => {
  return fetchAPI(`/transfer/internal`, {
    method: 'POST',
    data: {
      amount: amount.toString(),
      fees: '0',
      currency: 'ZIG',
      user_id: from,
      to_user_id: to,
      locked: 'true',
      type,
    },
  }).then(({ data }) => data);
};
