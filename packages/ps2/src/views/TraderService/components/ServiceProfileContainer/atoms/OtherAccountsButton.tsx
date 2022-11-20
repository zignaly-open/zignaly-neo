import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { useZModal } from '../../../../../components/ZModal/use';
import { useIsInvestedInService } from '../../../../../apis/investment/use';
import InvestedFromOtherAccounts from '../../InvestedFromOtherAccounts';
import { Box } from '@mui/material';
import { Button } from '@zignaly-open/ui';
import { StyledChevronRightIcon } from '../styles';

const OtherAccountsButton: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { t } = useTranslation('service');
  const { showModal } = useZModal();
  const isInvested = useIsInvestedInService(service.id);

  const onClickViewOther = () => {
    showModal(InvestedFromOtherAccounts, {
      service,
    });
  };

  return (
    <Box mt={2} textAlign={'center'}>
      <Button
        caption={t('invest-button.all-accounts', {
          count: Object.values(isInvested.accounts || {})?.length,
        })}
        variant={'secondary'}
        onClick={onClickViewOther}
        rightElement={<StyledChevronRightIcon />}
      />
    </Box>
  );
};

export default OtherAccountsButton;
