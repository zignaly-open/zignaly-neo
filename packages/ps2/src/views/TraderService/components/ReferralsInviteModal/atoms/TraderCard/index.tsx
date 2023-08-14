import { Box } from '@mui/material';
import { Avatar, ZigTypography } from '@zignaly-open/ui';
import { Service } from 'apis/service/types';
import { t } from 'i18next';
import React from 'react';
import { getServiceLogo } from 'util/images';
import { CardBox, CommissionBoostChip } from './styles';
import ServiceBoostChip from '../ServiceBoostChip';

const TraderCard = ({
  service,
  traderBoost,
}: {
  service: Service;
  traderBoost: number;
}) => {
  return (
    <CardBox
      width='228px'
      height='288px'
      display='flex'
      flexDirection={'column'}
      alignItems={'center'}
      position='relative'
      gap='12px'
      padding='42px 32px 30px'
    >
      {traderBoost > 1 && (
        <CommissionBoostChip>
          <ServiceBoostChip boost={traderBoost} />
        </CommissionBoostChip>
      )}
      <ZigTypography
        variant='h1'
        fontWeight='600'
        textAlign={'center'}
        lineHeight={'28px'}
        noWrap
        textOverflow={'ellipsis'}
        maxWidth={'170px'}
      >
        {service.name}
      </ZigTypography>
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
