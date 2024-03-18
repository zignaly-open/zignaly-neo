import React, { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangeIndicator } from '@zignaly-open/ui';

const PercentChange: React.FC<{
  id?: string;
  value: string | null | number;
  sx?: CSSProperties;
}> = ({ id, value, sx }) => {
  const { t } = useTranslation('common');
  const isFinite = Number.isFinite(+value || 0);

  return (
    <ChangeIndicator
      id={id}
      value={value}
      smallPct
      labelTooltip={
        isFinite ? '' : t(`infinitely-${+value > 0 ? 'better' : 'worse'}`)
      }
      sx={sx}
    />
  );
};

export default PercentChange;
