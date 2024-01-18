import { Grid } from '@mui/material';
import React from 'react';
import ServiceCard from '../ServiceCard';
import { TopServicesCardsProps } from './types';

const TopServicesCards = ({ prefixId, services }: TopServicesCardsProps) => {
  return (
    <Grid
      container
      columnSpacing={'48px'}
      rowSpacing={3}
      justifyContent='space-around'
      mb={'28px'}
    >
      {services.map((s) => (
        <Grid item key={s.id}>
          <ServiceCard prefixId={prefixId && `${prefixId}-cards`} service={s} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopServicesCards;
