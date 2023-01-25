import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, ArrowRightIcon, Button } from '@zignaly-open/ui';
import { useTheme } from 'styled-components';
import {
  Layout,
  Header,
  Wrapper,
  Side,
  SideImage,
  Margin,
  Center,
  WrapperList,
  WrapperItem,
  WrapperAction,
  InfoBar,
  InfoBarList,
  InfoBarListItem,
  Sections,
  Section,
  FeaturesList,
  Feature,
  FeatureImage,
  FeatureData,
  StepList,
  Step,
  StepImage,
  Box,
  Separator,
  GraphicImage,
} from './styles';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { FeatureItem, InfoBarItem, HowWorksItem } from './types';

const BecomeTraderLanding: React.FC = () => {
  const theme = useTheme() as Theme;
  const { t } = useTranslation('offer-your-trading-service');

  const infoBarItems: InfoBarItem[] = [
    {
      title: t('infoBar.item1.title'),
      description: t('infoBar.item1.description'),
    },
    {
      title: t('infoBar.item2.title'),
      description: t('infoBar.item2.description'),
    },
    {
      title: t('infoBar.item3.title'),
      description: t('infoBar.item3.description'),
    },
  ];

  const featuresItems: FeatureItem[] = [
    {
      title: t('features.list.item1.title'),
      description: t('features.list.item1.description'),
      image: 'icon-analytics.png',
    },
    {
      title: t('features.list.item2.title'),
      description: t('features.list.item2.description'),
      image: 'icon-tools.png',
    },
    {
      title: t('features.list.item3.title'),
      description: t('features.list.item3.description'),
      image: 'icon-payouts.png',
    },
    {
      title: t('features.list.item4.title'),
      description: t('features.list.item4.description'),
      image: 'icon-marketplace.png',
    },
  ];

  const howWorksItems: HowWorksItem[] = [
    {
      title: t('howWorks.list.item1.title'),
      description: t('howWorks.list.item1.description'),
      image: 'pool-funds.png',
    },
    {
      title: t('howWorks.list.item2.title'),
      description: t('howWorks.list.item2.description'),
      image: 'trade.png',
    },
    {
      title: t('howWorks.list.item3.title'),
      description: t('howWorks.list.item3.description'),
      image: 'split-profits.png',
    },
  ];

  return (
    <Layout>
      <Header>
        <Typography variant={'h1'}>{t('header.title')}</Typography>
        <Typography variant={'body1'} color={'neutral400'}>
          {t('header.description')}
        </Typography>
      </Header>

      <Sections>
        <Section>
          <Wrapper>
            <Side>
              <Typography variant={'h2'}>{t('wrapper.title')}</Typography>
              <WrapperList>
                <WrapperItem>
                  <Typography variant={'body1'} color={'neutral300'}>
                    {t('wrapper.list.item1')}
                  </Typography>
                </WrapperItem>
                <WrapperItem>
                  <Typography variant={'body1'} color={'neutral300'}>
                    {t('wrapper.list.item2')}
                  </Typography>
                </WrapperItem>
                <WrapperItem>
                  <Typography variant={'body1'} color={'neutral300'}>
                    {t('wrapper.list.item3')}
                  </Typography>
                </WrapperItem>
              </WrapperList>
              <WrapperAction>
                <Button size={'large'} caption={t('wrapper.action')} />
              </WrapperAction>
            </Side>
            <SideImage>
              <GraphicImage
                src={'/images/service-provider/main-graphic.png'}
                alt=''
              />
            </SideImage>
          </Wrapper>
        </Section>

        <InfoBar>
          <Margin>
            <InfoBarList itemsLength={infoBarItems.length}>
              {infoBarItems.map((item, index) => (
                <InfoBarListItem key={`--info-bar-item-${index.toString()}`}>
                  <Typography variant={'bigNumber'} color={'neutral100'}>
                    {item.title}
                  </Typography>
                  <Typography variant={'body1'} color={'neutral400'}>
                    {item.description.toUpperCase()}
                  </Typography>
                </InfoBarListItem>
              ))}
            </InfoBarList>
          </Margin>
        </InfoBar>

        <Section>
          <Typography variant={'h2'} color={'neutral100'}>
            {t('features.title')}
          </Typography>

          <FeaturesList itemsLength={featuresItems.length}>
            {featuresItems.map((feature, index) => (
              <Feature key={`--features-item-${index.toString()}`}>
                <FeatureImage
                  src={'/images/service-provider/' + feature.image}
                />
                <FeatureData>
                  <Typography variant={'h3'} color={'neutral200'}>
                    {feature.title}
                  </Typography>
                  <Typography variant={'body2'} color={'neutral400'}>
                    {feature.description}
                  </Typography>
                </FeatureData>
              </Feature>
            ))}
          </FeaturesList>
        </Section>

        <Section>
          <Typography variant={'h2'} color={'neutral100'}>
            {t('howWorks.title')}
          </Typography>

          <StepList itemsLength={howWorksItems.length}>
            {howWorksItems.map((howWorkItem, index) => (
              <>
                <Step key={`--how-works-item-${index.toString()}`}>
                  <Box>
                    <Center>
                      <Typography variant={'h2'} color={'neutral100'}>
                        {howWorkItem.title.toUpperCase()}
                      </Typography>
                      <StepImage
                        src={'/images/service-provider/' + howWorkItem.image}
                      />
                    </Center>
                    <Typography variant={'body2'} color={'neutral400'}>
                      {howWorkItem.description}
                    </Typography>
                  </Box>
                </Step>
                {index < howWorksItems.length - 1 && (
                  <Separator>
                    <ArrowRightIcon
                      width={48}
                      height={48}
                      color={theme.neutral500}
                    />
                  </Separator>
                )}
              </>
            ))}
          </StepList>
        </Section>

        {/*<Section>*/}
        {/*  <Typography variant={'h2'} color={'neutral100'}>*/}
        {/*    {t('testimonials.title')}*/}
        {/*  </Typography>*/}
        {/*</Section>*/}
      </Sections>
    </Layout>
  );
};

export default BecomeTraderLanding;
