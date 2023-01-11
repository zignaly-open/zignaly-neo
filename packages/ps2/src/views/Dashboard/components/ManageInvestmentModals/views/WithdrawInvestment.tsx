import { Button, ZigTypography } from '@zignaly-open/ui';
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
import { INSTANT_WITHDRAWAL_FEE } from 'util/constants';

const WithdrawInvestment: React.FC<{ setView: ChangeViewFn }> = ({
  setView,
}) => {
  const { t } = useTranslation('edit-investment');
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <InvestorDetails />

      <Grid container marginBottom={3} rowSpacing={6}>
        <Grid item sm={12} md={6}>
          <WithdrawFundsOptionWrapper border={matchesSmall}>
            <ZigTypography component={'p'} variant={'h2'} color={'neutral100'}>
              {t('modal.withdrawInvestment.freeWithdrawal.title')}
            </ZigTypography>
            <WithdrawFundsSpaceTaker
              component={'p'}
              variant={'body1'}
              color={'neutral200'}
              weight={'regular'}
            >
              {t('modal.withdrawInvestment.freeWithdrawal.description')}
            </WithdrawFundsSpaceTaker>

            <WithdrawFundsButtonWrapper>
              <Button
                caption={
                  <MultilineButton>
                    <ZigTypography
                      component={'p'}
                      variant={'h5'}
                      color={'neutral150'}
                    >
                      {t(
                        'modal.withdrawInvestment.freeWithdrawal.button.subtitle',
                      )}
                    </ZigTypography>
                    <ZigTypography
                      component={'p'}
                      variant={'h3'}
                      color={'neutral000'}
                    >
                      {t(
                        'modal.withdrawInvestment.freeWithdrawal.button.title',
                      )}
                    </ZigTypography>
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
            <ZigTypography component={'p'} variant={'h2'} color={'neutral100'}>
              {t('modal.withdrawInvestment.instant.title', {
                fee: INSTANT_WITHDRAWAL_FEE,
              })}
            </ZigTypography>
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
                    <ZigTypography variant={'h5'} color={'neutral150'}>
                      {t('modal.withdrawInvestment.instant.button.subtitle')}
                    </ZigTypography>
                    <ZigTypography variant={'h3'} color={'neutral000'}>
                      {t('modal.withdrawInvestment.instant.button.title', {
                        fee: INSTANT_WITHDRAWAL_FEE,
                      })}
                    </ZigTypography>
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

export default WithdrawInvestment;
