import {
  DropDown,
  IconButton,
  OptionHorizontalDotsIcon,
} from '@zignaly-open/ui';
import React, { useCallback, useRef } from 'react';
import { useTheme } from 'styled-components';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { NavLink, Networks } from './styles';
import { useTranslation } from 'react-i18next';
import socialNetworksLinks from '../../../util/socialNetworks';
import { supportedLanguages } from '../../../util/i18next';
import { useChangeLocale } from '../../../apis/user/use';
import { useFirstOwnedService } from '../../../apis/trader/use';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ROUTE_BECOME_TRADER,
  ROUTE_TRADING_SERVICE_MANAGE,
} from '../../../routes';
import { DropDownHandle } from '@zignaly-open/ui/lib/components/display/DropDown/types';
import { GlobeLanguagesStyled, LabelButton } from './styles';
import { LocalizationLanguages } from '../../../util/languages';

const ExtraNavigationDropdown: React.FC = () => {
  const theme = useTheme() as Theme;
  const navigate = useNavigate();
  const dropDownRef = useRef<DropDownHandle>(null);
  const { t, i18n } = useTranslation('common');
  const changeLocale = useChangeLocale();
  const service = useFirstOwnedService();

  const onClose = useCallback(() => {
    dropDownRef.current?.closeDropDown();
  }, [dropDownRef]);

  const languageMap = supportedLanguages
    ? supportedLanguages.map((x) => LocalizationLanguages[x])
    : Object.values(LocalizationLanguages);

  const handleSelectLanguage = (locale: string) => {
    onSelectLocale(locale);
  };

  if (languageMap.length === 1) return null;

  const onSelectLocale = (locale: string) => {
    changeLocale(locale);
    onClose();
  };

  return (
    <DropDown
      component={({ open }) => (
        <IconButton
          variant={'flat'}
          icon={
            <OptionHorizontalDotsIcon
              width={14}
              height={4}
              color={open ? theme.neutral100 : theme.neutral300}
            />
          }
          isFocused={open}
        />
      )}
      options={[
        {
          label: t('main-menu.dropdown-link-forTrading'),
          onClick: () =>
            navigate(
              service
                ? generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                    serviceId: service.serviceId?.toString(),
                  })
                : ROUTE_BECOME_TRADER,
            ),
        },
        {
          label: t('main-menu.dropdown-link-helpDocs'),
          href: 'https://help.zignaly.com/hc/en-us',
        },
        {
          separator: true,
          label: (
            <>
              <GlobeLanguagesStyled
                color={theme.neutral300}
                width={'26px'}
                height={'26px'}
              />
              <LabelButton variant={'body1'} color={'neutral400'}>
                {LocalizationLanguages[i18n.language?.split('_')[0]]?.label}
              </LabelButton>
            </>
          ),
          children: languageMap.map((language) => ({
            active: i18n.language === language.locale,
            label: language.label,
            onClick: () => handleSelectLanguage(language.locale),
          })),
        },
        {
          element: (
            <Networks key={'--social-networks'}>
              {socialNetworksLinks.map((socialNetwork, index) => {
                const IconComponent = socialNetwork.image;
                return (
                  <NavLink
                    as={'a'}
                    onClick={onClose}
                    href={socialNetwork.path}
                    key={`--social-network-nav-link-${index.toString()}`}
                    target={'_blank'}
                  >
                    <IconComponent height={'22px'} width={'22px'} />
                  </NavLink>
                );
              })}
            </Networks>
          ),
        },
      ]}
    />
  );
};

export default ExtraNavigationDropdown;
