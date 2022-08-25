import { Button, Typography } from '@zignaly-open/ui';
import React from 'react';
import {
  WithdrawFundsOptionWrapper,
  MultilineButton,
  WithdrawFundsButtonWrapper,
} from '../styles';
import InvestorDetails from './InvestorDetails';
import { useTranslation } from 'react-i18next';
import { Grid, useMediaQuery } from '@mui/material';
import theme from '@zignaly-open/ui/lib/theme/theme';

const WithdrawFunds: React.FC = () => {
  const { t } = useTranslation('edit-investment');
  const matchesSmall = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <InvestorDetails />
      <Grid container marginBottom={3} rowSpacing={6}>
        <Grid item xs={12} md={6}>
          <WithdrawFundsOptionWrapper border={matchesSmall}>
            <Typography component={'p'} variant={'h2'} color={'neutral100'}>
              {t(
                'edit-investment.modal.withdrawInvestment.afterPosition.title',
              )}
            </Typography>
            <Typography component={'p'} variant={'body1'} color={'neutral200'}>
              {t(
                'edit-investment.modal.withdrawInvestment.afterPosition.description',
              )}
            </Typography>

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
                        'edit-investment.modal.withdrawInvestment.afterPosition.button.subtitle',
                      )}
                    </Typography>
                    <Typography
                      component={'p'}
                      variant={'h3'}
                      color={'neutral000'}
                    >
                      {t(
                        'edit-investment.modal.withdrawInvestment.afterPosition.button.title',
                      )}
                    </Typography>
                  </MultilineButton>
                }
                size={'xlarge'}
                onClick={() => {
                  // dispatch(openModal(modalsIds.WITHDRAW_INVESTMENT, { service }))
                }}
              />
            </WithdrawFundsButtonWrapper>
          </WithdrawFundsOptionWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <WithdrawFundsOptionWrapper>
            <Typography component={'p'} variant={'h2'} color={'neutral100'}>
              {t('edit-investment.modal.withdrawInvestment.instant.title')}
            </Typography>
            <Typography component={'p'} variant={'body1'} color={'neutral200'}>
              {t(
                'edit-investment.modal.withdrawInvestment.instant.description',
              )}
            </Typography>
            <WithdrawFundsButtonWrapper>
              <Button
                caption={
                  <MultilineButton>
                    <Typography variant={'h5'} color={'neutral150'}>
                      {t(
                        'edit-investment.modal.withdrawInvestment.instant.button.subtitle',
                      )}
                    </Typography>
                    <Typography variant={'h3'} color={'neutral000'}>
                      {t(
                        'edit-investment.modal.withdrawInvestment.instant.button.title',
                      )}
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
