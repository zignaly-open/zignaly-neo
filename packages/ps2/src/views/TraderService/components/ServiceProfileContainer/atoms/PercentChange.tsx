import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import { PercentChangeContainer } from '../styles';
import { ZigTypography } from '@zignaly-open/ui';

const PercentChange: React.FC<{ value: string | null }> = ({ value }) => {
  const { t } = useTranslation('common');
  return (
    <PercentChangeContainer component={'div'}>
      <ZigTypography variant={'h6'}>
        {+value < 0 ? (
          <ArrowDropUp
            sx={{
              color: (theme) => theme.palette.neutral200,
              height: '0.75em',
              width: '0.75em',
            }}
          />
        ) : (
          <ArrowDropDown
            sx={{
              color: (theme) => theme.palette.neutral200,
              height: '0.75em',
              width: '0.75em',
              position: 'relative',
              top: '0.15em',
            }}
          />
        )}
      </ZigTypography>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      {+value > 0 ? '' : <>&ndash;</>}
      {t('common:percent', { value: Math.abs(+value) })}
    </PercentChangeContainer>
  );
};

export default PercentChange;
