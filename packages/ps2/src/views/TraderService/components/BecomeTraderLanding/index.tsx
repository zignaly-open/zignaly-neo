import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ZigButton, ZigLink, ZigTypography } from '@zignaly-open/ui';
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
} from './styles';
import { FeatureItem, InfoBarItem, HowWorksItem } from './types';
import { useIsAuthenticated } from '../../../../apis/user/use';
import { useZModal } from '../../../../components/ZModal/use';
import CreateServiceModal from './modals/CreateServiceModal';
import useMaybeNavigateNotLoggedIn from '../../../../util/hooks/useMaybeNavigateNotLoggedIn';

const BecomeTraderLanding: React.FC = () => {
  const { t } = useTranslation(['offer-your-trading-service', 'service']);
  const { showModal } = useZModal();
  const isAuthenticated = useIsAuthenticated();
  const navigateIfNotLoggedIn = useMaybeNavigateNotLoggedIn();

  const infoBarItems: InfoBarItem[] = useMemo(
    () => [
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
    ],
    [t],
  );

  const featuresItems: FeatureItem[] = useMemo(
    () => [
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
    ],
    [t],
  );

  const howWorksItems: HowWorksItem[] = useMemo(
    () => [
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
    ],
    [t],
  );

  const onClickCreateService = () => {
    if (isAuthenticated) {
      showModal(CreateServiceModal);
    } else {
      navigateIfNotLoggedIn();
    }
  };

  return (
    <Layout>
      <Header>
        <ZigTypography variant={'h1'} color={'neutral100'}>
          {t('header.title')}
        </ZigTypography>
      </Header>

      <Sections>
        <Section>
          <Wrapper>
            <Side>
              <ZigTypography variant={'h2'} color={'neutral100'}>
                {t('wrapper.title')}
              </ZigTypography>
              <WrapperList>
                <WrapperItem>
                  <ZigTypography variant={'body1'} color={'neutral300'}>
                    {t('wrapper.list.item1')}
                  </ZigTypography>
                </WrapperItem>
                <WrapperItem>
                  <ZigTypography variant={'body1'} color={'neutral300'}>
                    {t('wrapper.list.item2')}
                  </ZigTypography>
                </WrapperItem>
                <WrapperItem>
                  <ZigTypography variant={'body1'} color={'neutral300'}>
                    <Trans i18nKey={'wrapper.list.item3'} t={t}>
                      <ZigLink
                        href={
                          'https://help.zignaly.com/en/articles/6845502-rules-for-being-listed-in-the-marketplace'
                        }
                      />
                    </Trans>
                  </ZigTypography>
                </WrapperItem>
              </WrapperList>
              <WrapperAction>
                <ZigButton
                  ctaId={'offer-service__create-service'}
                  id={'offer-service__create-service'}
                  size={'large'}
                  variant={'contained'}
                  onClick={onClickCreateService}
                >
                  {t('wrapper.action')}
                </ZigButton>
              </WrapperAction>
            </Side>
            <SideImage />
          </Wrapper>
        </Section>

        <InfoBar>
          <Margin>
            <InfoBarList itemsLength={infoBarItems.length}>
              {infoBarItems.map((item, index) => (
                <InfoBarListItem key={`--info-bar-item-${index.toString()}`}>
                  <ZigTypography variant={'bigNumber'} color={'neutral100'}>
                    {item.title}
                  </ZigTypography>
                  <ZigTypography variant={'body1'} color={'neutral400'}>
                    {item.description.toUpperCase()}
                  </ZigTypography>
                </InfoBarListItem>
              ))}
            </InfoBarList>
          </Margin>
        </InfoBar>

        <Section>
          <ZigTypography variant={'h2'} color={'neutral100'}>
            {t('howWorks.title')}
          </ZigTypography>

          <StepList itemsLength={howWorksItems.length}>
            {howWorksItems.map((howWorkItem, index) => (
              <React.Fragment key={`--how-works-item-${index.toString()}`}>
                <Step>
                  <Box>
                    <Center>
                      <ZigTypography variant={'h2'} color={'neutral100'}>
                        {howWorkItem.title.toUpperCase()}
                      </ZigTypography>
                      <StepImage
                        src={'/images/service-provider/' + howWorkItem.image}
                      />
                    </Center>
                    <ZigTypography variant={'body2'} color={'neutral400'}>
                      {howWorkItem.description}
                    </ZigTypography>
                  </Box>
                </Step>
                {index < howWorksItems.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </StepList>
        </Section>

        <Section>
          <ZigTypography variant={'h2'} color={'neutral100'}>
            {t('features.title')}
          </ZigTypography>

          <FeaturesList itemsLength={featuresItems.length}>
            {featuresItems.map((feature, index) => (
              <Feature key={`--features-item-${index.toString()}`}>
                <FeatureImage
                  src={'/images/service-provider/' + feature.image}
                />
                <FeatureData>
                  <ZigTypography variant={'h3'} color={'neutral200'}>
                    {feature.title}
                  </ZigTypography>
                  <ZigTypography
                    variant={'body2'}
                    color={'neutral400'}
                    sx={{ pl: '10px' }}
                  >
                    {feature.description}
                  </ZigTypography>
                </FeatureData>
              </Feature>
            ))}
          </FeaturesList>
        </Section>
      </Sections>
    </Layout>
  );
};

export default BecomeTraderLanding;
