import React from 'react';
import { ZigButton } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const FilterButtons: React.FC<{ onClick: () => void; onClear: () => void }> = ({
  onClick,
  onClear,
}) => {
  const { t } = useTranslation('common');

  return (
    <Box
      sx={{
        flex: 0,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        display: 'flex',
        gap: 2,
      }}
    >
      <ZigButton size='medium' onClick={onClick} startIcon={<SearchIcon />}>
        {t('common:filter')}
      </ZigButton>

      <ZigButton
        size='medium'
        variant={'text'}
        onClick={onClear}
        startIcon={<ClearIcon />}
      >
        {t('common:clear')}
      </ZigButton>
    </Box>
  );
};

export default FilterButtons;
