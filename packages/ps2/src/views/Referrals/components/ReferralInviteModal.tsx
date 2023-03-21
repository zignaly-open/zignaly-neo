import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../components/ZModal';
import { ZDialogProps } from '../../../components/ZModal/types';
import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FacebookIcon from '@mui/icons-material/Facebook';
import DownloadIcon from '@mui/icons-material/DownloadForOffline';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Grid } from '@mui/material';
import { ZigInput, ZigTab, ZigTabPanel, ZigTabs } from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../util/hooks/useToast';
import { ShareIconsContainer } from '../styles';
// import ReferralInviteImage from './ReferralInviteImage';
import ReferralInviteImage from './ReferralInviteUglyImage';
import { downloadSvgElementAsImage } from 'util/images';

const ReferralInviteModal: React.FC<
  ZDialogProps & { url: string; urlShort: string }
> = ({ url, urlShort, ...props }) => {
  const { t } = useTranslation(['referrals', 'pages']);
  const [tab, setTab] = useState(0);
  const [text, setText] = useState<string>(t('create-invite.invite-text'));

  const imageWrapper = useRef<HTMLDivElement>();
  const toast = useToast();

  const download = () =>
    downloadSvgElementAsImage(
      imageWrapper?.current?.querySelector('svg'),
      'zignaly-invite.svg',
    );

  const copyLink = () => {
    copy(url);
    toast.success(t('action:copied'));
  };

  return (
    <ZModal wide {...props}>
      <ZigTabs
        sx={{
          margin: '0 auto',
        }}
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

      <Grid container>
        <Grid item xs={12} sm={6} columnSpacing={2}>
          <Box ref={imageWrapper}>
            <ZigTabPanel value={tab} index={0}>
              <ReferralInviteImage
                width={300}
                urlShort={urlShort}
                url={url}
                mode={'friend'}
              />
            </ZigTabPanel>
            <ZigTabPanel value={tab} index={1}>
              <ReferralInviteImage
                width={300}
                urlShort={urlShort}
                url={url}
                mode={'trader'}
              />
            </ZigTabPanel>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              margin: '0 auto',
              pl: 3,
              pr: 3,
            }}
          >
            <svg width={0} height={0}>
              <linearGradient
                id='shareIconGradient'
                x1={1}
                y1={0}
                x2={1}
                y2={1}
              >
                <stop offset={0} stopColor='#149cad' />
                <stop offset={1} stopColor='#4540c1' />
              </linearGradient>
            </svg>
          </Box>

          <Box>
            <ZigInput
              wide
              label={t('create-invite.customize-text')}
              rows={6}
              multiline
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>

          <ShareIconsContainer>
            <DownloadIcon sx={{ cursor: 'pointer' }} onClick={download} />
            <InsertLinkIcon sx={{ cursor: 'pointer' }} onClick={copyLink} />
            <FacebookShareButton quote={t('share.facebook-title')} url={url}>
              <FacebookIcon />
            </FacebookShareButton>
            <WhatsappShareButton url={url} title={text}>
              <WhatsappIcon />
            </WhatsappShareButton>
            <EmailShareButton
              subject={t('share.email-subject')}
              body={text}
              url={url}
            >
              <EmailIcon />
            </EmailShareButton>
            <TwitterShareButton url={url} title={text}>
              <TwitterIcon />
            </TwitterShareButton>
            <TelegramShareButton url={url} title={text}>
              <TelegramIcon />
            </TelegramShareButton>
            <LinkedinShareButton url={url} title={text}>
              <LinkedinIcon />
            </LinkedinShareButton>
          </ShareIconsContainer>
        </Grid>
      </Grid>
    </ZModal>
  );
};

export default ReferralInviteModal;
