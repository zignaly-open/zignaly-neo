import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton, Typography } from '@zignaly-open/ui';
import { BulletPointItem, HowItWorksList } from './styles';

const HowItWorks = () => {
  const [closed, setClosed] = useState(true);
  const { t } = useTranslation('how-it-works');
  return (
    <Box
      width='85%'
      marginTop='100px'
      display='flex'
      flexDirection='column'
    >
      <Typography variant='body1' weight='regular' color='neutral100'>
        {t('info')}
        <TextButton
          onClick={() => setClosed(!closed)}
          caption={closed ? 'Read More' : 'Read Less'}
          color='links'
          variant='body1'
        />
      </Typography>
      {!closed && (
        <>
          <br />
          <br />
          <Box>
            <Typography variant='h3' weight='demibold' color='neutral000'>
              {t('how-it-works')}
            </Typography>
          </Box>
          <HowItWorksList>
            <Typography variant='body1' weight='regular' color='neutral100'>
              <BulletPointItem>{t('qna1')}</BulletPointItem>
              <br />
              <BulletPointItem>{t('qna2')}</BulletPointItem>
              <br />
              <BulletPointItem>{t('qna3')}</BulletPointItem>
            </Typography>
            <Typography variant='body1' weight='regular' color='neutral100'>
              <BulletPointItem>{t('qna4')}</BulletPointItem>
              <br />
              <BulletPointItem>{t('qna5')}</BulletPointItem>
              <br />
              <BulletPointItem>{t('qna6')}</BulletPointItem>
            </Typography>
          </HowItWorksList>
        </>
      )}
    </Box>
  );
};

export default HowItWorks;
