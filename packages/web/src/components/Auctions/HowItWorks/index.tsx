import { Box } from '@mui/system';
import React from 'react';
import { Typography } from 'zignaly-ui';
import { BulletPointItem, HowItWorksList } from './styles';

const HowItWorks = () => {
  return (
    <Box
      width='65%'
      marginTop='20px'
      marginBottom='20px'
      display='flex'
      flexDirection='column'
    >
      <Typography variant='body1' weight='regular' color='neutral100'>
        With the ‘ZigRaffle’ we are changing how the raffles on zignaly.com
        function, adding an array of new features and offerings. Users can now
        directly connect their wallets and place bids on the different auctions
        happening on the “Raffles Marketplace”. Be it the whitelist spots to
        your favorite NFT collection or that basket of tokens going at a deep
        discount, you can put your ZIG to work and place your bids at ZigRaffle.
        <br />
        <br />
        <Box>
          <Typography variant='h3' weight='demibold' color='neutral000'>
            How It Works?
          </Typography>
        </Box>
        <HowItWorksList>
          <BulletPointItem>
            Connect your wallet directly to the ZigRaffle site. We will ask for
            your Discord usernames to share instructions with the auction
            winners.
          </BulletPointItem>
          <br />
          <BulletPointItem>
            Deposit ZIG to your wallet and start placing bids on your favorite
            auctions.
          </BulletPointItem>
          <br />
          <BulletPointItem>
            Since our model allows having more than one winner, we will be
            displaying the names of “current winners” in real time under each
            auction. As a new bid comes up, the “current winners” list will be
            updated until the auction is over.
          </BulletPointItem>
          <br />
          <BulletPointItem>
            Once the auction ends, the winner(s) will pay the “Claim” price for
            the product, directly from the connected wallet.
          </BulletPointItem>
          <br />
          <BulletPointItem>
            Users may opt to buy the product directly from the auction using the
            “Buy now” button.
          </BulletPointItem>
          <br />
          <BulletPointItem>
            We are extending the range of offerings from NFT whitelist spots to
            Crypto baskets and other items, moving on.{' '}
          </BulletPointItem>
        </HowItWorksList>
      </Typography>
    </Box>
  );
};

export default HowItWorks;
