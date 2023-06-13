import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import InvestorDetails from './InvestorDetails';
import { useTranslation } from 'react-i18next';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import { Form, ModalActions } from 'components/ZModal';

const WithdrawInvestment: React.FC<{ setView: ChangeViewFn }> = ({
  setView,
}) => {
  const { t } = useTranslation('edit-investment');

  return (
    <Form component='div'>
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

      <ModalActions>
        <ZigButton
          id={'withdraw-modal__confirm-withdraw'}
          onClick={() => setView(EditInvestmentViews.WithdrawPerform)}
          variant='contained'
          size={'large'}
        >
          {t('action:withdraw')}
        </ZigButton>
      </ModalActions>
    </Form>
  );
};

export default WithdrawInvestment;
