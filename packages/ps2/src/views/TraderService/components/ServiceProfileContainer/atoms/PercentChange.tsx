import React, { CSSProperties } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ChangeIndicator, ZigLink } from '@zignaly-open/ui';
import { HELP_SERVICE_PROFILE_CHART } from 'util/constants';

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
      tooltip={
        isFinite ? (
          <Trans t={t} i18nKey={'service:calculations-learn-more'}>
            <ZigLink target={'_blank'} href={HELP_SERVICE_PROFILE_CHART} />
          </Trans>
        ) : (
          t(`infinitely-${+value > 0 ? 'better' : 'worse'}`)
        )
      }
      sx={sx}
    />
  );
};

export default PercentChange;
