import React from 'react';
import { Icon } from './styles';
import { ServiceNameProps } from './types';
import { Avatar, Typography } from '@zignaly-open/ui';
import styled from 'styled-components';
import Box from '@mui/system/Box/Box';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { generatePath, useNavigate } from 'react-router-dom';
import { getServiceLogo } from '../../../../util/images';
import { useTranslation } from 'react-i18next';

export const Column = styled.div<{
  gap?: number;
  justifyContent?: 'center' | 'end' | 'start' | 'space-between';
  alignItems?: 'center' | 'end' | 'start' | 'space-between';
  textAlign?: 'end' | 'center' | 'start';
  height?: string;
  flex?: number;
  width?: string;
}>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.flex};
  gap: ${(props) => props.gap}px;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => `${props.textAlign}`};
  height: ${(props) => `${props.height}`};
  width: ${(props) => `${props.width}`};
`;

export const Row = styled.div<{
  gap?: number;
  justifyContent?: 'center' | 'end' | 'start' | 'space-between';
  alignItems?: 'center' | 'end' | 'start' | 'space-between';
  textAlign?: 'end' | 'center' | 'start' | 'left';
  height?: string;
  flex?: number;
  width?: string;
  maxWidth?: string;
  marginLeft?: string;
}>`
  display: flex;
  flex-direction: row;
  flex: ${(props) => props.flex};
  gap: ${(props) => props.gap}px;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => `${props.textAlign}`};
  height: ${(props) => `${props.height}`};
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  margin-left: ${(props) => `${props.marginLeft}`}px;
`;

export const ServiceName = ({ service }: ServiceNameProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation('table');

  return (
    <Box
      onClick={() =>
        navigate(
          generatePath(ROUTE_TRADING_SERVICE, {
            serviceId: service.serviceId?.toString(),
          }),
        )
      }
      sx={{
        cursor: 'pointer',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        textAlign: 'start',
      }}
    >
      <Icon>
        <Avatar size={'large'} image={getServiceLogo(service.serviceLogo)} />
      </Icon>
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant='body1' weight='medium' color='neutral100'>
          {service.serviceName}
        </Typography>
        <Typography variant='body2' weight='medium' color='neutral400'>
          {t('table.serviceName-by')} {service.ownerName}
        </Typography>
        <Typography variant='body2' weight='medium' color='neutral400'>
          {service.ssc}
        </Typography>
      </Box>
    </Box>
  );
};
