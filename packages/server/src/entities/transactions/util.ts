import { Transaction } from './model';
import { BN } from 'ethereumjs-util';
import pubsub from '../../pubsub';
import { BALANCE_CHANGED } from './constants';

export async function getUserBalance(
  id: number,
): Promise<{ id: number; balance: string }> {
  let balance = (await Transaction.sum('value', {
    raw: true,
    where: {
      userId: id,
    },
    dataType: 'string',
  })) as unknown as string; // because decimals
  return {
    id,
    balance: balance || '0',
  };
}

export function negative(decimalNumber: string): string {
  return new BN(decimalNumber).mul(new BN(-1)).toString();
}

export async function emitBalanceChanged(userId: number) {
  pubsub.publish(BALANCE_CHANGED, {
    balanceChanged: await getUserBalance(userId),
  });
}
