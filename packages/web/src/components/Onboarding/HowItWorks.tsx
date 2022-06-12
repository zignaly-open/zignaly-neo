import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

function HowItWorks() {
  const { t } = useTranslation('how-it-works');
  return (
    <>
      <Typography marginTop={1}>{t('how-it-works-text')}</Typography>

      <ul>
        <li>
          <Typography marginTop={1}>{t('qna-q1')}</Typography>
          <Typography color={'secondary'} marginTop={1}>
            {t('qna-a1')}
          </Typography>
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
