import { Balance } from './model';
import { ImportBalanceZhits } from './types';

export const getImportBalance = async (): Promise<ImportBalanceZhits> => {
  const userBalance = await Balance.aggregate('zhits', 'sum', {
    where: {
      transactionType: 'import',
    },
  });

  return {
    zhits: `${userBalance}`,
  };
};
