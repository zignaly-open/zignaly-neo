import React from 'react';
import { PageContainer, ZigTypography } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from '../../util/title';
import { LegalTitle, LegalWrapper } from './components';
import { OlList } from '../Referrals/styles';

const Privacy: React.FC = () => {
  const { t } = useTranslation('legal');
  useTitle(t('pages:privacy'));
  return (
    <PageContainer>
      <LegalWrapper id='legal-tos'>
        <LegalTitle variant={'h1'}>{t('privacy-title')}</LegalTitle>
        {(
          t('privacy-text', { returnObjects: true }) as Array<{
            title?: string;
            description: string[];
            list?: string[];
          }>
        ).map(({ title, description, list }, i) => (
          <>
            {!!title && (
              <ZigTypography
                component={'p'}
                variant={'h2'}
                sx={{ mt: 3 }}
                // eslint-disable-next-line react/no-array-index-key
                key={'privacy-title-' + i}
              >
                {title}
              </ZigTypography>
            )}

            {!!description?.length &&
              description.map((d, j) => (
                <ZigTypography
                  component={'p'}
                  variant={'body1'}
                  sx={{ mt: 3 }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={'privacy-p-' + i + '-' + j}
                >
                  <Trans
                    t={t}
                    i18nKey={`privacy-text.${i}.description.${j}`}
                    components={{ i: <i />, b: <strong /> }}
                  />
                </ZigTypography>
              ))}

            {!!list?.length && (
              <OlList>
                {list.map((_, j) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={`privacy-text.${i}.list.${j}`}>
                    <ZigTypography
                      component={'p'}
                      variant={'body1'}
                      sx={{ mt: 3 }}
                      // eslint-disable-next-line react/no-array-index-key
                      key={'privacy-p-' + i + '-' + j}
                    >
                      <Trans
                        t={t}
                        i18nKey={`privacy-text.${i}.list.${j}`}
                        components={{ i: <i />, b: <strong /> }}
                      />
                    </ZigTypography>
                  </li>
                ))}
              </OlList>
            )}
          </>
        ))}
      </LegalWrapper>
    </PageContainer>
  );
};

export default Privacy;
