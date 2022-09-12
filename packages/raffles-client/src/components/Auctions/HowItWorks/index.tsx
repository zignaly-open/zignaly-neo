import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton, Typography } from '@zignaly-open/ui';
import {
  BulletPointItem,
  HowItWorksList,
  ContainerBox,
  LinkBox,
} from './styles';

const HowItWorks = () => {
  const [closed, setClosed] = useState(true);
  const { t } = useTranslation('how-it-works');
  return (
    <ContainerBox>
      <Typography variant='body1' weight='regular' color='neutral100'>
        {t('info')}
        <LinkBox>
          <TextButton
            href='https://zignaly.com'
            caption={t('infolink')}
            color='links'
            variant='body1'
          />
        </LinkBox>
        {t('info2')}
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
          <Typography variant='h3' weight='demibold' color='neutral000'>
            {t('how-it-works')}
          </Typography>
          <HowItWorksList>
            <Typography variant='body1' weight='regular' color='neutral100'>
              <BulletPointItem>{t('qna1')}</BulletPointItem>
              <br />
              <BulletPointItem>{t('qna2')}</BulletPointItem>
              <br />
              <BulletPointItem>{t('qna3')}</BulletPointItem>
              <br />
            </Typography>
            <Typography variant='body1' weight='regular' color='neutral100'>
              <BulletPointItem>{t('qna4')}</BulletPointItem>
              <br />
              <BulletPointItem>{t('qna5')}</BulletPointItem>
              <br />
              <BulletPointItem>{t('qna6')}</BulletPointItem>
              <br />
            </Typography>
          </HowItWorksList>
        </>
      )}
    </ContainerBox>
  );
};

export default HowItWorks;
