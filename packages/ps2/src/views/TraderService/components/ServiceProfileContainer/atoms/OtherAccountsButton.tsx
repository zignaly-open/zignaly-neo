import React from 'react';
import { Service } from '../../../../../apis/ps2/service/types';
import { useTranslation } from 'react-i18next';
import { useZModal } from '../../../../../components/ZModal/use';
import { useInvestedAccountsCount } from '../../../../../apis/ps2/investment/use';
import InvestedFromOtherAccounts from '../../InvestedFromOtherAccounts';
import { TextButton } from '@zignaly-open/ui';
import { StyledChevronRightIcon } from '../styles';
import { Box } from '@mui/material';

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
    <TextButton
      id={'service__see-all'}
      caption={t('invest-button.all-accounts', {
        count: investedFromAccounts,
      })}
      onClick={onClickViewOther}
      rightElement={
        <Box ml={-1}>
          <StyledChevronRightIcon />
        </Box>
      }
    />
  );
};

export default OtherAccountsButton;
