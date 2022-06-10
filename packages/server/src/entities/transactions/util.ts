import { Transaction } from './model';

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
