import { Box } from '@mui/system';
import { Typography } from '@zignaly-open/ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { Preview, Video } from './styles';
import { UnlockMetamaskProps } from './types';

const UnlockMetamask = (props: UnlockMetamaskProps) => {
  const { t } = useTranslation('transfer-zig');
  const [isVideoEnded, setVideoEnded] = useState(false);
  // const videoRef = useRef(null);

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('unlock')}
      {...props}
    >
      <Box textAlign='center'>
        <Preview isVideoEnded={isVideoEnded}>
          <Video
            // ref={video}
            width='100%'
            controls={false}
            autoPlay={true}
            // onEnded={onVideoEnd}
          >
            {/* <source src={MMUnlockVideo} type='video/mp4' /> */}
            <source src='unlock-mm.mp4' type='video/mp4' />
          </Video>
          <Box mt={2}>
            <Typography variant='body1' color='neutral200' weight='regular'>
              {t('unlock-info')}
            </Typography>
          </Box>
          {/* <RefreshButton onClick={onPressReplay}>
            <RefreshOutline width={'22px'} height={'22px'} color={'#fff'} />
          </RefreshButton> */}
        </Preview>
      </Box>
    </DialogContainer>
  );
};
export default UnlockMetamask;
