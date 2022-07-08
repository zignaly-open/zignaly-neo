import { ArrowDownward, Close } from '@mui/icons-material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from 'zignaly-ui';
import {
  ButtonContainer,
  HowItWorksContainer,
  IconButtonContainer,
  Inline,
} from './styles';

const HowItWorks = ({ onClickReadMore }: { onClickReadMore?: () => void }) => {
  const [showDialog, setShowDialog] = useState(true);
  const { t } = useTranslation('auction');

  function ToggleDialog() {
    setShowDialog(!showDialog);
  }
  return (
    <>
      {showDialog ? (
        <HowItWorksContainer>
          <Box display='flex' justifyContent='center'>
            <Inline>
              <Typography variant='h3' weight='medium' color='link'>
                {t('how-it-works')}
              </Typography>
            </Inline>
            <IconButtonContainer onClick={() => ToggleDialog()}>
              <Close />
            </IconButtonContainer>
          </Box>
          <ButtonContainer>
            <Typography variant='body1' weight='regular' color='neutral200'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </Typography>
          </ButtonContainer>
          <ButtonContainer>
            <Button
              caption='Read more'
              size='medium'
              minWidth={113}
              onClick={() => onClickReadMore()}
            />
          </ButtonContainer>
        </HowItWorksContainer>
      ) : (
        <HowItWorksContainer>
          <IconButtonContainer onClick={() => ToggleDialog()}>
            <ArrowDownward />
          </IconButtonContainer>
        </HowItWorksContainer>
      )}
    </>
  );
};

export default HowItWorks;
