import { Box } from '@mui/material';
import { ChangeIndicator, ZigChartMini, ZigTypography } from '@zignaly-open/ui';
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
  BottomPnLContainer,
  ButtonContainer,
  AssetContainer,
  ChartBox,
} from './styles';
import { ServiceCardProps } from './types';

const ServiceCard = ({ prefixId, service }: ServiceCardProps) => {
  const { t } = useTranslation(['marketplace', 'service']);

  return (
    <Card>
      <ChartBox>
        <ZigChartMini
          id={prefixId && `${prefixId}__chart-${service.id}`}
          data={[0, ...service.sparklines]}
          midLine={false}
          height={104}
          width={360}
          gradientVariant='card'
          chartProps={{
            padding: 0,
          }}
        />
        <BottomPnLContainer
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          gap={1}
          flex={1}
          negative={+service.pnlPercent30t < 0}
        >
          <ZigTypography fontSize='11px' color='neutral200'>
            {t('service:periods.30d')}
          </ZigTypography>
          <ChangeIndicator
            style={{
              fontSize: '13px',
            }}
            value={service.pnlPercent30t}
          />
        </BottomPnLContainer>
      </ChartBox>
      <Box height={70}>
        <ServiceName
          prefixId={prefixId}
          service={marketplaceServiceToInvestmentType(service) as Investment}
          showCoin={false}
        />
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        width={1}
        mt={2.5}
        mb={3}
        px={2}
      >
        <Box display='flex' flexDirection='column' flex={1}>
          <ValueContainer>
            <ChangeIndicator
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
        <Box display='flex' flexDirection='column' flex={1}>
          <AssetContainer>
            <AssetsInPool
              prefixId={prefixId}
              serviceId={service.id}
              shorten
              assetsValue={service.investedUSDT}
            />
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
        <Box display='flex' flexDirection='column' flex={1}>
          <ValueContainer>
            <ZigTypography
              color='neutral200'
              fontSize={17}
              fontWeight={500}
              id={prefixId && `${prefixId}__investors-${service.id}`}
            >
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
        <MarketplaceAction service={service} prefixId={prefixId} />
      </ButtonContainer>
    </Card>
  );
};

export default ServiceCard;
