import { Box } from '@mui/material';
import {
  PercentageIndicator,
  ZigButton,
  ZigTypography,
} from '@zignaly-open/ui';
import { Investment } from 'apis/investment/types';
import { marketplaceServiceToInvestmentType } from 'apis/marketplace/util';
import AssetsInPool from 'components/AssetsInPool';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceName } from 'views/Dashboard/components/ServiceName';
import MarketplaceAction from '../MarketplaceAction';
import { Card } from './styles';
import { ServiceCardProps } from './types';

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { t } = useTranslation('marketplace');

  return (
    <Card>
      <ServiceName
        service={marketplaceServiceToInvestmentType(service) as Investment}
      />
      {/* <ZigTypography>{service.name}</ZigTypography> */}
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        width={1}
        mb={2}
      >
        <Box display='flex' flexDirection='column'>
          <PercentageIndicator
            style={{
              fontSize: '18px',
              lineHeight: '28px',
            }}
            value={service.pnlPercent90t}
          />
          <ZigTypography>{t('card.short-month', { count: 3 })}</ZigTypography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <AssetsInPool shorten assetsValue={service.investedUSDT} />
          <ZigTypography>{t('card.assets')}</ZigTypography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <ZigTypography>{service.investors}</ZigTypography>
          <ZigTypography>{t('card.investors')}</ZigTypography>
        </Box>
      </Box>
      <MarketplaceAction service={service} />
      <Box
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
        width={1}
        gap={1}
        mt={1}
      >
        <ZigTypography fontSize='11px' color='neutral200'>
          {t('card.n-months', { count: 1 })}
        </ZigTypography>
        <PercentageIndicator
          style={{
            fontSize: '18px',
            lineHeight: '28px',
          }}
          value={service.pnlPercent30t}
        />
      </Box>
    </Card>
  );
};

export default ServiceCard;
