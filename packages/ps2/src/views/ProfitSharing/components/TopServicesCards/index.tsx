import { Box, Collapse, Grid } from '@mui/material';
import { TextButton, ZigTypography } from '@zignaly-open/ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../ServiceCard';
import { TopServicesCardsProps } from './types';

const TopServicesCards = ({ services }: TopServicesCardsProps) => {
  const { t } = useTranslation(['marketplace', 'action']);
  const [show, setShow] = useState(true);

  return (
    <Box>
      <Box display='flex' justifyContent='center' alignItems='center' m={2}>
        <ZigTypography variant='subtitle2' color='neutral400'>
          {t('card.top-rated')}
        </ZigTypography>
        <TextButton
          color={'links'}
          onClick={() => setShow(!show)}
          caption={t(show ? 'action:hide' : 'action:show')}
        />
      </Box>
      <Collapse in={show}>
        <Grid
          container
          columnSpacing={'68px'}
          rowSpacing={3}
          justifyContent='space-around'
          mb={5.5}
        >
          {services.map((s) => (
            <Grid item key={s.id}>
              <ServiceCard service={s} />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Box>
  );
};

export default TopServicesCards;
