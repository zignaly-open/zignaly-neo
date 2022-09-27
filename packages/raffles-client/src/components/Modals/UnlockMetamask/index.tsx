import { Box } from '@mui/system';
import { Typography } from '@zignaly-open/ui';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { Preview, RefreshIcon, RefreshIconButton, Video } from './styles';
import { UnlockMetamaskProps } from './types';

const UnlockMetamask = (props: UnlockMetamaskProps) => {
  const { t } = useTranslation('transfer-zig');
  const [isVideoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const onPressReplay = useCallback(() => {
    if (videoRef.current) {
      setVideoEnded(false);
      videoRef.current.pause();
      videoRef.current.currentTime = '0';
      videoRef.current.play();
    }
  }, [videoRef]);

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('unlock')}
      {...props}
    >
      <Box textAlign='center'>
        <Box mb={3.5}>
          <Typography variant='body1' color='neutral200' weight='regular'>
            {t('unlock-info')}
          </Typography>
        </Box>
        <Preview isVideoEnded={isVideoEnded}>
          <Video
            ref={videoRef}
            width='100%'
            controls={false}
            autoPlay={true}
            onEnded={() => setVideoEnded(true)}
          >
            <source src='unlock-mm.mp4' type='video/mp4' />
          </Video>
          {isVideoEnded && (
            <RefreshIconButton onClick={onPressReplay}>
              <RefreshIcon width={'22px'} height={'22px'} />
            </RefreshIconButton>
          )}
        </Preview>
      </Box>
    </DialogContainer>
  );
};
export default UnlockMetamask;
