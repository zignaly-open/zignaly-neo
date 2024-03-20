import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ChangeIndicator, ZigLink } from '@zignaly-open/ui';
import { HELP_SERVICE_PROFILE_CHART } from 'util/constants';
import { Box, SxProps, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { ZigTrophyIcon } from '@zignaly-open/ui/icons';

const PercentChange: React.FC<{
  id?: string;
  value: string | null | number;
  sx?: SxProps;
  showSignDoc?: boolean;
  showTrophy?: boolean;
}> = ({ id, value, sx = {}, showSignDoc, showTrophy }) => {
  const { t } = useTranslation('common');
  const isFinite = Number.isFinite(+value || 0);

  const tooltip = useMemo(
    () =>
      isFinite ? (
        showSignDoc ? (
          <Trans t={t} i18nKey={'service:calculations-learn-more'}>
            <ZigLink target={'_blank'} href={HELP_SERVICE_PROFILE_CHART} />
          </Trans>
        ) : null
      ) : (
        t(`infinitely-${+value > 0 ? 'better' : 'worse'}`)
      ),
    [],
  );

  return (
    <Box
      display={'flex'}
      gap={tooltip ? '4px' : '8px'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <ChangeIndicator
        id={id}
        value={value}
        smallPct
        sx={{ opacity: 0.9, ...sx }}
      />
      <Box display={'flex'} alignItems={'center'} gap={'8px'} mt='-6px'>
        {tooltip && (
          <Tooltip title={tooltip}>
            <InfoOutlined sx={{ color: 'neutral300', fontSize: '10px' }} />
          </Tooltip>
        )}
        {showTrophy && <ZigTrophyIcon id={id && `${id}-trophy`} />}
      </Box>
    </Box>
  );
};

export default PercentChange;
