import React, { useEffect, useState } from 'react';
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
  const { balance, isFetching } = useCurrentBalance(service.ssc);
  const location = useLocation();
  const [needsToOpenWhenBalancesLoaded, setNeedsToOpenWhenBalancesLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    if (needsToOpenWhenBalancesLoaded && !isFetching) {
      setNeedsToOpenWhenBalancesLoaded(false);
      onClickMakeInvestment();
    }
  }, [needsToOpenWhenBalancesLoaded, isFetching]);

  const onClickMakeInvestment = () => {
    if (isAuthenticated) {
      if (isFetching) {
        setNeedsToOpenWhenBalancesLoaded(true);
        return;
      }
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
        loading={needsToOpenWhenBalancesLoaded && isFetching}
        caption={t('invest-button.invest-now')}
        bottomElement={
          <InvestButtonSubtext
            variant={'h5'}
            color='neutral150'
            fontWeight='regular'
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
