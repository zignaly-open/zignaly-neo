import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { useSearchParams } from 'react-router-dom';
import { CONFIRM_EMAIL_MUTATION } from 'queries/users';
import { useMutation } from '@apollo/client';

const ConfirmEmail: React.FC = () => {
  const { t } = useTranslation('global');
  const [searchParams] = useSearchParams();
  const [isConfirmRoute, setIsConfirmRoute] = useState(false);

  const [confirmEmailMutation, { loading, data, error }] = useMutation(
    CONFIRM_EMAIL_MUTATION,
  );

  useEffect(() => {
    const hashStr = searchParams.get('confirm');
    if (hashStr) {
      setIsConfirmRoute(true);
      confirmEmailMutation({
        variables: { hash: hashStr || '' },
      });
    }
  }, [confirmEmailMutation]);

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <ZigTypography
        variant='h2'
        color='neutral400'
        sx={{ display: isConfirmRoute ? '' : 'none' }}
      >
        {t('confirmation-link-invalid')}
      </ZigTypography>
    );
  }

  return (
    <ZigTypography
      variant='h2'
      color='neutral400'
      sx={{ display: isConfirmRoute ? '' : 'none' }}
    >
      {data ? t('email-confirmed') : t('confirmation-link-invalid')}
    </ZigTypography>
  );
};

export default ConfirmEmail;
