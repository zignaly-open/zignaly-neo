import React from 'react';
import { Box } from '@mui/material';
import { PriceLabel } from 'components/Auctions/AuctionCard/styles';
import { useModal } from 'mui-modal-provider';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import DialogContainer from '../DialogContainer';
import ProjectDetailsModal from '../ProjectDetails';
import { CongratulationsModalProps } from './types';
import { ReactComponent as ZigCoinIcon } from 'images/zig-coin.svg';
import { AuctionImage, Description } from './styles';

const CongratulationsModal = ({
  auction,
  ...props
}: CongratulationsModalProps) => {
  const { t } = useTranslation(['claim', 'auction']);
  const { showModal } = useModal();

  return (
    <DialogContainer title={t('congratulations')} {...props}>
      <Box textAlign='center'>
        <Typography color='neutral200'>{t('claim-success')}</Typography>
      </Box>
      <Box mt='62px' display='flex' justifyContent='center' flexWrap='wrap'>
        <AuctionImage src={auction.imageUrl} alt={auction.title} />
        <Box
          m='34px 0 0 21px'
          display='flex'
          justifyContent='flex-start'
          alignItems='flex-start'
          flexDirection='column'
        >
          <Typography component='div' color='neutral300'>
            {t('prize')}
          </Typography>
          <Typography variant='h2' color='neutral100'>
            {auction.title}
          </Typography>
          <Description
            color='links'
            caption={t('project-desc', {
              ns: 'auction',
            })}
            onClick={() => showModal(ProjectDetailsModal, { auction })}
          />
          <Box mt={1} />
          <Typography component='div' color='neutral300'>
            {t('amount')}
          </Typography>
          <Box display='flex' mt='2px'>
            <ZigCoinIcon width={24} height={24} />
            <PriceLabel value={auction.minimalBid} coin='ZIG' />
          </Box>
        </Box>
      </Box>
      <Box
        gap='12px'
        display='flex'
        justifyContent='center'
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        mt='94px'
      >
        <Button
          caption={t('close')}
          size='large'
          onClick={(e) => props.onClose(e, 'escapeKeyDown')}
        />
      </Box>
    </DialogContainer>
  );
};

export default CongratulationsModal;
