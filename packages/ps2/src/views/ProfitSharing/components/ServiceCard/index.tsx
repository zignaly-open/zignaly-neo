import { Box } from '@mui/material';
import {
  ChangeIndicator,
  ZScore,
  ZigRisk,
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
  ButtonContainer,
  StyledServiceName,
  ChangeIndicatorContainer,
} from './styles';
import { ServiceCardProps } from './types';
import { useZModal } from 'components/ZModal/use';
import ZScoreModal from 'views/TraderService/components/ZScoreModal';
import ZigChartMiniSuspensed from 'components/ZigChartMiniSuspensed';
import { NumericFormat } from 'react-number-format';

const ServiceCard = ({ prefixId, service }: ServiceCardProps) => {
  const { t } = useTranslation(['marketplace', 'service']);
  return (
    <Card>
      <StyledServiceName
        prefixId={prefixId}
        service={marketplaceServiceToInvestmentType(service) as Investment}
        showCoin={false}
        zscore={service.zscore}
        activeLink={false}
      />

      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems={'flex-end'}
        width={1}
        mt={'30px'}
        mb={'24px'}
      >
        <ZigRisk value={service.zrisk} />
        <Box display={'flex'} flexDirection={'column'}>
          <ChangeIndicator
            decimalScale={1}
            type={'default'}
            id={`service-card__pnl365-${service.id}`}
            style={{
              fontSize: '24px',
              lineHeight: '33px',
            }}
            value={+service.pnlPercent90t * 4}
          />
          <ZigTypography variant='h5' color={'neutral100'}>
            APY
          </ZigTypography>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <Box position={'relative'}>
            <ZigChartMiniSuspensed
              id={prefixId && `${prefixId}__card-chart-${service.id}`}
              data={[0, ...service.sparklines]}
              midLine={false}
              height={32}
              width={88}
              gradientVariant='card'
              chartProps={{
                padding: 0,
              }}
              sx={{ mb: '4px', opacity: 0.6 }}
            />
            <ChangeIndicatorContainer>
              <ChangeIndicator
                decimalScale={1}
                type={'default'}
                id={`service-card__pnl90-${service.id}`}
                style={{
                  fontSize: '16px',
                  lineHeight: '28px',
                }}
                value={service.pnlPercent90t}
              />
            </ChangeIndicatorContainer>
          </Box>
          <ZigTypography variant='h5' color={'neutral100'}>
            3M PNL
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
