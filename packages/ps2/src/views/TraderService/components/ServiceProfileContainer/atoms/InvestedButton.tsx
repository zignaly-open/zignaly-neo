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
import { Divider } from '@mui/material';

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
  variant: 'component' | 'button';
}> = ({ prefixId, service, variant }) => {
  const { investedAmount } = useIsInvestedInService(service.id);

  return (
    <InvestedButtonBase
      prefixId={prefixId}
      showMultipleAccountButton
      service={service}
      investedAmount={investedAmount}
      variant={variant}
    />
  );
};

export const InvestedInlineButton: React.FC<{
  service: Service;
  id: string;
  investedAmount: string;
}> = ({ id, investedAmount, service }) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });

  const { t } = useTranslation(['service', 'action']);
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <ZigButton
        id={id}
        size={'large'}
        onClick={() => {
          showModal(EditInvestmentModal, { serviceId: service?.id });
        }}
        sx={{
          flexDirection: 'column',
          minWidth: 165,
          padding: '6px 26px',
        }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'}>
            <ZigTypography
              variant='body2'
              color='neutral150'
              fontWeight={400}
              letterSpacing={1.1}
              lineHeight={'20px'}
            >
              {t('invested-label')}
            </ZigTypography>
            <ZigPriceLabel
              value={investedAmount}
              coin={service.ssc}
              color={'links'}
              variant={'h2'}
              coinProps={{
                color: 'links',
                fontWeight: 500,
              }}
              sx={{
                filter: 'brightness(1.3)',
              }}
            />
          </Box>
          <Divider flexItem orientation='vertical' sx={{ mx: 2 }} />

          <ZigTypography
            variant={'h3'}
            color='neutral000'
            fontWeight={600}
            sx={{ textTransform: 'uppercase !important' }}
          >
            {t('edit', { ns: 'action' })}
          </ZigTypography>
        </Box>
      </ZigButton>
    </Box>
  );
};

export const MobileInvestedButton: React.FC<{
  service: Service;
  id: string;
  investedAmount: string;
  showMultipleAccountButton?: boolean;
}> = ({ id, investedAmount, showMultipleAccountButton, service }) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });

  const investedFromAccounts = useInvestedAccountsCount(service?.id, {
    skip: !showMultipleAccountButton,
  });

  const showOtherAccounts =
    investedFromAccounts > 1 && showMultipleAccountButton;

  const { t } = useTranslation('marketplace');
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <ZigButton
        id={id}
        size={'large'}
        onClick={() => {
          showModal(EditInvestmentModal, { serviceId: service?.id });
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
      {showOtherAccounts && <OtherAccountsButton service={service} />}
    </Box>
  );
};

export const InvestedButtonBase: React.FC<{
  prefixId?: string;
  service: Service;
  investedAmount: string;
  showMultipleAccountButton?: boolean;
  variant: 'component' | 'button';
}> = ({
  prefixId,
  service,
  investedAmount,
  showMultipleAccountButton,
  variant,
}) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });
  const investedFromAccounts = useInvestedAccountsCount(service.id, {
    skip: !showMultipleAccountButton,
  });

  const onClickEditInvestment = () =>
    showModal(EditInvestmentModal, { serviceId: service.id });
  const { t } = useTranslation(['service', 'action']);

  const showOtherAccounts =
    investedFromAccounts > 1 && showMultipleAccountButton;

  const id = prefixId && `${prefixId}__invested-${service.id}`;
  if (variant === 'button') {
    return (
      <InvestedInlineButton
        service={service}
        id={id}
        investedAmount={investedAmount}
      />
    );
  }

  return (
    <InvestButtonContainer>
      <TopDivider>
        <ZigTypography variant={'body2'} fontSize={'11px'} color='neutral400'>
          {t('invested-label')}
        </ZigTypography>
      </TopDivider>

      <Box id={id}>
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
