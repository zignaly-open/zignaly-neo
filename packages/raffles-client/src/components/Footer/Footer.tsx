import React from 'react';
import {
  FooterContainer,
  TopNav,
  BottomNav,
  DisclaimerContainer,
  DisclaimerLeft,
  DisclaimerRight,
} from './styles';
import { useTranslation } from 'react-i18next';
import FooterTop from './FooterTop';

const Footer: React.FC = () => {
  const { t } = useTranslation('footer');
  return (
    <FooterContainer>
      <FooterTop />
      <TopNav>
        <a
          href='https://help.zignaly.com/en/articles/6555802-zigbids-step-by-step-guide'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('how_it_works')}
        </a>
        <a
          href='https://help.zignaly.com/en/articles/6564326-faqs-and-troubleshooting-tips-for-zigbids'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('zigbids_faqs')}
        </a>
        <a
          href='https://help.zignaly.com/en/articles/6203524-contact-our-support-team'
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('support')}
        </a>
        <a
          href={'https://zignaly.com/'}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('zignaly_web')}
        </a>
        <a
          href={'https://bridge.zignaly.com/'}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('zignaly_bridge')}
        </a>
      </TopNav>
      <BottomNav variant='h5' color='neutral000'>
        <a
          href={'https://zignaly.com/legal/terms'}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('terms_of_service')}
        </a>
        <a
          href={'https://zignaly.com/legal/privacy'}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('privacy_policy')}
        </a>
        <a
          href={'https://zignaly.com/legal/risks'}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('risk_warning')}
        </a>
        <a
          href={'https://zignaly.com/legal/api-agreement'}
          target='_blank'
          rel='noopener noreferrer'
        >
          {t('api_license')}
        </a>
      </BottomNav>
      <DisclaimerContainer variant='h5' color='neutral400'>
        <DisclaimerLeft>{t('disclaimer1')}</DisclaimerLeft>
        <DisclaimerRight>{t('disclaimer2')}</DisclaimerRight>
      </DisclaimerContainer>
    </FooterContainer>
  );
};

export default Footer;
