import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, BrandImage } from '@zignaly-open/ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Column } from './styles';
import { ProjectDetailsModalProps } from './types';
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
            <a href={twitter} target='_blank' rel='noopener noreferrer'>
              <BrandImage
                type={'twitterlogoype'}
                width={'32px'}
                height={'32px'}
              />
            </a>
          )}
          {discord && (
            <a href={discord} target='_blank' rel='noopener noreferrer'>
              <BrandImage
                type={'discordlogotype'}
                width={'32px'}
                height={'32px'}
              />
            </a>
          )}
          {telegram && (
            <a href={telegram} target='_blank' rel='noopener noreferrer'>
              <BrandImage
                type={'telegramlogotype'}
                width={'32px'}
                height={'32px'}
              />
            </a>
          )}
        </Box>
      </Column>
    </DialogContainer>
  );
};

export default ProjectDetailsModal;
