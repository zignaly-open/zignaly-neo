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
              lineHeight: '32px',
            }}
            value={service.pnlPercent365t}
          />
          <ZigTypography variant='h5' color={'neutral100'} mt='4px'>
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
              sx={{ mb: '4px', opacity: 0.5 }}
            />
            <Box position={'absolute'} bottom={0} left={0} right={0}>
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
            </Box>
          </Box>
          <ZigTypography variant='h5' color={'neutral100'}>
            APY
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
