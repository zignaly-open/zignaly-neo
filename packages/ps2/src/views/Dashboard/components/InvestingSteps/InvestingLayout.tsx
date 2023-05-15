import React from 'react';
import InvestingStep from './InvestingStep';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTE_PROFIT_SHARING } from '../../../../routes';

const InvestingLayout: React.FC = () => {
  const { t } = useTranslation('my-dashboard');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 100px',
      }}
    >
      <ZigTypography variant='h1' sx={{ ml: 5 }}>
        {t('how-to-invest-steps.title')}
      </ZigTypography>
      <Grid
        container
        sx={{ mt: 3, mb: 3, mr: 5, gap: 7, justifyContent: 'center' }}
      >
        <Grid item xs={12} md={3.5}>
          <InvestingStep step={1} />
        </Grid>
        <Grid item xs={12} md={3.5}>
          <InvestingStep step={2} />
        </Grid>
        <Grid item xs={12} md={3.5}>
          <InvestingStep step={3} />
        </Grid>
      </Grid>
      <Box sx={{ padding: '0 12px', minWidth: 134 }}>
        <Link to={ROUTE_PROFIT_SHARING}>
          <ZigButton
            id={'my-portfolio-steps__marketplace'}
            variant='contained'
            sx={{
              ml: 5,
            }}
            size={'xlarge'}
          >
            {t('how-to-invest-steps.start-investing')}
          </ZigButton>
        </Link>
      </Box>
      <Box
        sx={{ display: 'flex', mt: 5, flexDirection: 'column', width: '100%' }}
      >
        <ZigTypography variant={'h2'} sx={{ mb: 2 }}>
          {t('how-to-invest-steps.bottom-title')}
        </ZigTypography>
        <Paper sx={{ p: 2, mb: '20px' }}>
          <ZigTypography>
            {t('how-to-invest-steps.bottom-description')}
          </ZigTypography>
        </Paper>
      </Box>
    </Box>
  );
};

export default InvestingLayout;
