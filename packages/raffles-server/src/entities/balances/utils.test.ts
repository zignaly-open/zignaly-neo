import { Balance } from './model';
import { UserBalanceZhits } from './types';

export const getUserBalance = async (
  walletAddress: string,
): Promise<UserBalanceZhits> => {
  const userBalance = await Balance.aggregate('zhits', 'sum', {
    where: {
      walletAddress,
    },
  });

  return {
    walletAddress,
    zhits: `${userBalance}`,
  };
};
