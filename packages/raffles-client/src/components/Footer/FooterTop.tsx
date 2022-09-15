import React from 'react';
import {
  FooterTopContainer,
  IconsContainer,
  CopyrightContainer,
} from './styles';
import { BrandImage, TextButton } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';

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
          <BrandImage
            type={'facebooklogotype'}
            width={'32px'}
            height={'32px'}
          />
        </a>
        <a
          href={'https://twitter.com/zignaly'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <BrandImage type={'twitterlogoype'} width={'32px'} height={'32px'} />
        </a>
        <a
          href={'https://www.youtube.com/zignaly'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <BrandImage type={'youtubelogotype'} width={'32px'} height={'32px'} />
        </a>
        <a
          href={'https://discord.com/invite/r5qRXDJ'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <BrandImage type={'discordlogotype'} width={'32px'} height={'32px'} />
        </a>
        <a
          href={'https://t.me/ZignalyHQ'}
          target='_blank'
          rel='noopener noreferrer'
        >
          <BrandImage
            type={'telegramlogotype'}
            width={'32px'}
            height={'32px'}
          />
        </a>
      </IconsContainer>
    </FooterTopContainer>
  );
};

export default FooterTop;
