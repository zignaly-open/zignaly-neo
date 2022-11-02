import { Sequelize } from 'sequelize';
import { zignalySystemId } from '../config';
import { internalTransfer } from '../src/cybavo';
import '../src/db';
import { User } from '../src/entities/users/model';
import { TransactionType } from '../src/types';

(async () => {
  const args = process.argv.slice(2);
  const address = args[0];
  const user = await User.findOne({
    where: {
      $and: Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('publicAddress')),
        Sequelize.fn('lower', address),
      ),
    },
  });
  if (!user) {
    throw new Error('User not found');
  }
  const type = (args[2] as TransactionType) ?? TransactionType.Deposit;

  const values = Object.values(TransactionType);

  if (!values.includes(type as unknown as TransactionType)) {
    throw new Error('Transaction Type not correct');
  }

  const res = await internalTransfer(
    zignalySystemId,
    address.toLowerCase(),
    args[1],
    type,
    false,
  );

  console.log(res.transaction_id);
  process.exit();
})();
