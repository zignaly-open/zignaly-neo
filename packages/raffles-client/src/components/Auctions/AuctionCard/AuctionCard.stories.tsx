import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AuctionCard from './AuctionCard';
import { GET_CURRENT_USER } from 'queries/users';

export default {
  title: 'Auction Card',
  component: AuctionCard,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    apolloClient: {
      mocks: [
        {
          request: {
            query: GET_CURRENT_USER,
          },
          result: {
            data: {
              me: {
                id: '1',
                username: 'test',
                discordName: 'user#1433',
                onboardingCompletedAt: null,
                publicAddress: '0xa438bfbc7a5ad297f2s0b0dfe338088378cccf77',
              },
            },
          },
        },
      ],
    },
  },
} as ComponentMeta<typeof AuctionCard>;

const Template: ComponentStory<typeof AuctionCard> = (args) => (
  <div style={{ padding: '50px', background: 'rgb(7, 7, 26)' }}>
    <AuctionCard {...args} />
  </div>
);

const auctionObject = {
  id: 4,
  title: 'Auction #777',
  description: 'Blah blah blah blhahblah bla blah hh!',
  createdAt: new Date(),
  expiresAt: new Date(Date.now() + 3600_000),
  monetaryValue: '$84.52',
  imageUrl: '/images/11.jpg',
  basketItems: [
    {
      ticker: 'ETH',
      amount: '500',
    },
  ],
  bids: [
    {
      id: 752,
      position: 1,
      value: '1.47',
      user: {
        id: 13,
        username: 'cemsun',
      },
    },
  ],
  numberOfWinners: 7,
};

export const Basic = Template.bind({});

Basic.args = {
  auction: auctionObject,
};

export const Basic5Winners = Template.bind({});

Basic5Winners.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 5,
    bids: [],
  },
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

export const Outbid8Winners = Template.bind({});

Outbid8Winners.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 8,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
      {
        id: 2,
        position: 2,
        value: '1.46',
        user: {
          id: 12,
          username: 'abc',
        },
      },
      {
        id: 3,
        position: 3,
        value: '1.45',
        user: {
          id: 11,
          username: 'akiek',
        },
      },
      {
        id: 4,
        position: 4,
        value: '1.45',
        user: {
          id: 10,
          username: 'cemsil',
        },
      },
      {
        id: 5,
        position: 5,
        value: '1.44',
        user: {
          id: 9,
          username: 'llan',
        },
      },
      {
        id: 6,
        position: 6,
        value: '1.43',
        user: {
          id: 8,
          username: 'lleeil',
        },
      },
      {
        id: 7,
        position: 7,
        value: '1.42',
        user: {
          id: 7,
          username: 'eeeqal',
        },
      },
      {
        id: 8,
        position: 8,
        value: '1.41',
        user: {
          id: 7,
          username: 'chrwoo',
        },
      },
      {
        id: 9,
        position: 9,
        value: '1.4',
        user: {
          id: 6,
          username: 'test',
        },
      },
    ],
    userBid: {
      id: 9,
      value: '1.40',
      position: 9,
    },
  },
};

export const Outbid7Winners = Template.bind({});

Outbid7Winners.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 7,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
      {
        id: 2,
        position: 2,
        value: '1.46',
        user: {
          id: 12,
          username: 'abc',
        },
      },
      {
        id: 3,
        position: 3,
        value: '1.45',
        user: {
          id: 11,
          username: 'akiek',
        },
      },
      {
        id: 4,
        position: 4,
        value: '1.45',
        user: {
          id: 10,
          username: 'cemsil',
        },
      },
      {
        id: 5,
        position: 5,
        value: '1.44',
        user: {
          id: 9,
          username: 'llan',
        },
      },
      {
        id: 6,
        position: 6,
        value: '1.43',
        user: {
          id: 8,
          username: 'lleeil',
        },
      },
      {
        id: 7,
        position: 7,
        value: '1.42',
        user: {
          id: 7,
          username: 'eeeqal',
        },
      },
      {
        id: 8,
        position: 8,
        value: '1.41',
        user: {
          id: 7,
          username: 'chrwoo',
        },
      },
    ],
    userBid: {
      id: 8,
      value: '1.41',
      position: 8,
    },
  },
};

export const Outbid5Winners = Template.bind({});

Outbid5Winners.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 5,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
      {
        id: 2,
        position: 2,
        value: '1.46',
        user: {
          id: 12,
          username: 'abc',
        },
      },
      {
        id: 3,
        position: 3,
        value: '1.45',
        user: {
          id: 11,
          username: 'akiek',
        },
      },
      {
        id: 4,
        position: 4,
        value: '1.45',
        user: {
          id: 10,
          username: 'cemsil',
        },
      },
      {
        id: 5,
        position: 5,
        value: '1.44',
        user: {
          id: 9,
          username: 'llan',
        },
      },
    ],
    userBid: {
      id: 8,
      value: '1.41',
      position: 8,
    },
  },
};

export const Outbid2Winners = Template.bind({});

Outbid2Winners.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 2,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
      {
        id: 2,
        position: 2,
        value: '1.46',
        user: {
          id: 12,
          username: 'abc',
        },
      },
    ],
  },
};

export const Outbid1Winner = Template.bind({});

Outbid1Winner.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 1,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
    ],
  },
};

export const WinningWithManyWinners = Template.bind({});

WinningWithManyWinners.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 10,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
      {
        id: 2,
        position: 2,
        value: '1.46',
        user: {
          id: 12,
          username: 'abc',
        },
      },
      {
        id: 3,
        position: 3,
        value: '1.45',
        user: {
          id: 11,
          username: 'akiek',
        },
      },
      {
        id: 4,
        position: 4,
        value: '1.45',
        user: {
          id: 10,
          username: 'cemsil',
        },
      },
      {
        id: 5,
        position: 5,
        value: '1.44',
        user: {
          id: 9,
          username: 'llan',
        },
      },
      {
        id: 6,
        position: 6,
        value: '1.43',
        user: {
          id: 8,
          username: 'lleeil',
        },
      },
      {
        id: 7,
        position: 7,
        value: '1.42',
        user: {
          id: 7,
          username: 'eeeqal',
        },
      },
      {
        id: 8,
        position: 8,
        value: '1.41',
        user: {
          id: 1,
          username: 'test',
        },
      },
      {
        id: 9,
        position: 9,
        value: '1.40',
        user: {
          id: 5,
          username: 'oiiia',
        },
      },
      {
        id: 10,
        position: 10,
        value: '1.39',
        user: {
          id: 4,
          username: 'ma8adk',
        },
      },
    ],
    userBid: {
      id: 8,
      value: '1.41',
      position: 8,
    },
  },
};

export const WinningWithManyWinnersBeforeLast = Template.bind({});

WinningWithManyWinnersBeforeLast.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 10,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
      {
        id: 2,
        position: 2,
        value: '1.46',
        user: {
          id: 12,
          username: 'abc',
        },
      },
      {
        id: 3,
        position: 3,
        value: '1.45',
        user: {
          id: 11,
          username: 'akiek',
        },
      },
      {
        id: 4,
        position: 4,
        value: '1.45',
        user: {
          id: 10,
          username: 'cemsil',
        },
      },
      {
        id: 5,
        position: 5,
        value: '1.44',
        user: {
          id: 9,
          username: 'llan',
        },
      },
      {
        id: 6,
        position: 6,
        value: '1.43',
        user: {
          id: 8,
          username: 'lleeil',
        },
      },
      {
        id: 7,
        position: 7,
        value: '1.42',
        user: {
          id: 7,
          username: 'eeeqal',
        },
      },
      {
        id: 8,
        position: 8,
        value: '1.41',
        user: {
          id: 2,
          username: 'akeii',
        },
      },
      {
        id: 9,
        position: 9,
        value: '1.40',
        user: {
          id: 1,
          username: 'test',
        },
      },
      {
        id: 10,
        position: 10,
        value: '1.39',
        user: {
          id: 4,
          username: 'ma8adk',
        },
      },
    ],
    userBid: {
      id: 9,
      value: '1.40',
      position: 9,
    },
  },
};

export const WinningWithManyWinnersLast = Template.bind({});

WinningWithManyWinnersLast.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 10,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
      {
        id: 2,
        position: 2,
        value: '1.46',
        user: {
          id: 12,
          username: 'abc',
        },
      },
      {
        id: 3,
        position: 3,
        value: '1.45',
        user: {
          id: 11,
          username: 'akiek',
        },
      },
      {
        id: 4,
        position: 4,
        value: '1.45',
        user: {
          id: 10,
          username: 'cemsil',
        },
      },
      {
        id: 5,
        position: 5,
        value: '1.44',
        user: {
          id: 9,
          username: 'llan',
        },
      },
      {
        id: 6,
        position: 6,
        value: '1.43',
        user: {
          id: 8,
          username: 'lleeil',
        },
      },
      {
        id: 7,
        position: 7,
        value: '1.42',
        user: {
          id: 7,
          username: 'eeeqal',
        },
      },
      {
        id: 8,
        position: 8,
        value: '1.41',
        user: {
          id: 1,
          username: 'aaeew',
        },
      },
      {
        id: 9,
        position: 9,
        value: '1.40',
        user: {
          id: 5,
          username: 'oiiia',
        },
      },
      {
        id: 10,
        position: 10,
        value: '1.39',
        user: {
          id: 1,
          username: 'test',
        },
      },
    ],
    userBid: {
      id: 10,
      value: '1.39',
      position: 10,
    },
  },
};

export const WinningWithManyWinnersTop = Template.bind({});

WinningWithManyWinnersTop.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 10,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
      {
        id: 2,
        position: 2,
        value: '1.46',
        user: {
          id: 12,
          username: 'abc',
        },
      },
      {
        id: 3,
        position: 3,
        value: '1.45',
        user: {
          id: 1,
          username: 'test',
        },
      },
      {
        id: 4,
        position: 4,
        value: '1.45',
        user: {
          id: 10,
          username: 'cemsil',
        },
      },
      {
        id: 5,
        position: 5,
        value: '1.44',
        user: {
          id: 9,
          username: 'llan',
        },
      },
      {
        id: 6,
        position: 6,
        value: '1.43',
        user: {
          id: 8,
          username: 'lleeil',
        },
      },
      {
        id: 7,
        position: 7,
        value: '1.42',
        user: {
          id: 7,
          username: 'eeeqal',
        },
      },
      {
        id: 8,
        position: 8,
        value: '1.41',
        user: {
          id: 1,
          username: 'dqls',
        },
      },
      {
        id: 9,
        position: 9,
        value: '1.40',
        user: {
          id: 5,
          username: 'oiiia',
        },
      },
      {
        id: 10,
        position: 10,
        value: '1.39',
        user: {
          id: 4,
          username: 'ma8adk',
        },
      },
    ],
    userBid: {
      id: 3,
      position: 3,
      value: '1.45',
    },
  },
};

export const ManyWinnersWithBid = Template.bind({});

ManyWinnersWithBid.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 10,
    bids: [
      {
        id: 1,
        position: 1,
        value: '1.47',
        user: {
          id: 13,
          username: 'cemsun',
        },
      },
    ],
  },
};

export const ManyWinnersWithoutBid = Template.bind({});

ManyWinnersWithoutBid.args = {
  auction: {
    ...auctionObject,
    numberOfWinners: 10,
    bids: [],
  },
};
