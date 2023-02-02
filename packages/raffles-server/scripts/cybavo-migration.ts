import { getUserBalance } from './cybavo';
import { User } from '../src/entities/users/model';
import { importBalance } from '../src/entities/balances/service';

import '../src/db';

const BATCH_SIZE = 1000;

(async () => {
  const time = new Date().getTime();
  const users = await User.findAll({});
  const totalUsers = users.length;
  let currentIndex = 0;

  try {
    while (currentIndex < totalUsers) {
      const batchUsers = users.slice(currentIndex, currentIndex + BATCH_SIZE);
      currentIndex += BATCH_SIZE;

      for (let i = 0; i < batchUsers.length; i++) {
        const user = batchUsers[i];
        const userBalance = {
          walletAddress: user.publicAddress,
          zhits: await getUserBalance(user.publicAddress),
        };
        if (Number(userBalance.zhits) > 0) {
          await importBalance(userBalance);
        }
      }
      const partialTime = new Date().getTime() - time;
      console.log('totalTime in minutes', partialTime / (1000 * 60));
    }
  } catch (error) {
    console.log(error.message);
  }

  const totalTime = new Date().getTime() - time;
  console.log('totalTime in minutes', totalTime / (1000 * 60));
  process.exit();
})();
