import { getUserBalance } from './cybavo';
import '../src/db';

(async () => {
  const args = process.argv.slice(2);
  const address = args[0].toLowerCase();
  const balance = await getUserBalance(address);

  console.log(balance);
  process.exit();
})();
