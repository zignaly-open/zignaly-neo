import { Box, Tooltip } from '@mui/material';
import { ChangeIndicator, ZigRisk, ZigTypography } from '@zignaly-open/ui';
import { ZigCalendar1YIcon, ZigCalendar3MIcon } from '@zignaly-open/ui/icons';
import { Investment } from 'apis/investment/types';
import { marketplaceServiceToInvestmentType } from 'apis/marketplace/util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MarketplaceAction from '../MarketplaceAction';
import { Card, StyledServiceName, ChangeIndicatorContainer } from './styles';
import { ServiceCardProps } from './types';
import { InfoOutlined } from '@mui/icons-material';
import { differenceInDays } from 'date-fns';
import { ReactComponent as ChartRed } from 'images/chart-red.svg';
import { ReactComponent as ChartGreen } from 'images/chart-green.svg';

const ServiceCard = ({ prefixId, service }: ServiceCardProps) => {
  const { t } = useTranslation('marketplace');
  const over1Year =
    differenceInDays(new Date(), new Date(service.createdAt)) > 365;
  const ChartImage = +service.pnlPercent90t > 0 ? ChartGreen : ChartRed;

  return (
    <Card>
      <StyledServiceName
        prefixId={prefixId}
        service={marketplaceServiceToInvestmentType(service) as Investment}
        showCoin={false}
        zscore={service.zscore}
        activeLink
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
        <ZigRisk
          value={service.zrisk}
          id={`service-card__risk-${service.id}`}
        />
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
            indicatorPostion='left'
          />
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={1}
          >
            <ZigCalendar1YIcon fontSize='19px' />
            <ZigTypography
              variant='h5'
              color={'neutral100'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={'3px'}
              mt='2px'
              id={`service-card__pnl365-label-${service.id}`}
            >
              {t('card.apy')}
              {!over1Year && (
                <Tooltip title={t('card.apy-calculated-tooltip')}>
                  <InfoOutlined color='neutral300' sx={{ fontSize: '10px' }} />
                </Tooltip>
              )}
            </ZigTypography>
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <Box position={'relative'} width={88} height={38}>
            <ChartImage
              width={'100%'}
              height={'100%'}
              id={`service-card__pnl90-chart-${service.id}`}
            />
            <ChangeIndicatorContainer>
              <ChangeIndicator
                type='graph'
                decimalScale={1}
                id={`service-card__pnl90-${service.id}`}
                style={{
                  fontSize: '16px',
                  lineHeight: '28px',
                }}
                indicatorPostion='left'
                value={service.pnlPercent90t}
              />
            </ChangeIndicatorContainer>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={1}
            pl='14px'
          >
            <ZigCalendar3MIcon fontSize='19px' />
            <ZigTypography
              variant='h5'
              color={'neutral100'}
              mt='2px'
              id={`service-card__pnl90-label-${service.id}`}
            >
              {t('card.pnl')}
            </ZigTypography>
          </Box>
        </Box>
      </Box>
      <MarketplaceAction
        service={service}
        prefixId={prefixId}
        showRocket
        investedVariant='button'
      />
    </Card>
  );
};

export default ServiceCard;
