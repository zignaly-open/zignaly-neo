import React from 'react';
import { PageContainer, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { useTitle } from '../../util/title';
import { LegalTitle, LegalWrapper } from './components';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation('legal');
  useTitle(t('pages:tos'));
  return (
    <PageContainer>
      <LegalWrapper id='legal-tos'>
        <LegalTitle variant={'h1'}>{t('tos-title')}</LegalTitle>
        {t('tos-text', { returnObjects: true }).map(
          (x: string, index: number) => (
            <ZigTypography
              component={'p'}
              variant={'body1'}
              sx={{ mt: 3 }}
              // eslint-disable-next-line react/no-array-index-key
              key={'tos-p-' + index}
            >
              {x}
            </ZigTypography>
          ),
        )}
      </LegalWrapper>
    </PageContainer>
  );
};

export default TermsOfService;
