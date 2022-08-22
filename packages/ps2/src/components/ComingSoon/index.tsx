import React from 'react';
import { Typography } from '@zignaly-open/ui';
import { Layout } from './styles';
import { useTranslation } from 'react-i18next';

// TODO: this belongs to zignaly-ui
// but we can not quite pull off the transition because zignaly-ui is not translation-aware
// shall we make it translation-aware? I do not think so
// maybe we create ANOTHER package, like, @zignaly-open/tetris
// that, unlike our relatively independent @zignaly-open/ui, would export whole pluggable components
// with peer dependent react-i18next and the likes of it?
// maybe some other time.
function ComingSoonContainer() {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <Typography variant={'h1'}>{t('coming-soon.title')}</Typography>
      <Typography variant={'body1'} color={'neutral200'}>
        {t('coming-soon.description')}
      </Typography>
    </Layout>
  );
}

export default ComingSoonContainer;
