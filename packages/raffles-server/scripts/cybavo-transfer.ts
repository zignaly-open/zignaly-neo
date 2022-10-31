import { zignalySystemId } from '../config';
import { internalTransfer } from '../src/cybavo';
import '../src/db';
import { User } from '../src/entities/users/model';
import { TransactionType } from '../src/types';

(async () => {
  const args = process.argv.slice(2);
  const address = args[0];
  const user = await User.findOne({ where: { publicAddress: address } });
  if (!user) {
    throw new Error('user not found');
  }
  const res = await internalTransfer(
    zignalySystemId,
    address.toLowerCase(),
    args[1],
    TransactionType.Deposit,
    false,
  );

  console.log(res.transaction_id);
  process.exit();
})();
