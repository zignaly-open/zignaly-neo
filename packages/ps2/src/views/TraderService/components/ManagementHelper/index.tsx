import React from 'react';
import { Box } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTE_HELP_TRADER } from '../../../../routes';
import { Typography } from '@zignaly-open/ui';
import AnchorLink from '../../../../components/AnchorLink';

const ManagementHelper: React.FC = () => {
  const { t } = useTranslation('management');
  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <Typography color='neutral400'>
        <Trans i18nKey={'helper'} t={t}>
          <AnchorLink to={ROUTE_HELP_TRADER} key={'help-link'} />
        </Trans>
      </Typography>
    </Box>
  );
};

export default ManagementHelper;
