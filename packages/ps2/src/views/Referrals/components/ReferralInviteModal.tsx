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
import ReferralInviteNewImage from './ReferralInviteNewImage';
import {
  downloadSvgElementAsPngImage,
  downloadSvgElementAsSvgImage,
} from 'util/images';
import { hardcodedInviteeReward } from '../constants';

const ReferralInviteModal: React.FC<
  ZDialogProps & { url: string; urlShort: string }
> = ({ url, urlShort, ...props }) => {
  const { t } = useTranslation(['referrals', 'pages']);
  const [tab, setTab] = useState(0);
  const [friendText, setFriendText] = useState<string>(
    t('create-invite.invite-text-friend', {
      depositThreshold: hardcodedInviteeReward?.threshold || 0,
      reward: hardcodedInviteeReward?.value || 0,
    }),
  );
  const [traderText, setTraderText] = useState<string>(
    t('create-invite.invite-text-trader', {
      depositThreshold: hardcodedInviteeReward?.threshold || 0,
      reward: hardcodedInviteeReward?.value || 0,
    }),
  );

  const [text, setText] =
    tab === 0 ? [friendText, setFriendText] : [traderText, setTraderText];

  const imageWrapper = useRef<HTMLDivElement>();
  const toast = useToast();

  const download = () => {
    try {
      downloadSvgElementAsPngImage(
        imageWrapper?.current?.querySelector('svg'),
        'zignaly-invite.png',
        3,
      );
    } catch (e) {
      downloadSvgElementAsSvgImage(
        imageWrapper?.current?.querySelector('svg'),
        'zignaly-invite.svg',
      );
    }
  };

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
              <ReferralInviteNewImage url={url} mode={'friend'} />
            </ZigTabPanel>
            <ZigTabPanel value={tab} index={1}>
              <ReferralInviteNewImage url={url} mode={'trader'} />
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
              id={'create-invite__invitation-text'}
              label={t('create-invite.customize-text')}
              rows={6}
              multiline
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>

          <ShareIconsContainer>
            <DownloadIcon
              id={'create-invite__download-image'}
              sx={{ cursor: 'pointer' }}
              onClick={download}
            />
            <InsertLinkIcon
              id={'create-invite__copy-link'}
              sx={{ cursor: 'pointer' }}
              onClick={copyLink}
            />
            <TwitterShareButton
              id={'create-invite__twitter'}
              url={url}
              title={text}
            >
              <TwitterIcon />
            </TwitterShareButton>
            <TelegramShareButton
              id={'create-invite__telegram'}
              url={url}
              title={text}
            >
              <TelegramIcon />
            </TelegramShareButton>
            <FacebookShareButton
              id={'create-invite__facebook'}
              quote={text}
              url={url}
            >
              <FacebookIcon />
            </FacebookShareButton>
            <WhatsappShareButton
              id={'create-invite__whatsapp'}
              url={url}
              title={text}
            >
              <WhatsappIcon />
            </WhatsappShareButton>
            <EmailShareButton
              id={'create-invite__email'}
              subject={t('share.email-subject')}
              body={text}
              url={url}
            >
              <EmailIcon />
            </EmailShareButton>
            <LinkedinShareButton
              id={'create-invite__linkedin'}
              url={url}
              title={text}
            >
              <LinkedinIcon />
            </LinkedinShareButton>
          </ShareIconsContainer>
        </Grid>
      </Grid>
    </ZModal>
  );
};

export default ReferralInviteModal;
