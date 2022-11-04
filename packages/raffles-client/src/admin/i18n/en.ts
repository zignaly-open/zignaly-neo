export default {
  resources: {
    auctions: {
      name: 'Auctions',
      socials: 'Socials',
      dates: 'Dates (UTC)',
      params: 'Params',
      fields: {
        chain: 'Chain',
      },
      filters: {
        last_visited: 'Last visited',
        today: 'Today',
        this_week: 'This week',
        last_week: 'Last week',
        this_month: 'This month',
        last_month: 'Last month',
        earlier: 'Earlier',
      },
      participants: 'Participants',
    },
    codes: {
      name: 'Code',
      requirements: 'Requirements',
      benefit: 'Benefit',
      reward: 'Reward',
      redemptions: 'Redemptions',
      dates: 'Dates',
    },
    settings: {
      defaultCodeBenefit: 'Default User Code Benefit',
      defaultCodeReward: 'Default User Code Reward',
    },
  },
  errors: {
    date: {
      invalid: 'Date is invalid',
      expAfterStart: 'Expiration date must be after start date',
      maxExpAfterExp: 'Max Expiration must be after expiration',
      claimDateAfterMaxExp: 'Max claim date must be after max expiration',
    },
  },
};
