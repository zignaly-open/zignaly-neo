import React, { ReactElement } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { DropDownContainer, NavLink, NavList } from './styles';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

export function NavigationLink({
  children,
  to,
  ...props
}: LinkProps): ReactElement {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link className={match ? 'active' : undefined} to={to} {...props}>
      {children}
    </Link>
  );
}

export function HeaderDropdown({
  onClose,
}: {
  onClose: () => void;
}): ReactElement {
  const { t, i18n } = useTranslation('common');
  return (
    <DropDownContainer>
      <NavList>
        {/*<Link*/}
        {/*  href={`${*/}
        {/*    isOwnerServices &&*/}
        {/*    defaultServicesItem &&*/}
        {/*    defaultServicesItem.serviceId*/}
        {/*      ? `/profit-sharing/${defaultServicesItem.serviceId}/managements`*/}
        {/*      : 'trading-services'*/}
        {/*  }`}*/}
        {/*>*/}
        {/*  <NavLink onClick={onClose}>*/}
        {/*    {t('main-menu.dropdown-link-forTrading')}*/}
        {/*  </NavLink>*/}
        {/*</Link>*/}
      </NavList>
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
          onSelectLocale={(locale) => {
            i18n.changeLanguage(locale);
            onClose();
          }}
        />
      </NavList>
      {/*<Networks>*/}
      {/*  {socialNetworksLinks.map((socialNetwork, index) => {*/}
      {/*    const IconComponent = socialNetwork.image;*/}
      {/*    return (*/}
      {/*      <NavLink*/}
      {/*        onClick={handleClickClose}*/}
      {/*        href={socialNetwork.path}*/}
      {/*        key={`--social-network-nav-link-${index.toString()}`}*/}
      {/*        target={'_blank'}*/}
      {/*      >*/}
      {/*        <IconComponent height={'22px'} width={'22px'} />*/}
      {/*      </NavLink>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</Networks>*/}
    </DropDownContainer>
  );
}
