import { Typography } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';

function HowItWorks() {
  const { t } = useTranslation('how-it-works');
  return (
    <>
      <ul>
        <li>
          <Box marginTop={1}>
            <Typography>{t('qna-q1')}</Typography>
          </Box>
          <Box marginTop={1}>
            <Typography color={'secondary'}>{t('qna-a1')}</Typography>
          </Box>
        </li>
        <li>
          <Typography marginTop={1}>{t('qna-q2')}</Typography>
          <Typography color={'secondary'} marginTop={1}>
            {t('qna-a2')}
          </Typography>
        </li>
        <li>
          <Typography marginTop={1}>{t('qna-q3')}</Typography>
          <Typography color={'secondary'} marginTop={1}>
            {t('qna-a3')}
          </Typography>
        </li>
        <li>
          <Typography marginTop={1}>{t('qna-q4')}</Typography>
          <Typography color={'secondary'} marginTop={1}>
            {t('qna-a4')}
          </Typography>
        </li>
      </ul>
    </>
  );
}

export default HowItWorks;
