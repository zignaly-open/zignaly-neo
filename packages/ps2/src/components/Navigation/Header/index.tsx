import {
  Header as ZigHeader,
  HeaderLinksContainer,
  BrandImage,
} from '@zignaly-open/ui';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationLink } from './atoms';
import { ROUTE_DASHBOARD, ROUTE_PROFIT_SHARING } from '../../../routes';
import { Link } from 'react-router-dom';
import ExtraNavigationDropdown from '../ExtraNavigationDropdown';
import AccountMenu from '../AccountMenu';
import { track } from '@zignaly-open/tracker';
import { useCurrentUser } from '../../../apis/user/use';

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const { userId } = useCurrentUser();

  useEffect(() => {
    track({ userId });
  }, [window.location.href, userId]);

  return (
    <ZigHeader
      leftElements={[
        <Link to={ROUTE_DASHBOARD} key='logo'>
          <BrandImage
            id='menu__logo'
            height='32px'
            type='isotype'
            width='32px'
          />
        </Link>,
        <HeaderLinksContainer key='links'>
          <NavigationLink
            id='menu__profit-sharing'
            to={ROUTE_PROFIT_SHARING}
            key='--route-ps'
          >
            {t('navigation-menu.profit-sharing')}
          </NavigationLink>
        </HeaderLinksContainer>,
        <ExtraNavigationDropdown key={'extra-nav'} />,
      ]}
      rightElements={[<AccountMenu key={'account'} />]}
    />
  );
};

export default Header;
export { HeaderLinksContainer };
