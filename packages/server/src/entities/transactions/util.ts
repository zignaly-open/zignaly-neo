import { Transaction } from './model';

export async function getUserBalance(
  id: number,
): Promise<{ id: number; balance: number }> {
  let balance = await Transaction.sum('value', {
    where: {
      userId: id,
    },
  });
  return {
    id,
    balance: balance || 0,
  };
}
