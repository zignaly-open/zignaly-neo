import { IconButton, OptionHorizontalDotsIcon } from '@zignaly-open/ui';
import React, { useCallback, useRef } from 'react';
import { useTheme } from 'styled-components';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { DropDownContainer, NavLink, NavList, Networks } from './styles';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from 'react-i18next';
import socialNetworksLinks from '../../../util/socialNetworks';
import { supportedLanguages } from '../../../util/i18next';
import { useChangeLocale } from '../../auth/use';

const ExtraNavigationDropdown: React.FC = () => {
  const theme = useTheme() as Theme;
  const dropDownRef = useRef(null);
  const { t, i18n } = useTranslation('common');
  const onClose = useCallback(() => {
    dropDownRef.current?.closeDropDown();
  }, [dropDownRef]);

  const changeLocale = useChangeLocale();

  const onSelectLocale = (locale: string) => {
    changeLocale(locale);
    onClose();
  };

  return (
    <IconButton
      ref={dropDownRef}
      variant={'flat'}
      icon={
        <OptionHorizontalDotsIcon
          width={14}
          height={4}
          color={theme.neutral300}
        />
      }
      key={'user'}
      renderDropDown={
        <DropDownContainer>
          <NavList>
            <NavLink
              as={'a'}
              href={'https://help.zignaly.com/hc/en-us'}
              target={'_blank'}
              onClick={onClose}
            >
              {t('main-menu.dropdown-link-helpDocs')}
            </NavLink>
            {/* <NavLink disabled={true}>
                    <Bold>ZIG</Bold> $0.0514
                  </NavLink> */}
          </NavList>
          <NavList className={'last'}>
            <LanguageSelector
              selectedLocale={i18n.language}
              supportedLocales={supportedLanguages}
              onSelectLocale={onSelectLocale}
            />
          </NavList>
          <Networks>
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
        </DropDownContainer>
      }
    />
  );
};

export default ExtraNavigationDropdown;
