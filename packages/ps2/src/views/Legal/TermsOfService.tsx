import React from 'react';
import { PageContainer, ZigLink, ZigTypography } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from '../../util/title';
import { LegalTitle, LegalWrapper } from './components';
import { generatePath } from 'react-router-dom';
import { ROUTE_LEGAL_PRIVACY } from '../../routes';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation('legal');
  useTitle(t('pages:tos'));
  return (
    <PageContainer>
      <LegalWrapper id='legal-tos'>
        <LegalTitle variant={'h1'}>{t('tos-title')}</LegalTitle>
        {(t('tos-text', { returnObjects: true }) as string[]).map(
          (x, index) => (
            <ZigTypography
              component={'p'}
              variant={'body1'}
              sx={{ mt: 3 }}
              // eslint-disable-next-line react/no-array-index-key
              key={'tos-p-' + index}
            >
              <Trans
                t={t}
                components={{
                  privacylink: (
                    <ZigLink href={generatePath(ROUTE_LEGAL_PRIVACY)} />
                  ),
                }}
                i18nKey={`tos-text.${index}`}
              ></Trans>
            </ZigTypography>
          ),
        )}
      </LegalWrapper>
    </PageContainer>
  );
};

export default TermsOfService;
