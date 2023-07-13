import { Box } from '@mui/material';
import { Avatar, ZigTypography } from '@zignaly-open/ui';
import { Service } from 'apis/service/types';
import ZScoreChip from 'components/ZScoreChip';
import { t } from 'i18next';
import React from 'react';
import { getServiceLogo } from 'util/images';

const TraderCard = ({ service }: { service: Service }) => {
  return (
    <Box
      width='228px'
      display='flex'
      flexDirection={'column'}
      alignItems={'center'}
      position='relative'
      gap='12px'
      sx={{
        borderRadius: '7.5px',
        border: 'solid 1px #25233c',
        backgroundImage: 'radial-gradient(circle at 0 0, #131e53, #090824)',
      }}
    >
      <ZigTypography variant='h1' fontWeight='600'>
        {service.name}
      </ZigTypography>
      <Avatar
        size={134}
        alt={t('logo-alt', { name: service.name })}
        image={getServiceLogo(service.logo)}
        id={'referrals-invite-modal__avatar'}
      />
      <Box position='absolute' bottom='-28px'>
        <ZScoreChip prefixId='referrals-invite-modal' score={50} />
      </Box>
    </Box>
  );
};

export default TraderCard;
