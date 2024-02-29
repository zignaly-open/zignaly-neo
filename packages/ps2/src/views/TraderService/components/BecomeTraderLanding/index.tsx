import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  ZigButton,
  ZigImageColorOverride,
  ZigLink,
  ZigTypography,
} from '@zignaly-open/ui';
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
  FeatureData,
  StepList,
  Step,
  Box,
  Separator,
} from './styles';
import { FeatureItem, InfoBarItem, HowWorksItem } from './types';
import { useIsAuthenticated } from '../../../../apis/user/use';
import { useZModal } from '../../../../components/ZModal/use';
import CreateServiceModal from './modals/CreateServiceModal';
import useMaybeNavigateNotLoggedIn from '../../../../util/hooks/useMaybeNavigateNotLoggedIn';
import { whitelabel } from '../../../../whitelabel';

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
        id: 'become-trader__info-bar-assets',
      },
      {
        title: t('infoBar.item2.title'),
        description: t('infoBar.item2.description'),
        id: 'become-trader__info-bar-investors',
      },
      {
        title: t('infoBar.item3.title'),
        description: t('infoBar.item3.description'),
        id: 'become-trader__info-bar-active-services',
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
        id: 'become-trader__features-analytics',
      },
      {
        title: t('features.list.item2.title'),
        description: t('features.list.item2.description'),
        image: 'icon-tools.png',
        id: 'become-trader__features-management',
      },
      {
        title: t('features.list.item3.title'),
        description: t('features.list.item3.description'),
        image: 'icon-payouts.png',
        id: 'become-trader__features-payouts',
      },
      {
        title: t('features.list.item4.title'),
        description: t('features.list.item4.description'),
        image: 'icon-marketplace.png',
        id: 'become-trader__features-success-team',
      },
    ],
    [t],
  );

  const howWorksItems: HowWorksItem[] = useMemo(
    () => [
      {
        title: t('howWorks.list.item1.title'),
        description: t('howWorks.list.item1.description'),
        id: 'become-trader__reasons-pool-funds',
        image: 'pool-funds.png',
      },
      {
        title: t('howWorks.list.item2.title'),
        description: t('howWorks.list.item2.description'),
        id: 'become-trader__reasons-trade',
        image: 'trade.png',
      },
      {
        title: t('howWorks.list.item3.title'),
        id: 'become-trader__reasons-split-profits',
        description: t('howWorks.list.item3.description', {
          zignalyFee: whitelabel.zignalySuccessFee,
        }),
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
        <ZigTypography
          variant={'h1'}
          color={'neutral100'}
          id={'become-trader__title'}
        >
          {t('header.title')}
        </ZigTypography>
      </Header>

      <Sections>
        <Section>
          <Wrapper>
            <Side>
              <ZigTypography
                variant={'h2'}
                color={'neutral100'}
                id={'become-trader__benefits-title'}
              >
                {t('wrapper.title')}
              </ZigTypography>
              <WrapperList>
                <WrapperItem>
                  <ZigTypography
                    variant={'body1'}
                    color={'neutral300'}
                    id={'become-trader__benefits-benefit-1'}
                  >
                    {t('wrapper.list.item1')}
                  </ZigTypography>
                </WrapperItem>
                <WrapperItem>
                  <ZigTypography
                    variant={'body1'}
                    color={'neutral300'}
                    id={'become-trader__benefits-benefit-2'}
                  >
                    {t('wrapper.list.item2')}
                  </ZigTypography>
                </WrapperItem>
                <WrapperItem>
                  <ZigTypography
                    variant={'body1'}
                    color={'neutral300'}
                    id={'become-trader__benefits-benefit-3'}
                  >
                    <Trans i18nKey={'wrapper.list.item3'} t={t}>
                      <ZigLink
                        id={'become-trader__benefits-marketplace-link'}
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
                  id={'become-trader__create-service'}
                  size={'large'}
                  variant={'contained'}
                  onClick={onClickCreateService}
                >
                  {t('wrapper.action')}
                </ZigButton>
              </WrapperAction>
            </Side>
            <SideImage id={'become-trader__side-image'} />
          </Wrapper>
        </Section>

        <InfoBar>
          <Margin>
            <InfoBarList itemsLength={infoBarItems.length}>
              {infoBarItems.map((item, index) => (
                <InfoBarListItem key={`--info-bar-item-${index.toString()}`}>
                  <ZigTypography
                    variant={'bigNumber'}
                    color={'neutral100'}
                    id={item.id && `${item.id}-number`}
                  >
                    {item.title}
                  </ZigTypography>
                  <ZigTypography
                    variant={'body1'}
                    color={'neutral400'}
                    id={item.id}
                  >
                    {item.description.toUpperCase()}
                  </ZigTypography>
                </InfoBarListItem>
              ))}
            </InfoBarList>
          </Margin>
        </InfoBar>

        <Section>
          <ZigTypography
            variant={'h2'}
            color={'neutral100'}
            id={'become-trader__reasons-title'}
          >
            {t('howWorks.title')}
          </ZigTypography>

          <StepList itemsLength={howWorksItems.length}>
            {howWorksItems.map((howWorkItem, index) => (
              <React.Fragment key={`--how-works-item-${index.toString()}`}>
                <Step>
                  <Box>
                    <Center>
                      <ZigTypography
                        variant={'h2'}
                        color={'neutral100'}
                        id={howWorkItem.id && `${howWorkItem.id}-title`}
                      >
                        {howWorkItem.title.toUpperCase()}
                      </ZigTypography>
                      <ZigImageColorOverride
                        width={300}
                        height={150}
                        href={'/images/service-provider/' + howWorkItem.image}
                        id={howWorkItem.id && `${howWorkItem.id}-image`}
                      />
                    </Center>
                    <ZigTypography
                      variant={'body2'}
                      color={'neutral400'}
                      id={howWorkItem.id && `${howWorkItem.id}-description`}
                    >
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
          <ZigTypography
            variant={'h2'}
            color={'neutral100'}
            id={'become-trader__features-title'}
          >
            {t('features.title')}
          </ZigTypography>

          <FeaturesList itemsLength={featuresItems.length}>
            {featuresItems.map((feature, index) => (
              <Feature key={`--features-item-${index.toString()}`}>
                <ZigImageColorOverride
                  width={80}
                  height={80}
                  href={'/images/service-provider/' + feature.image}
                  id={feature.id && `${feature.id}-image`}
                />
                <FeatureData>
                  <ZigTypography
                    variant={'h3'}
                    color={'neutral200'}
                    id={feature.id && `${feature.id}-title`}
                  >
                    {feature.title}
                  </ZigTypography>
                  <ZigTypography
                    variant={'body2'}
                    color={'neutral400'}
                    sx={{ pl: '10px' }}
                    id={feature.id && `${feature.id}-description`}
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
