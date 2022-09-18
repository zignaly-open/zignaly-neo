import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@zignaly-open/ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Column } from './styles';
import { ProjectDetailsModalProps } from './types';
import { ReactComponent as Discord } from '../../../assets/icons/discord.svg';
import { ReactComponent as Telegram } from '../../../assets/icons/telegram.svg';
import { ReactComponent as Twitter } from '../../../assets/icons/twitter.svg';
import ReactMarkdown from 'react-markdown';

import { Box } from '@mui/system';

const ProjectDetailsModal = ({
  auction: { title, website, twitter, telegram, discord, description },
  ...props
}: ProjectDetailsModalProps) => {
  const { t } = useTranslation('auction');
  return (
    <DialogContainer title={title} maxWidth='sm' fullWidth={true} {...props}>
      <Column>
        <Typography variant='body1' marginTop={18} color='neutral200'>
          <ReactMarkdown>{description}</ReactMarkdown>
        </Typography>
        <Gap gap={11} />
        <Typography variant='h3' color='neutral000'>
          {t('website')}
        </Typography>
        <Gap gap={5} />
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <Typography variant='h3' color='links' underline={true}>
              {website}
            </Typography>
          </a>
        )}
        <Gap gap={5} />
        <Typography variant='h3' color='neutral000'>
          {t('social-links')}
        </Typography>
        <Box gap={1.1} display={'flex'} flexDirection='row'>
          {twitter && (
            <a href={discord} target='_blank' rel='noopener noreferrer'>
              <Twitter />
            </a>
          )}
          {discord && (
            <a href={discord} target='_blank' rel='noopener noreferrer'>
              <Discord />
            </a>
          )}
          {telegram && (
            <a href={discord} target='_blank' rel='noopener noreferrer'>
              <Telegram />
            </a>
          )}
        </Box>
      </Column>
    </DialogContainer>
  );
};

export default ProjectDetailsModal;
