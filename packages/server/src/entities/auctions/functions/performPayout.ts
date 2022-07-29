import axios from 'axios';
import { Payout } from '../../payouts/model';
import { User } from '../../users/model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function performPayout(payout: Payout): Promise<void> {
  const scriptUrl = process.env.REACT_APP_SHEET_BEST_URL;
  const { discordName, username } = await User.findByPk(payout.userId);
  const payload = {
    discordName,
    username,
    publicAddress: payout.publicAddress,
    id: payout.userId,
  };
  // TODO: implement error handling. There should be some enum for possible error/success states
  await axios
    .post(scriptUrl, payload)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      throw e;
    });
}

export default performPayout;
