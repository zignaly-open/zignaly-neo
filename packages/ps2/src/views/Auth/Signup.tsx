import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import { BrandImage, PageContainer, ZigTypography } from '@zignaly-open/ui';
import SignupForm from './components/SignupForm';
import { Grid, Link } from '@mui/material';
import { Box } from '@mui/system';

export type InfoBarItem = {
  title: string;
  description: string;
  image?: string;
};

const Signup: React.FC = () => {
  const { t } = useTranslation(['pages', 'sign-up']);
  useTitle(t('pages:signup'));

  const infoBarItems: InfoBarItem[] = useMemo(
    () => [
      {
        title: t('sign-up:info-bar.item1.title'),
        description: t('sign-up:info-bar.item1.description'),
        image: 'person-icon.svg',
      },
      {
        title: t('sign-up:info-bar.item2.title'),
        description: t('sign-up:info-bar.item2.description'),
        image: 'percent-icon.svg',
      },
      {
        title: t('sign-up:info-bar.item3.title'),
        description: t('sign-up:info-bar.item3.description'),
        image: 'dollar-icon.svg',
      },
    ],
    [t],
  );

  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container direction='row' alignItems='center' padding={'0 10%'}>
        <Grid item xs={12} md={6}>
          <Grid container direction='column' maxWidth={'450px'}>
            <Grid item>
              <Grid
                container
                direction='row'
                alignItems='center'
                marginBottom={'50px'}
              >
                <BrandImage height='32px' type='isotype' width='32px' />
                <ZigTypography
                  variant={'h1'}
                  fontSize={'30px'}
                  fontWeight={600}
                  letterSpacing={-0.8}
                  marginLeft={'15px'}
                  color={'neutral000'}
                >
                  {t('sign-up:company')}
                </ZigTypography>
              </Grid>
            </Grid>
            <Grid item marginBottom={'10px'}>
              <ZigTypography
                variant={'h2'}
                fontSize={'25px'}
                lineHeight={1.4}
                color={'neutral100'}
              >
                <Trans i18nKey={'sign-up:description'} t={t}>
                  <Link
                    href={'/profit-sharing'}
                    underline={'hover'}
                    fontWeight={600}
                    sx={{
                      backgroundImage:
                        'linear-gradient(90deg, #3F3BB1, #138EA0)',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  />
                </Trans>
              </ZigTypography>
            </Grid>
            <Grid item marginBottom={'10px'}>
              <img src={'/images/signup/official-broker.svg'} alt={''} />
            </Grid>
            {infoBarItems.map((item, index) => (
              <Grid item key={`--info-bar-item-${index.toString()}`}>
                <Box display={'flex'} paddingTop={'40px'}>
                  <img
                    src={`/images/signup/${item.image}`}
                    alt=''
                    width={'53px'}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: '26px',
                      maxWidth: '300px',
                    }}
                  >
                    <ZigTypography
                      variant={'h2'}
                      fontWeight={700}
                      fontSize={'22px'}
                      lineHeight={1.5}
                      color={'neutral100'}
                    >
                      {item.title}
                    </ZigTypography>
                    <ZigTypography
                      variant={'body2'}
                      fontSize={'18px'}
                      lineHeight={1.3}
                      color={'neutral300'}
                    >
                      {item.description}
                    </ZigTypography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container direction={'column'}>
            <Grid item>
              <Grid container justifyContent={'center'}>
                <SignupForm />
              </Grid>
            </Grid>
            <Grid
              item
              container
              marginTop={'25px'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={'18px'}
            >
              <Grid item>
                <img src={'/images/signup/secure-ssh.svg'} alt='' />
              </Grid>
              <Grid item>
                <img src={'/images/signup/funds-protected.svg'} alt='' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          marginTop={'75px'}
          gap={'15px'}
        >
          <Grid item>
            <img src={'/images/signup/secured.svg'} alt='' />
          </Grid>
          <Grid item>
            <ZigTypography variant={'h2'} fontSize={'25px'} fontWeight={600}>
              {t('sign-up:trusted-by')}
            </ZigTypography>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          padding={'25px 0'}
          flexDirection={'column'}
        >
          <ZigTypography fontSize={'20px'}>
            {t('sign-up:bottom-description')}
          </ZigTypography>
          <Grid
            item
            container
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'90px'}
            paddingTop={'25px'}
          >
            <Grid item>
              <img src={'/images/signup/forbes.svg'} alt='' />
            </Grid>
            <Grid item>
              <img src={'/images/signup/nasdaq.png'} alt='' />
            </Grid>
            <Grid item>
              <img src={'/images/signup/yahoo.svg'} alt='' />
            </Grid>
            <Grid item>
              <img src={'/images/signup/bitcoin.svg'} alt='' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Signup;
