import { useTranslation } from 'react-i18next';
import { ZScoreConfig } from './types';

export const useZScoreConfig = (): ZScoreConfig => {
  const { t } = useTranslation('z-score');

  return {
    profits: {
      name: 'profits.name',
      scoreId: 'zprofit',
      scoreCategoryId: 'profits',
      items: [
        {
          id: 'returns',
          label: t('profits.name'),
          valueId: 'pnlPctPeriod',
          valueType: 'pct',
        },
        {
          id: 'benchmark',
          label: t('profits.beats-market'),
          valueId: 'beatsMarket',
          valueType: 'bool',
        },
        {
          id: 'profitDays',
          label: t('profits.days-profit'),
          valueId: 'winDays',
          valueType: 'duration-day',
        },
        {
          id: 'sortino',
          label: t('profits.sortino-ratio'),
          valueId: 'sortinoRatio',
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
          label: t('risk.spot-only'),
          valueId: 'isSpotOnly',
          valueType: 'bool',
        },
        {
          id: 'drawdown',
          label: t('risk.max-drawdown'),
          valueId: 'maxDrawdownPct',
          valueType: 'pct',
        },
        {
          id: 'paidClaims',
          label: t('risk.paid-claims'),
          valueId: 'daysAgoLastPaid',
          valueType: 'duration-day',
        },
        {
          id: 'sharpe',
          label: t('risk.sharpe-ratio'),
          valueId: 'sharpeRatio',
        },
      ],
    },
    service: {
      name: 'service.name',
      scoreId: 'zservice',
      scoreCategoryId: 'serviceManagement',
      items: [
        {
          id: 'sbtGrowth',
          label: t('service.asset-growth'),
          valueId: 'sbtGrowthPct',
          valueType: 'pct',
        },
        {
          id: 'sbtMin',
          label: t('service.assets'),
          valueId: 'sbtEnd',
          valueType: 'amount',
        },
        {
          id: 'investors',
          label: t('service.investors'),
          valueId: 'investorsGrowthPct',
          valueType: 'pct',
        },
        {
          id: 'age',
          label: t('service.age'),
          valueId: 'ageDays',
          valueType: 'duration-day',
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
          label: t('balance.balanced-profit-risk'),
          valueId: 'isBalanced',
          valueType: 'bool',
        },
        {
          id: 'riskRewardRatio',
          label: t('balance.ratio'),
          valueId: 'riskRewardRatio',
        },
      ],
    },
  };
};
