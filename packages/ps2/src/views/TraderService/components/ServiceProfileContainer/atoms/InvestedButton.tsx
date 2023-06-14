import React from 'react';
import { Service } from '../../../../../apis/service/types';
import {
  useInvestedAccountsCount,
  useIsInvestedInService,
} from '../../../../../apis/investment/use';
import { useZModal } from '../../../../../components/ZModal/use';
import EditInvestmentModal from '../../../../Dashboard/components/ManageInvestmentModals/EditInvestmentModal';
import { useTranslation } from 'react-i18next';
import {
  BigNumberWrapper,
  BigNumberWrapperInvested,
  InvestButtonContainer,
  TopDivider,
} from '../styles';
import { ZigButton, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import OtherAccountsButton from './OtherAccountsButton';
import EditIcon from '@mui/icons-material/Edit';

const BigNumber: React.FC<{
  ssc?: string;
  green?: boolean;
  shorten?: boolean;
  red?: boolean;
  value: string;
}> = ({ ssc, green = false, shorten, red = false, value }) => {
  return (
    <BigNumberWrapper>
      <ZigPriceLabel
        value={value}
        coin={ssc}
        shorten={shorten}
        color={green ? 'greenGraph' : red ? 'redGraphOrError' : undefined}
      />
    </BigNumberWrapper>
  );
};

const InvestedButton: React.FC<{
  prefixId?: string;
  service: Service;
  ctaId?: string;
}> = ({ prefixId, ctaId, service }) => {
  const { investedAmount } = useIsInvestedInService(service.id);
  return (
    <InvestedButtonBase
      prefixId={prefixId}
      ctaId={ctaId}
      showMultipleAccountButton
      service={service}
      investedAmount={investedAmount}
    />
  );
};

export const InvestedButtonBase: React.FC<{
  prefixId?: string;
  service: Service;
  ctaId?: string;
  investedAmount: string;
  showMultipleAccountButton?: boolean;
}> = ({
  prefixId,
  service,
  investedAmount,
  ctaId,
  showMultipleAccountButton,
}) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });
  const investedFromAccounts = useInvestedAccountsCount(service.id, {
    skip: !showMultipleAccountButton,
  });

  const onClickEditInvestment = () =>
    showModal(EditInvestmentModal, { ctaId, serviceId: service.id });
  const { t } = useTranslation(['service', 'action']);

  const showOtherAccounts =
    investedFromAccounts > 1 && showMultipleAccountButton;

  return (
    <InvestButtonContainer>
      <TopDivider>
        <ZigTypography variant={'body2'} color='neutral400'>
          {t('invested-label')}
        </ZigTypography>
      </TopDivider>

      <Box>
        <BigNumberWrapperInvested
          id={prefixId && `${prefixId}__invested-${service.id}`}
        >
          <BigNumber ssc={service.ssc} value={investedAmount} green />
        </BigNumberWrapperInvested>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <ZigButton
          variant={'text'}
          id={prefixId && `${prefixId}__edit-${service.id}`}
          startIcon={<EditIcon sx={{ width: '12px', height: '12px' }} />}
          onClick={onClickEditInvestment}
        >
          {t('action:edit')}
        </ZigButton>
        {showOtherAccounts && (
          // eslint-disable-next-line i18next/no-literal-string
          <ZigTypography color={'neutral500'} sx={{ ml: 0.5, mr: 0.5 }}>
            |
          </ZigTypography>
        )}
        {showOtherAccounts && <OtherAccountsButton service={service} />}
      </Box>
    </InvestButtonContainer>
  );
};

export default InvestedButton;
