import { Transaction } from './model';
import BN from 'bignumber.js';
import pubsub from '../../pubsub';
import { BALANCE_CHANGED } from './constants';

export async function getUserBalanceObject(
  id: number,
): Promise<{ id: number; balance: string }> {
  return {
    id,
    balance: await getUserBalance(id),
  };
}

export async function getUserBalance(id: number): Promise<string> {
  const balance = await Transaction.sum('value', {
    raw: true,
    where: {
      userId: id,
    },
    dataType: 'string',
  });
  return (balance || '0') as string; // because decimals
}

export function negative(decimalNumber: string): string {
  return new BN(decimalNumber).times(-1).toString();
}

export async function emitBalanceChanged(userId: number) {
  pubsub.publish(BALANCE_CHANGED, {
    balanceChanged: await getUserBalanceObject(userId),
  });
}
