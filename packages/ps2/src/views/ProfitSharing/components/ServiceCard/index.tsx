import { Box } from '@mui/material';
import {
  PercentageIndicator,
  ZigChartMini,
  ZigTypography,
} from '@zignaly-open/ui';
import { Investment } from 'apis/investment/types';
import { marketplaceServiceToInvestmentType } from 'apis/marketplace/util';
import AssetsInPool from 'components/AssetsInPool';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceName } from 'views/Dashboard/components/ServiceName';
import MarketplaceAction from '../MarketplaceAction';
import {
  ValueContainer,
  Card,
  ChartContainer,
  BottomPnLContainer,
  ButtonContainer,
  AssetContainer,
} from './styles';
import { ServiceCardProps } from './types';

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { t } = useTranslation(['marketplace', 'service']);

  return (
    <Card>
      <ChartContainer>
        <ZigChartMini
          data={service.sparklines}
          midLine={false}
          height={138}
          width={360}
          gradientVariant='full'
        />
      </ChartContainer>
      <ServiceName
        service={marketplaceServiceToInvestmentType(service) as Investment}
        showCoin={false}
      />
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        width={1}
        mt={2.25}
        mb={3}
      >
        <Box display='flex' flexDirection='column'>
          <ValueContainer>
            <PercentageIndicator
              style={{
                fontSize: '17px',
              }}
              value={service.pnlPercent90t}
            />
          </ValueContainer>
          <ZigTypography
            fontSize={11}
            fontWeight={500}
            color='neutral300'
            lineHeight='11px'
          >
            {t('service:periods.90d')}
          </ZigTypography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <AssetContainer>
            <AssetsInPool shorten assetsValue={service.investedUSDT} />
          </AssetContainer>
          <ZigTypography
            fontSize={11}
            fontWeight={500}
            color='neutral300'
            lineHeight='11px'
          >
            {t('card.assets')}
          </ZigTypography>
        </Box>
        <Box display='flex' flexDirection='column'>
          <ValueContainer>
            <ZigTypography color='neutral200' fontSize={17} fontWeight={500}>
              {service.investors}
            </ZigTypography>
          </ValueContainer>
          <ZigTypography
            fontSize={11}
            fontWeight={500}
            color='neutral300'
            lineHeight='11px'
          >
            {t('card.investors')}
          </ZigTypography>
        </Box>
      </Box>
      <ButtonContainer>
        <MarketplaceAction service={service} />
      </ButtonContainer>
      <BottomPnLContainer
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
        gap={1}
      >
        <ZigTypography fontSize='11px' color='neutral200'>
          {t('service:periods.30d')}
        </ZigTypography>
        <PercentageIndicator
          style={{
            fontSize: '13px',
          }}
          value={service.pnlPercent30t}
        />
      </BottomPnLContainer>
    </Card>
  );
};

export default ServiceCard;
