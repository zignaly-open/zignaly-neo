import React from 'react';
import {
  FooterContainer,
  FooterTop,
  IconsContainer,
  TopNav,
  BottomNav,
} from './styles';
import { BrandImage, TextButton, Typography } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <FooterContainer>
      <FooterTop>
        <BrandImage
          key={'logo1'}
          type={'logotype'}
          width={'140px'}
          height={'68px'}
        />
        <Typography variant='h4' color='neutral300'>
          {t('copyright')}
          <br />
          <Trans i18nKey='metamask_message' t={t}>
            <TextButton
              href='https://metamask.io/download/'
              caption='Download it here'
              variant='body1'
            />
          </Trans>
        </Typography>
        <IconsContainer>
          <BrandImage type={'discord'} width={'20px'} height={'20px'} />
          <BrandImage type={'discord'} width={'20px'} height={'20px'} />
          <BrandImage type={'discord'} width={'20px'} height={'20px'} />
          <BrandImage type={'discord'} width={'20px'} height={'20px'} />
          <BrandImage type={'discord'} width={'20px'} height={'20px'} />
          <BrandImage type={'discord'} width={'20px'} height={'20px'} />
        </IconsContainer>
      </FooterTop>
      <TopNav variant='h4' color='neutral000'>
        <Link to={'www.zignaly.com'}>{t('blog')}</Link>
        <Link to={'www.zignaly.com'}>{t('blog')}</Link>
        <Link to={'www.zignaly.com'}>{t('blog')}</Link>
        <Link to={'www.zignaly.com'}>{t('blog')}</Link>
      </TopNav>
      <BottomNav variant='h5' color='neutral000'>
        <Link to={'www.zignaly.com'}>{t('blog')}</Link>
        <Link to={'www.zignaly.com'}>{t('blog')}</Link>
        <Link to={'www.zignaly.com'}>{t('blog')}</Link>
        <Link to={'www.zignaly.com'}>{t('blog')}</Link>
      </BottomNav>
      <Typography variant='h5' color='neutral400'>
        {t('disclaimer')}
        <br />
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
