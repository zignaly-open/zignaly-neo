import { ZigDropdown, ZigDropdownHandleType } from '@zignaly-open/ui';
import { ZigDotsHorizontalIcon } from '@zignaly-open/ui/icons';
import React, { useCallback, useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { GlobeLanguagesStyled, LabelButton, NavLink, Networks } from './styles';
import { useTranslation } from 'react-i18next';
import socialNetworksLinks from '../../../util/socialNetworks';
import { supportedLanguages } from '../../../util/i18n/i18next';
import { useChangeLocale, useIsAuthenticated } from '../../../apis/user/use';
import {
  useFirstOwnedService,
  useTraderServices,
} from '../../../apis/service/use';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ROUTE_BECOME_TRADER,
  ROUTE_TRADING_SERVICE_MANAGE,
} from '../../../routes';
import { LocalizationLanguages } from '../../../util/i18n/languages';
import { HeaderDropdownButton } from '../AccountMenu/styles';
import { ZigDropdownProps } from '@zignaly-open/ui/src/components/display/ZigDropdown/types';
import { whitelabel } from '../../../whitelabel';

const ExtraNavigationDropdown: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dropDownRef = useRef<ZigDropdownHandleType>(null);
  const { t, i18n } = useTranslation('common');
  const changeLocale = useChangeLocale();
  const service = useFirstOwnedService();
  const { data: traderServices, isFetching } = useTraderServices();
  const isAuthenticated = useIsAuthenticated();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  const onClose = useCallback(() => {
    dropDownRef.current?.closeDropDown();
  }, [dropDownRef]);

  const languageMap = supportedLanguages
    ? supportedLanguages.map((x) => LocalizationLanguages[x])
    : Object.values(LocalizationLanguages);

  const handleSelectLanguage = (locale: string) => {
    onSelectLocale(locale);
  };

  const onSelectLocale = (locale: string) => {
    changeLocale(locale);
    onClose();
  };

  const separatorElement = {
    separator: true,
    sx: `margin-top: 11px; margin-bottom: 12px;user-select: none;`,
  };

  const helperElement = !!whitelabel.links?.helpUrl && {
    label: t('main-menu.dropdown-link-helpDocs'),
    id: 'menu-dropdown__help-docs',
    target: '_blank',
    href: whitelabel.links.helpUrl,
  };

  const socialLinks = socialNetworksLinks.length > 0 && {
    element: (
      <Networks key={'--social-networks'}>
        {socialNetworksLinks.map((socialNetwork, index) => {
          const IconComponent = socialNetwork.image;
          return (
            <NavLink
              onClick={onClose}
              href={socialNetwork.path}
              key={`--social-network-nav-link-${index.toString()}`}
              id={`menu-dropdown__social-network-${index.toString()}`}
              target={'_blank'}
            >
              <IconComponent height={'22px'} width={'22px'} />
            </NavLink>
          );
        })}
      </Networks>
    ),
  };

  const languageElement = languageMap.length > 1 && {
    id: 'menu-dropdown__language-switcher',
    label: (
      <>
        <GlobeLanguagesStyled
          // yeah, why not change the icon to a shade slightly different from the text
          color={theme.palette.neutral300}
          width={'26px'}
          height={'26px'}
        />
        <LabelButton variant={'body1'} color={'neutral400'}>
          {LocalizationLanguages[i18n.language?.split('_')[0]]?.label}
        </LabelButton>
      </>
    ),
    customStyle: !socialLinks ? `margin-bottom: 6px` : undefined,
    children: languageMap.map((language, index) => ({
      id: `menu-dropdown-languages__${index.toString()}`,
      active: i18n.language === language.locale,
      label: language.label,
      onClick: () => handleSelectLanguage(language.locale),
    })),
  };

  const manageService = isAuthenticated &&
    !!traderServices?.length &&
    !isFetching && {
      label: t('main-menu.dropdown-link-forTrading'),
      id: 'menu-dropdown__for-trading',
      href:
        service &&
        generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
          serviceId: service.serviceId?.toString(),
        }),
      onClick: () =>
        navigate(
          service
            ? generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                serviceId: service.serviceId?.toString(),
              })
            : ROUTE_BECOME_TRADER,
        ),
    };

  const becomeTrader = !md && {
    label: t('navigation-menu.become-trader'),
    id: 'menu-dropdown__become-trader',
    href: ROUTE_BECOME_TRADER,
    onClick: () => navigate(ROUTE_BECOME_TRADER),
  };

  const options: ZigDropdownProps['options'] = [
    manageService,
    becomeTrader,
    helperElement,
    !!(manageService || becomeTrader || helperElement) &&
      !!(languageElement || socialLinks) &&
      separatorElement,
    languageElement,
    socialLinks,
  ].filter(Boolean);

  return (
    <ZigDropdown
      component={({ open }) => (
        <HeaderDropdownButton id={'menu__dropdown-trading'} active={open}>
          <ZigDotsHorizontalIcon
            width={20}
            height={4}
            color={open ? theme.palette.neutral100 : theme.palette.neutral300}
          />
        </HeaderDropdownButton>
      )}
      options={options}
    />
  );
};

export default ExtraNavigationDropdown;
