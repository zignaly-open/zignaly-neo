import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { useSearchParams } from 'react-router-dom';
import useConfirmEmail from 'hooks/useConfirmEmail';

const ConfirmEmail: React.FC = () => {
  const { t } = useTranslation('global');
  const [verificationMessage, setVerificationMessage] = useState('');
  const { confirmEmail } = useConfirmEmail();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const hashStr = searchParams.get('confirm');
    if (hashStr) {
      confirmEmail(hashStr).then((result) => {
        setVerificationMessage(t(result));
      });
    }
  }, []);

  return (
    <ZigTypography variant='h2' color='neutral400'>
      {t(verificationMessage)}
    </ZigTypography>
  );
};

export default ConfirmEmail;
