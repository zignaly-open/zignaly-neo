import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TicketShapeIndependent } from '../../../components/TicketShape/atoms';

const BenefitBox: React.FC<{
  label: string | JSX.Element;
  rewardAmount: number;
  currentAmount: number;
  requiredAmount: number;
  coin?: string;
  description: string;
  onAction: () => void;
  actionLabel: string | JSX.Element;
  terms: string | JSX.Element;
}> = () => {
  const { t } = useTranslation('rewards');

  return (
    <TicketShapeIndependent
      sx={{ borderRadius: '5px', height: '40px' }}
      backgroundRgb={'53, 51, 74'}
      hole={18}
    >
      <Grid container>
        <Grid item xs={12} sm={3}>
          desc value
        </Grid>
        <Grid item xs={12} sm={6}>
          desc terms progress
        </Grid>
        <Grid item xs={12} sm={3}>
          button
        </Grid>
      </Grid>
    </TicketShapeIndependent>
  );
};

export default BenefitBox;
