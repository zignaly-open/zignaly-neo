import React from 'react';
import AuctionGrid from './AuctionGrid/AuctionGrid';
import Box from '@mui/material/Box';
import { Typography } from 'zignaly-ui';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { AuctionContainer } from './styles';
import HowItWorks from './HowItWorks';
import { useModal } from 'mui-modal-provider';
import HowItWorksModal from 'components/Modals/HowItWorks';

const HomeTitle = styled(Typography)`
  && {
    font-weight: 500;
    font-size: 26px;
    line-height: 40px;
  }
`;

function Auctions() {
  const { t } = useTranslation('global');
  const { showModal } = useModal();

  return (
    <>
      <AuctionContainer>
        <Box textAlign={'center'} marginTop='122px'>
          <HomeTitle variant='h1' color='neutral000'>
            {t('auction')}
          </HomeTitle>
        </Box>
        <Box textAlign={'center'} marginBottom='23px'>
          <Typography color='neutral300'>{t('moto')}</Typography>
        </Box>
        <HowItWorks onClickReadMore={() => showModal(HowItWorksModal)} />
      </AuctionContainer>
      <AuctionGrid />
    </>
  );
}

export default Auctions;
