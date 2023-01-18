import { ZigButton } from '@zignaly-open/ui';
import React from 'react';
import {
  WithdrawFundsOptionWrapper,
  WithdrawFundsSpaceTaker,
  WithdrawFundsButtonWrapper,
} from '../styles';
import InvestorDetails from './InvestorDetails';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { ChangeViewFn, EditInvestmentViews } from '../types';

const WithdrawInvestment: React.FC<{ setView: ChangeViewFn }> = ({
  setView,
}) => {
  const { t } = useTranslation('edit-investment');

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Grid container md={8}>
        <InvestorDetails />

        <Grid
          container
          marginBottom={3}
          rowSpacing={6}
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Grid item sm={12}>
            <WithdrawFundsOptionWrapper>
              <WithdrawFundsSpaceTaker
                component={'p'}
                variant={'body1'}
                color={'neutral200'}
                weight={'regular'}
              >
                {t('modal.withdrawInvestment.freeWithdrawal.description')}
              </WithdrawFundsSpaceTaker>

              <WithdrawFundsButtonWrapper>
                <ZigButton
                  onClick={() => setView(EditInvestmentViews.WithdrawPerform)}
                  variant='contained'
                  size='large'
                >
                  {t('action:withdraw')}
                </ZigButton>
              </WithdrawFundsButtonWrapper>
            </WithdrawFundsOptionWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WithdrawInvestment;
