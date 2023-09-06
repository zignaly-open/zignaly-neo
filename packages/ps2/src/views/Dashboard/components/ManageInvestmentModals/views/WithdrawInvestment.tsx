import {
  ZigButton,
  ZigTypography,
  ZigModalForm,
  ZigModalActions,
} from '@zignaly-open/ui';
import React from 'react';
import InvestorDetails from './InvestorDetails';
import { useTranslation } from 'react-i18next';
import { ChangeViewFn, EditInvestmentViews } from '../types';

const WithdrawInvestment: React.FC<{ setView: ChangeViewFn }> = ({
  setView,
}) => {
  const { t } = useTranslation('edit-investment');

  return (
    <ZigModalForm component='div'>
      <InvestorDetails prefixId={'withdraw-modal'} />
      <ZigTypography
        textAlign={'center'}
        variant={'body1'}
        color={'neutral200'}
        id={'withdraw-modal__description'}
        mt={'-36px'}
      >
        {t('modal.withdrawInvestment.freeWithdrawal.description')}
      </ZigTypography>

      <ZigModalActions>
        <ZigButton
          id={'withdraw-modal__confirm-withdraw'}
          onClick={() => setView(EditInvestmentViews.WithdrawPerform)}
          variant='contained'
          size={'large'}
        >
          {t('action:withdraw')}
        </ZigButton>
      </ZigModalActions>
    </ZigModalForm>
  );
};

export default WithdrawInvestment;
