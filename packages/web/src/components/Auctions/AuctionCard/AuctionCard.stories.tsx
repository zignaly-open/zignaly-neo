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
  <AuctionCard {...args} />
);

const auctionObject = {
  id: '4',
  title: 'Auction #777',
  description: 'Blah blah blah blhahblah bla blah hh!',
  createdAt: new Date(),
  expiresAt: new Date(Date.now() + 3600_000),
  status: 'Active',
  basket: [
    {
      ticker: 'ETH',
      value: 500,
    },
  ],
  bids: [
    {
      value: 100,
      date: new Date(),
    },
  ],
};

export const Basic = Template.bind({});

Basic.args = {
  auction: auctionObject,
};
