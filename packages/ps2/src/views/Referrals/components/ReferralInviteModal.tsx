import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../components/ZModal';
import { ZDialogProps } from '../../../components/ZModal/types';
import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from 'react-share';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FacebookIcon from '@mui/icons-material/Facebook';
import DownloadIcon from '@mui/icons-material/DownloadForOffline';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import { Box } from '@mui/material';
import { ZigTab, ZigTabPanel, ZigTabs } from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../util/hooks/useToast';
import { ShareIconsContainer } from '../styles';

const ReferralInviteModal: React.FC<ZDialogProps & { url: string }> = ({
  url,
  ...props
}) => {
  const { t } = useTranslation(['referrals', 'pages']);
  const [tab, setTab] = useState(0);
  const toast = useToast();
  const download = () => alert();
  const copyLink = () => {
    copy(url);
    toast.success(t('action:copied'));
  };
  return (
    <ZModal wide {...props} close={close}>
      <Box
        sx={{
          margin: '0 auto',
          pl: 3,
          pr: 3,
        }}
      >
        <svg width={0} height={0}>
          <linearGradient id='shareIconGradient' x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor='#149cad' />
            <stop offset={1} stopColor='#4540c1' />
          </linearGradient>
        </svg>

        <ZigTabs
          onChange={(_, newValue) => {
            setTab(newValue);
          }}
          value={tab}
        >
          <ZigTab
            label={t('create-invite.invite-friends')}
            id={'create-invite__friends'}
          />
          <ZigTab
            label={t('create-invite.invite-traders')}
            id={'create-invite__traders'}
          />
        </ZigTabs>
      </Box>
      <ZigTabPanel value={tab} index={0}>
        Hui
      </ZigTabPanel>
      <ZigTabPanel value={tab} index={1}>
        Pizda
      </ZigTabPanel>

      <ShareIconsContainer>
        <DownloadIcon sx={{ cursor: 'pointer' }} onClick={download} />
        <InsertLinkIcon sx={{ cursor: 'pointer' }} onClick={copyLink} />
        <FacebookShareButton quote={t('share.facebook-title')} url={url}>
          <FacebookIcon />
        </FacebookShareButton>

        <EmailShareButton
          subject={t('share.email-subject')}
          body={t('share.email-body')}
          url={url}
        >
          <EmailIcon />
        </EmailShareButton>
        <TwitterShareButton url={url} title={t('share.twitter-title')}>
          <TwitterIcon />
        </TwitterShareButton>
        <TelegramShareButton url={url} title={t('share.telegram-title')}>
          <TelegramIcon />
        </TelegramShareButton>
      </ShareIconsContainer>
    </ZModal>
  );
};

export default ReferralInviteModal;
