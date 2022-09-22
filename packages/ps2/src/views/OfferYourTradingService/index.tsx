import React from 'react';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { Typography, ArrowRightIcon, Button } from '@zignaly-open/ui';
import { useTheme } from 'styled-components';
import {
  Layout,
  Header,
  Wrapper,
  Side,
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
  FeatureIcon,
  FeatureData,
  StepList,
  Step,
  StepImage,
  Box,
  Separator,
} from './styles';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { FeatureItem, InfoBarItem, HowWorksItem } from './types';

const OfferYourTradingService: React.FC = () => {
  const theme = useTheme() as Theme;
  const { t } = useTranslation('offer-your-trading-service');
  useTitle(t('Offer Your Trading Service'));

  const infoBarItems: InfoBarItem[] = [
    {
      title: t('offer-your-trading-service.infoBar.item1.title'),
      description: t('offer-your-trading-service.infoBar.item1.description'),
    },
    {
      title: t('offer-your-trading-service.infoBar.item2.title'),
      description: t('offer-your-trading-service.infoBar.item2.description'),
    },
    {
      title: t('offer-your-trading-service.infoBar.item3.title'),
      description: t('offer-your-trading-service.infoBar.item3.description'),
    },
  ];

  const featuresItems: FeatureItem[] = [
    {
      title: t('offer-your-trading-service.features.list.item1.title'),
      description: t(
        'offer-your-trading-service.features.list.item1.description',
      ),
    },
    {
      title: t('offer-your-trading-service.features.list.item2.title'),
      description: t(
        'offer-your-trading-service.features.list.item2.description',
      ),
    },
    {
      title: t('offer-your-trading-service.features.list.item3.title'),
      description: t(
        'offer-your-trading-service.features.list.item3.description',
      ),
    },
    {
      title: t('offer-your-trading-service.features.list.item4.title'),
      description: t(
        'offer-your-trading-service.features.list.item4.description',
      ),
    },
  ];

  const howWorksItems: HowWorksItem[] = [
    {
      title: t('offer-your-trading-service.howWorks.list.item1.title'),
      description: t(
        'offer-your-trading-service.howWorks.list.item1.description',
      ),
    },
    {
      title: t('offer-your-trading-service.howWorks.list.item2.title'),
      description: t(
        'offer-your-trading-service.howWorks.list.item2.description',
      ),
    },
    {
      title: t('offer-your-trading-service.howWorks.list.item3.title'),
      description: t(
        'offer-your-trading-service.howWorks.list.item3.description',
      ),
    },
  ];

  return (
    <Layout>
      <Header>
        <Typography variant={'h1'}>
          {t('offer-your-trading-service.header.title')}
        </Typography>
        <Typography variant={'body1'} color={'neutral400'}>
          {t('offer-your-trading-service.header.description')}
        </Typography>
      </Header>

      <Sections>
        <Section>
          <Wrapper>
            <Side>
              <Typography variant={'h2'}>
                {t('offer-your-trading-service.wrapper.title')}
              </Typography>
              <WrapperList>
                <WrapperItem>
                  <Typography variant={'body1'} color={'neutral300'}>
                    {t('offer-your-trading-service.wrapper.list.item1')}
                  </Typography>
                </WrapperItem>
                <WrapperItem>
                  <Typography variant={'body1'} color={'neutral300'}>
                    {t('offer-your-trading-service.wrapper.list.item2')}
                  </Typography>
                </WrapperItem>
                <WrapperItem>
                  <Typography variant={'body1'} color={'neutral300'}>
                    {t('offer-your-trading-service.wrapper.list.item3')}
                  </Typography>
                </WrapperItem>
              </WrapperList>
              <WrapperAction>
                <Button
                  size={'large'}
                  caption={t('offer-your-trading-service.wrapper.action')}
                />
              </WrapperAction>
            </Side>
            <Side>{/* Put image here */}</Side>
          </Wrapper>
        </Section>

        <InfoBar>
          <Margin>
            <InfoBarList itemsLength={infoBarItems.length}>
              {infoBarItems.map((item, index) => (
                <InfoBarListItem key={`--info-bar-item-${index.toString()}`}>
                  <Typography variant={'h1'} color={'neutral100'}>
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
            {t('offer-your-trading-service.features.title')}
          </Typography>

          <FeaturesList itemsLength={featuresItems.length}>
            {featuresItems.map((feature, index) => (
              <Feature key={`--features-item-${index.toString()}`}>
                <FeatureIcon>
                  <FeatureImage
                    src={'https://dummyimage.com/50x50/000000/fff.jpg'}
                  />
                </FeatureIcon>
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
            {t('offer-your-trading-service.howWorks.title')}
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
                        src={
                          'https://dummyimage.com/224x120/000000/fff.jpg&text=Dummy+Image'
                        }
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

        <Section>
          <Typography variant={'h2'} color={'neutral100'}>
            {t('offer-your-trading-service.testimonials.title')}
          </Typography>
        </Section>
      </Sections>
    </Layout>
  );
};

export default OfferYourTradingService;
