import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { useZModal } from '../../../../../components/ZModal/use';
import { useInvestedAccountsCount } from '../../../../../apis/investment/use';
import InvestedFromOtherAccounts from '../../InvestedFromOtherAccounts';
import { ZigButton } from '@zignaly-open/ui';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const OtherAccountsButton: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { t } = useTranslation('service');
  const investedFromAccounts = useInvestedAccountsCount(service.id);
  const { showModal } = useZModal();

  const onClickViewOther = () => {
    showModal(InvestedFromOtherAccounts, {
      service,
    });
  };

  return (
    <ZigButton
      variant={'text'}
      id={'service__see-all'}
      onClick={onClickViewOther}
      sx={{ fontSize: '11px !important' }}
      endIcon={<ChevronRightIcon />}
    >
      {t('invest-button.all-accounts', {
        count: investedFromAccounts,
      })}
    </ZigButton>
  );
};

export default OtherAccountsButton;
