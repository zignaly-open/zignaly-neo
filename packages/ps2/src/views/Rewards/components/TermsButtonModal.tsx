import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton, ZigTypography } from '@zignaly-open/ui';
import { useZAlert } from '../../../components/ZModal/use';
import { UlList } from '../../Referrals/styles';
import { Box } from '@mui/material';

const TermsButtonModal: React.FC = () => {
  const { t } = useTranslation('rewards');
  const showAlert = useZAlert();

  const showTerms = useCallback(() => {
    showAlert({
      title: t('full-terms.title'),
      okLabel: t('common:ok'),
      description: (
        <Box sx={{ maxWidth: 650 }}>
          <UlList>
            {new Array(7).fill(0).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`full-term-${i}`}>
                <ZigTypography>{t(`full-terms.${i + 1}`)}</ZigTypography>
              </li>
            ))}
          </UlList>
        </Box>
      ),
    });
  }, [t]);

  return <TextButton caption={t('terms')} onClick={() => showTerms()} />;
};

export default TermsButtonModal;
