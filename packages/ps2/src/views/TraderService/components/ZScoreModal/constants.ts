export const zscoreCategories = {
  profits: {
    name: 'profits.name',
    scoreId: 'zprofit',
    scoreCategoryId: 'profits',
    items: [
      {
        id: 'returns',
        label: 'profits.name',
      },
      {
        id: 'profitDays',
        label: 'profits.days-profit',
      },
      {
        id: 'benchmark',
        label: 'profits.beats-market',
      },
      {
        id: 'sortino',
        label: 'profits.sortino-ratio',
      },
    ],
  },
  risk: {
    name: 'risk.name',
    scoreId: 'zrisk',
    scoreCategoryId: 'riskManagement',
    items: [
      {
        id: 'spotOnly',
        label: 'risk.spot-only',
      },
      {
        id: 'drawdown',
        label: 'risk.max-drawdown',
      },
      {
        id: 'paidClaims',
        label: 'risk.paid-claims',
      },
      {
        id: 'sharpe',
        label: 'risk.sharpe-ratio',
      },
    ],
  },
  service: {
    name: 'service.name',
    scoreId: 'zservice',
    scoreCategoryId: 'serviceManagement',
    items: [
      {
        id: 'sbtMin',
        label: 'service.assets',
      },
      {
        id: 'sbtGrowth',
        label: 'service.asset-growth',
      },
      {
        id: 'investors',
        label: 'service.investors',
      },
      {
        id: 'age',
        label: 'service.age',
      },
    ],
  },
  balanced: {
    name: 'balance.name',
    scoreId: 'zbalanced',
    scoreCategoryId: 'balanced',
    items: [
      {
        id: 'balanced',
        label: 'balance.name',
      },
      {
        id: 'riskRewardRatio',
        label: 'balance.balanced-profit',
      },
    ],
  },
};
