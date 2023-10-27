import React from 'react';
import { Service } from '../../../../../apis/service/types';
import {
  useInvestedAccountsCount,
  useIsInvestedInService,
} from '../../../../../apis/investment/use';
import { useZModal } from '../../../../../components/ZModal/use';
import EditInvestmentModal from '../../../../Dashboard/components/ManageInvestmentModals/EditInvestmentModal';
import { useTranslation } from 'react-i18next';
import { BigNumberWrapper, InvestButtonContainer, TopDivider } from '../styles';
import {
  trimZeros,
  ZigButton,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
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
        variant={'h2'}
        coinProps={{
          paddingTop: '3px',
        }}
      />
    </BigNumberWrapper>
  );
};

const InvestedButton: React.FC<{
  prefixId?: string;
  service: Service;
}> = ({ prefixId, service }) => {
  const { investedAmount } = useIsInvestedInService(service.id);
  return (
    <InvestedButtonBase
      prefixId={prefixId}
      showMultipleAccountButton
      service={service}
      investedAmount={investedAmount}
    />
  );
};

export const MobileInvestedButton: React.FC<{
  serviceId: string;
  id: string;
  investedAmount: string;
}> = ({ serviceId, id, investedAmount }) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });
  const { t } = useTranslation('marketplace');
  return (
    <ZigButton
      id={id}
      size={'large'}
      onClick={() => {
        showModal(EditInvestmentModal, { serviceId: serviceId });
      }}
      sx={{
        flexDirection: 'column',
        minWidth: 165,
        padding: '6px 26px',
      }}
    >
      <>
        <ZigTypography
          variant='body2'
          color='neutral000'
          fontWeight={600}
          letterSpacing={1.1}
          lineHeight={'20px'}
          sx={{ textTransform: 'uppercase !important' }}
        >
          {t('table.invested', {
            invested: trimZeros(Number(investedAmount).toFixed(2)),
          })}
        </ZigTypography>

        <ZigTypography
          variant={'caption'}
          component='p'
          color='neutral150'
          fontWeight={500}
        >
          {t('table.edit')}
        </ZigTypography>
      </>
    </ZigButton>
  );
};

export const InvestedButtonBase: React.FC<{
  prefixId?: string;
  service: Service;
  investedAmount: string;
  showMultipleAccountButton?: boolean;
}> = ({ prefixId, service, investedAmount, showMultipleAccountButton }) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });
  const investedFromAccounts = useInvestedAccountsCount(service.id, {
    skip: !showMultipleAccountButton,
  });

  const onClickEditInvestment = () =>
    showModal(EditInvestmentModal, { serviceId: service.id });
  const { t } = useTranslation(['service', 'action']);

  const showOtherAccounts =
    investedFromAccounts > 1 && showMultipleAccountButton;

  return (
    <InvestButtonContainer>
      <TopDivider>
        <ZigTypography variant={'body2'} fontSize={'11px'} color='neutral400'>
          {t('invested-label')}
        </ZigTypography>
      </TopDivider>

      <Box id={prefixId && `${prefixId}__invested-${service.id}`}>
        <BigNumber ssc={service.ssc} value={investedAmount} green />
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
          sx={{ fontSize: '11px !important' }}
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
