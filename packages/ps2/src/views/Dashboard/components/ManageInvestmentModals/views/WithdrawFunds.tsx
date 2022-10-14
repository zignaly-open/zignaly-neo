import { Button, Typography } from '@zignaly-open/ui';
import React from 'react';
import {
  WithdrawFundsOptionWrapper,
  MultilineButton,
  WithdrawFundsSpaceTaker,
  WithdrawFundsButtonWrapper,
} from '../styles';
import InvestorDetails from './InvestorDetails';
import { useTranslation } from 'react-i18next';
import { Grid, useMediaQuery } from '@mui/material';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import theme from '../../../../../theme';

const WithdrawFunds: React.FC<{ setView: ChangeViewFn }> = ({ setView }) => {
  const { t } = useTranslation('edit-investment');
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <InvestorDetails />

      <Grid container marginBottom={3} rowSpacing={6}>
        <Grid item sm={12} md={6}>
          <WithdrawFundsOptionWrapper border={matchesSmall}>
            <Typography component={'p'} variant={'h2'} color={'neutral100'}>
              {t('modal.withdrawInvestment.afterPosition.title')}
            </Typography>
            <WithdrawFundsSpaceTaker
              component={'p'}
              variant={'body1'}
              color={'neutral200'}
              weight={'regular'}
            >
              {t('modal.withdrawInvestment.afterPosition.description')}
            </WithdrawFundsSpaceTaker>

            <WithdrawFundsButtonWrapper>
              <Button
                caption={
                  <MultilineButton>
                    <Typography
                      component={'p'}
                      variant={'h5'}
                      color={'neutral150'}
                    >
                      {t(
                        'modal.withdrawInvestment.afterPosition.button.subtitle',
                      )}
                    </Typography>
                    <Typography
                      component={'p'}
                      variant={'h3'}
                      color={'neutral000'}
                    >
                      {t('modal.withdrawInvestment.afterPosition.button.title')}
                    </Typography>
                  </MultilineButton>
                }
                size={'xlarge'}
                onClick={() => setView(EditInvestmentViews.WithdrawPerform)}
              />
            </WithdrawFundsButtonWrapper>
          </WithdrawFundsOptionWrapper>
        </Grid>
        <Grid item sm={12} md={6}>
          <WithdrawFundsOptionWrapper>
            <Typography component={'p'} variant={'h2'} color={'neutral100'}>
              {t('modal.withdrawInvestment.instant.title')}
            </Typography>
            <WithdrawFundsSpaceTaker
              component={'p'}
              variant={'body1'}
              color={'neutral200'}
              weight={'regular'}
            >
              {t('modal.withdrawInvestment.instant.description')}
            </WithdrawFundsSpaceTaker>
            <WithdrawFundsButtonWrapper>
              <Button
                caption={
                  <MultilineButton>
                    <Typography variant={'h5'} color={'neutral150'}>
                      {t('modal.withdrawInvestment.instant.button.subtitle')}
                    </Typography>
                    <Typography variant={'h3'} color={'neutral000'}>
                      {t('modal.withdrawInvestment.instant.button.title')}
                    </Typography>
                  </MultilineButton>
                }
                size={'xlarge'}
                disabled={true}
              />
            </WithdrawFundsButtonWrapper>
          </WithdrawFundsOptionWrapper>
        </Grid>
      </Grid>
    </>
  );
};

export default WithdrawFunds;
