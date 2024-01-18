import { Box, Tooltip } from '@mui/material';
import { ChangeIndicator, ZigRisk, ZigTypography } from '@zignaly-open/ui';
import { Investment } from 'apis/investment/types';
import { marketplaceServiceToInvestmentType } from 'apis/marketplace/util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MarketplaceAction from '../MarketplaceAction';
import {
  Card,
  ButtonContainer,
  StyledServiceName,
  ChangeIndicatorContainer,
} from './styles';
import { ServiceCardProps } from './types';
import ZigChartMiniSuspensed from 'components/ZigChartMiniSuspensed';
import { InfoOutlined } from '@mui/icons-material';
import { differenceInDays } from 'date-fns';

const ServiceCard = ({ prefixId, service }: ServiceCardProps) => {
  const { t } = useTranslation('marketplace');
  const over1Year =
    differenceInDays(new Date(), new Date(service.createdAt)) > 365;

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
            value={
              over1Year ? service.pnlPercent365t : +service.pnlPercent90t * 4
            }
          />
          <ZigTypography
            variant='h5'
            color={'neutral100'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={'3px'}
          >
            {t('card.apy')}
            {!over1Year && (
              <Tooltip title={t('card.apy-calculated-tooltip')}>
                <InfoOutlined color='neutral300' sx={{ fontSize: '10px' }} />
              </Tooltip>
            )}
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
            {t('table.n-months-pnl-mobile', { count: 3 })}
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
