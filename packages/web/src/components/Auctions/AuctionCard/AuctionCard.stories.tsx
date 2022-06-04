import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AuctionCard from './AuctionCard';

export default {
  title: 'Auction Card',
  component: AuctionCard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof AuctionCard>;

const Template: ComponentStory<typeof AuctionCard> = (args) => (
  <div
    style={{ padding: '50px', maxWidth: '300px', background: 'rgb(7, 7, 26)' }}
  >
    <AuctionCard {...args} onBid={() => alert('Bid!')} />
  </div>
);

const auctionObject = {
  id: '4',
  title: 'Auction #777',
  description: 'Blah blah blah blhahblah bla blah hh!',
  createdAt: new Date(),
  expiresAt: new Date(Date.now() + 3600_000),
  status: 'Active',
  monetaryValue: '$84.52',
  basket: [
    {
      ticker: 'ETH',
      amount: 500,
    },
  ],
  lastBid: {
    value: 100,
    date: new Date(),
  },
};

export const Basic = Template.bind({});

Basic.args = {
  auction: auctionObject,
};

export const Complete = Template.bind({});

Complete.args = {
  auction: {
    ...auctionObject,
    expiresAt: new Date(Date.now() - 3600_000),
    status: 'Complete',
  },
};

export const Winning = Template.bind({});

Winning.args = {
  auction: {
    ...auctionObject,
  },
};

export const Outbid = Template.bind({});

Outbid.args = {
  auction: {
    ...auctionObject,
  },
};
