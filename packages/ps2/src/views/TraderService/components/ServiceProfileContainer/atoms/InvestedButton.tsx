import React from 'react';
import { Service } from '../../../../../apis/service/types';
import {
  useInvestedAccountsCount,
  useIsInvestedInService,
  useSetSelectedInvestment,
} from '../../../../../apis/investment/use';
import { useZModal } from '../../../../../components/ZModal/use';
import { serviceToInvestmentServiceDetail } from '../../../../../apis/investment/util';
import EditInvestmentModal from '../../../../Dashboard/components/ManageInvestmentModals/EditInvestmentModal';
import { useTranslation } from 'react-i18next';
import {
  BigNumberWrapper,
  BigNumberWrapperInvested,
  InvestButtonContainer,
} from '../styles';
import {
  PencilIcon,
  PriceLabel,
  TextButton,
  Typography,
  UsdPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/system';
import OtherAccountsButton from './OtherAccountsButton';

const BigNumber: React.FC<{
  ssc?: string;
  green?: boolean;
  red?: boolean;
  value: string;
}> = ({ ssc, green = false, red = false, value }) => {
  return (
    <BigNumberWrapper>
      {ssc === 'USDT' && (
        <UsdPriceLabel value={value} green={green} red={red} />
      )}
      {ssc && ssc !== 'USDT' && (
        <PriceLabel coin={ssc} value={value} green={green} red={red} />
      )}
      {!ssc && <PriceLabel hideCoinName coin={ssc} value={value} red={red} />}
    </BigNumberWrapper>
  );
};

const InvestedButton: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { investedAmount } = useIsInvestedInService(service.id);
  return (
    <InvestedButtonBase
      showMultipleAccountButton
      service={service}
      investedAmount={investedAmount}
    />
  );
};

export const InvestedButtonBase: React.FC<{
  service: Service;
  investedAmount: string;
  showMultipleAccountButton?: boolean;
}> = ({ service, investedAmount, showMultipleAccountButton }) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });
  const selectInvestment = useSetSelectedInvestment();
  const investedFromAccounts = useInvestedAccountsCount(service.id);

  const onClickEditInvestment = () => {
    selectInvestment(serviceToInvestmentServiceDetail(service));
    showModal(EditInvestmentModal);
  };

  const { t } = useTranslation(['service', 'action']);

  const showOtherAccounts =
    investedFromAccounts > 1 && showMultipleAccountButton;

  return (
    <InvestButtonContainer>
      <Typography variant={'body2'} color='neutral200'>
        {t('invested-label')}
      </Typography>

      <BigNumberWrapperInvested>
        <BigNumber ssc={service.ssc} value={investedAmount} green />
      </BigNumberWrapperInvested>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <TextButton
          leftElement={<PencilIcon color='#65647E' width={16} height={16} />}
          caption={t('action:edit')}
          color={'links'}
          onClick={onClickEditInvestment}
        />
        {showOtherAccounts && (
          <ZigTypography color={'neutral500'}>|</ZigTypography>
        )}
        {showOtherAccounts && <OtherAccountsButton service={service} />}
      </Box>
    </InvestButtonContainer>
  );
};

export default InvestedButton;
