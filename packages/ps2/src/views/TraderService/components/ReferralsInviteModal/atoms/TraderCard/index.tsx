import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Avatar } from '@zignaly-open/ui';
import { Service } from 'apis/service/types';
import React from 'react';
import { getServiceLogo } from 'util/images';
import { CardBox, CommissionBoostChip, TypographyName } from './styles';
import ServiceBoostChip from '../ServiceBoostChip';
import { useTranslation } from 'react-i18next';

const TraderCard = ({
  service,
  traderBoost,
}: {
  service: Service;
  traderBoost: number;
}) => {
  const { t } = useTranslation('referrals-trader');
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  if (sm) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <Avatar
          size={80}
          alt={t('logo-alt', { name: service.name })}
          image={getServiceLogo(service.logo)}
          id={'referrals-invite-modal__avatar'}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
            gap: '0px',
          }}
        >
          <TypographyName
            variant='h1'
            fontWeight='500'
            textAlign={'center'}
            sx={{ mb: 0 }}
            id='referrals-invite-modal__service-name'
          >
            {service.name}
          </TypographyName>

          {traderBoost > 0 && (
            <ServiceBoostChip boost={traderBoost + 1} shouldShowIcon={false} />
          )}
        </Box>
      </Box>
    );
  }

  return (
    <CardBox
      width='230px'
      height='288px'
      display='flex'
      flexDirection={'column'}
      alignItems={'center'}
      position='relative'
      gap='12px'
      padding='42px 6px 30px'
    >
      {traderBoost > 0 && (
        <CommissionBoostChip>
          <ServiceBoostChip boost={traderBoost + 1} />
        </CommissionBoostChip>
      )}
      <TypographyName
        variant='h1'
        fontWeight='500'
        textAlign={'center'}
        lineHeight={'28px'}
        id='referrals-invite-modal__service-name'
      >
        {service.name}
      </TypographyName>
      <Box
        position={'relative'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Avatar
          size={134}
          alt={t('logo-alt', { name: service.name })}
          image={getServiceLogo(service.logo)}
          id={'referrals-invite-modal__avatar'}
        />
        <Box position='absolute' bottom='-28px'>
          {/* <ZScoreChip prefixId='referrals-invite-modal' score={50} /> */}
        </Box>
      </Box>
    </CardBox>
  );
};

export default TraderCard;
