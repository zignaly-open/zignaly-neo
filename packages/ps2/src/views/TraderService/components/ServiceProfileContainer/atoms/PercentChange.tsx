import React from 'react';
import { useTranslation } from 'react-i18next';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { PercentChangeContainer } from '../styles';

const PercentChange: React.FC<{ value: string | null }> = ({ value }) => {
  const { t } = useTranslation('common');
  return (
    <PercentChangeContainer component={'div'}>
      {+value > 0 ? (
        <TrendingUpIcon sx={{ mr: 1 }} />
      ) : (
        <TrendingDownIcon sx={{ mr: 1 }} />
      )}
      {/* eslint-disable-next-line i18next/no-literal-string */}
      {+value > 0 ? '' : <>&ndash;</>}
      {t('common:percent', { value: Math.abs(+value) })}
    </PercentChangeContainer>
  );
};

export default PercentChange;
