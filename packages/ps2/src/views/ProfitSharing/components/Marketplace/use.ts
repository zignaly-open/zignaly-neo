import { useMediaQuery, useTheme } from '@mui/material';
import { ZigFiltersType } from '@zignaly-open/ui';
import { useCallback, useMemo, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { isFeatureOn } from 'whitelabel';
import { Features } from 'whitelabel/type';

export const usePeriodVisibility = (filters: ZigFiltersType) => {
  const isZScoreOn = isFeatureOn(Features.ZScore);
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const returnsPeriod = filters.find((f) => f.id === 'pnlPeriod')
    ?.value as string;

  const periodIsShowed = useCallback(
    (days: number) => !md && returnsPeriod === `pnlPercent${days}t`,
    [returnsPeriod, md],
  );
  const defaultColumnVisibility = useMemo(
    () => ({
      pnlPercent365t: periodIsShowed(365),
      pnlPercent180t: md || periodIsShowed(180),
      pnlPercent90t: xl || (!isZScoreOn && lg) || periodIsShowed(90),
      pnlPercent30t: lg || !isZScoreOn || periodIsShowed(30),
      pnlPercent7t: periodIsShowed(7),
    }),
    [md, lg, xl, returnsPeriod],
  );
  const [columnVisibility, setColumnVisibility] = useState(
    defaultColumnVisibility,
  );
  useUpdateEffect(() => {
    setColumnVisibility(defaultColumnVisibility);
  }, [defaultColumnVisibility]);

  return { columnVisibility, setColumnVisibility, returnsPeriod };
};
