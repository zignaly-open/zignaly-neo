import { TransactionStatus, useContractFunction } from '@usedapp/core';
import { BigNumber } from 'ethers';
import useContract from './useContract';

interface TransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  root?: string;
  gasUsed: BigNumber;
  logsBloom: string;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  confirmations: number;
  cumulativeGasUsed: BigNumber;
  effectiveGasPrice: BigNumber;
  byzantium: boolean;
  type: number;
  status?: number;
}

jest.mock('@usedapp/core', () => ({
  useContractFunction: jest.fn(),
}));

jest.mock('../contract', () => jest.fn());

describe('useContract', () => {
  const status: TransactionStatus = { status: 'Fail' };
  status.status = 'Success';
  describe('transfer', () => {
    it('return successfully', () => {
      (useContractFunction as jest.Mock).mockReturnValueOnce(status);
      expect(useContract({ address: '' }).transfer('')).toEqual(
        new Promise<TransactionReceipt>(jest.fn()),
      );
    });
  });
});
