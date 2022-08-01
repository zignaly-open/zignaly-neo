import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'zignaly-ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Column } from './styles';
import { ProjectDetailsModalProps } from './types';
import { ReactComponent as Discord } from '../../../assets/icons/discord-logo.svg';
import { ReactComponent as Telegram } from '../../../assets/icons/telegram-logo.svg';
import { ReactComponent as Twitter } from '../../../assets/icons/twitter-logo.svg';

import { Box } from '@mui/system';

const ProjectDetailsModal = ({
  auction: { title, website, twitter, telegram, discord },
  ...props
}: ProjectDetailsModalProps) => {
  const { t } = useTranslation('auction');
  return (
    <DialogContainer title={title} {...props}>
      <Column>
        <Typography variant='body1' marginTop={18} color='neutral200'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
              <Twitter />
            </a>
          )}
          {discord && (
            <a href={discord} target='_blank' rel='noopener noreferrer'>
              <Discord />
            </a>
          )}
          {telegram && (
            <a href={telegram} target='_blank' rel='noopener noreferrer'>
              <Telegram />
            </a>
          )}
        </Box>
      </Column>
    </DialogContainer>
  );
};

export default ProjectDetailsModal;
