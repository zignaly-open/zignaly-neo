import {
  DropDown,
  IconButton,
  OptionHorizontalDotsIcon,
} from '@zignaly-open/ui';
import React, { useCallback, useRef } from 'react';
import { useTheme } from '@mui/material';
import { NavLink, Networks } from './styles';
import { useTranslation } from 'react-i18next';
import socialNetworksLinks from '../../../util/socialNetworks';
import { supportedLanguages } from '../../../util/i18next';
import { useChangeLocale } from '../../../apis/user/use';
import {
  useFirstOwnedService,
  useTraderServices,
} from '../../../apis/service/use';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ROUTE_BECOME_TRADER,
  ROUTE_TRADING_SERVICE_MANAGE,
} from '../../../routes';
import {
  DropDownHandle,
  DropDownOption,
} from '@zignaly-open/ui/lib/components/display/DropDown/types';
import { GlobeLanguagesStyled, LabelButton } from './styles';
import { LocalizationLanguages } from '../../../util/languages';

const ExtraNavigationDropdown: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dropDownRef = useRef<DropDownHandle>(null);
  const { t, i18n } = useTranslation('common');
  const changeLocale = useChangeLocale();
  const service = useFirstOwnedService();
  const { data: traderServices } = useTraderServices();

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

  let options: DropDownOption[] = [
    {
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
    },
    {
      label: t('main-menu.dropdown-link-helpDocs'),
      id: 'menu-dropdown__help-docs',
      target: '_blank',
      href: 'https://help.zignaly.com/hc/en-us',
    },
    {
      separator: true,
      id: 'menu-dropdown__language-switcher',
      label: (
        <>
          <GlobeLanguagesStyled
            color={theme.palette.neutral300}
            width={'26px'}
            height={'26px'}
          />
          <LabelButton variant={'body1'} color={'neutral400'}>
            {LocalizationLanguages[i18n.language?.split('_')[0]]?.label}
          </LabelButton>
        </>
      ),
      children: languageMap.map((language, index) => ({
        id: `menu-dropdown-languages__${index.toString()}`,
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
    },
  ];

  if (languageMap.length === 1) {
    options = options.filter(
      (x) => x.id !== 'menu-dropdown__language-switcher',
    );
  }

  if (!traderServices?.length) {
    options = options.filter((x) => x.id !== 'menu-dropdown__for-trading');
  }

  return (
    <DropDown
      component={({ open }) => (
        <IconButton
          id={'menu__dropdown-trading'}
          variant={'flat'}
          icon={
            <OptionHorizontalDotsIcon
              width={14}
              height={4}
              color={open ? theme.palette.neutral100 : theme.palette.neutral300}
            />
          }
          isFocused={open}
        />
      )}
      options={options}
    />
  );
};

export default ExtraNavigationDropdown;
