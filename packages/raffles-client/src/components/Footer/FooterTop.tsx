import React from 'react';
import {
  FooterTopContainer,
  IconsContainer,
  CopyrightContainer,
} from './styles';
import { BrandImage, TextButton } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg';
import { ReactComponent as Youtube } from '../../assets/icons/youtube.svg';
import { ReactComponent as Discord } from '../../assets/icons/discord.svg';
import { ReactComponent as Telegram } from '../../assets/icons/telegram.svg';

const FooterTop: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <FooterTopContainer>
      <BrandImage type={'logotype'} width={'140px'} height={'68px'} />
      <CopyrightContainer variant='h4' color='neutral300'>
        {t('copyright')}
        <br />
        <Trans i18nKey='metamask_message' t={t}>
          <TextButton
            href='https://metamask.io/download/'
            caption='Download it here'
            variant='body1'
          />
        </Trans>
      </CopyrightContainer>
      <IconsContainer>
        <a
          href={'https://www.facebook.com/zignaly'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Facebook />
        </a>
        <a
          href={'https://twitter.com/zignaly'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Twitter />
        </a>
        <a
          href={'https://www.youtube.com/zignaly'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Youtube />
        </a>
        <a
          href={'https://discord.gg/9H6cEa9uRN'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Discord />
        </a>
        <a
          href={'https://t.me/ZignalyHQ'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Telegram />
        </a>
      </IconsContainer>
    </FooterTopContainer>
  );
};

export default FooterTop;
