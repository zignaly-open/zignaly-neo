import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import {
  useIsAuthenticated,
  useSetMissedRoute,
} from '../../../../../apis/user/use';
import { useZModal } from '../../../../../components/ZModal/use';
import { useSetSelectedInvestment } from '../../../../../apis/investment/use';
import { useNavigate } from 'react-router-dom';
import { serviceToInvestmentServiceDetail } from '../../../../../apis/investment/util';
import InvestModal from '../../../../Dashboard/components/ManageInvestmentModals/InvestModal';
import { ROUTE_LOGIN } from '../../../../../routes';
import { InvestButtonSubtext, InvestButtonWrap } from '../styles';
import { Button } from '@zignaly-open/ui';

const InvestButton: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { t } = useTranslation('service');
  const isAuthenticated = useIsAuthenticated();
  const { showModal } = useZModal();
  const selectInvestment = useSetSelectedInvestment();
  const navigate = useNavigate();
  const setMissedRoute = useSetMissedRoute();

  const onClickMakeInvestment = () => {
    if (isAuthenticated) {
      selectInvestment(serviceToInvestmentServiceDetail(service));
      showModal(InvestModal);
    } else {
      setMissedRoute();
      navigate(ROUTE_LOGIN);
    }
  };

  return (
    <InvestButtonWrap>
      <Button
        onClick={onClickMakeInvestment}
        caption={t('invest-button.invest-now')}
        bottomElement={
          <InvestButtonSubtext
            variant={'h5'}
            color='neutral150'
            weight='regular'
          >
            {t('invest-button.x-success-fee', {
              fee: service.successFee,
            })}
          </InvestButtonSubtext>
        }
        variant={'primary'}
        size={'xlarge'}
      />
    </InvestButtonWrap>
  );
};

export default InvestButton;
