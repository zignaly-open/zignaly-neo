import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Stub from '../../../components/Stub';
import { CABIN_IN_THE_WOODS_URL } from '../../constants';
import { ZigLink, ZigTypography } from '@zignaly-open/ui';
import { whitelabel } from '../../../whitelabel';

const ErrorStub: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <Stub
      title={<>{t('error-boundary.title')}</>}
      description={
        <>
          <Trans t={t} i18nKey={'common:error-boundary.description-1'}>
            <ZigLink
              target={'_self'}
              onClick={() => window.location.reload()}
            />
          </Trans>

          {
            // not everyone has a sense of humor
            [whitelabel.name, whitelabel.title].includes('Zignaly') && (
              <ZigTypography component={'p'}>
                <Trans t={t} i18nKey={'common:error-boundary.description-2'}>
                  <ZigLink href={CABIN_IN_THE_WOODS_URL} />
                </Trans>
              </ZigTypography>
            )
          }
        </>
      }
    />
  );
};

export default ErrorStub;
