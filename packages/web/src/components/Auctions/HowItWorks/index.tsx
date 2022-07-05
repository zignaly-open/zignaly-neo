// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ArrowDownward } from '@mui/icons-material';
import React, { useState } from 'react';
import { Row } from 'util/row';
import { Button, CloseIcon, Typography } from 'zignaly-ui';
import {
  ButtonContainer,
  HowItWorksContainer,
  IconButtonContainer,
  Inline,
} from './styles';

const HowItWorks = ({ onClickReadMore }: { onClickReadMore?: () => void }) => {
  const [showDialog, setShowDialog] = useState(true);

  function ToggleDialog() {
    setShowDialog(!showDialog);
  }
  return (
    <>
      {showDialog ? (
        <HowItWorksContainer>
          <Row justifyContent='center'>
            <Inline>
              <Typography variant='h3' weight='medium' color='link'>
                How it works
              </Typography>
            </Inline>
            <IconButtonContainer onClick={() => ToggleDialog()}>
              <CloseIcon width={24} height={24} />
            </IconButtonContainer>
          </Row>
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
              size='small'
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
