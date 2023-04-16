var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { DropDown, IconButton, OptionHorizontalDotsIcon, } from '@zignaly-open/ui';
import React, { useCallback, useRef } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { NavLink, Networks } from './styles';
import { useTranslation } from 'react-i18next';
import socialNetworksLinks from '../../../util/socialNetworks';
import { supportedLanguages } from '../../../util/i18next';
import { useChangeLocale, useIsAuthenticated } from '../../../apis/user/use';
import { useFirstOwnedService, useTraderServices, } from '../../../apis/service/use';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_BECOME_TRADER, ROUTE_TRADING_SERVICE_MANAGE, } from '../../../routes';
import { GlobeLanguagesStyled, LabelButton } from './styles';
import { LocalizationLanguages } from '../../../util/languages';
var ExtraNavigationDropdown = function () {
    var _a, _b, _c;
    var theme = useTheme();
    var navigate = useNavigate();
    var dropDownRef = useRef(null);
    var _d = useTranslation('common'), t = _d.t, i18n = _d.i18n;
    var changeLocale = useChangeLocale();
    var service = useFirstOwnedService();
    var _e = useTraderServices(), traderServices = _e.data, isFetching = _e.isFetching;
    var isAuthenticated = useIsAuthenticated();
    var md = useMediaQuery(theme.breakpoints.up('md'));
    var onClose = useCallback(function () {
        var _a;
        (_a = dropDownRef.current) === null || _a === void 0 ? void 0 : _a.closeDropDown();
    }, [dropDownRef]);
    var languageMap = supportedLanguages
        ? supportedLanguages.map(function (x) { return LocalizationLanguages[x]; })
        : Object.values(LocalizationLanguages);
    var handleSelectLanguage = function (locale) {
        onSelectLocale(locale);
    };
    var onSelectLocale = function (locale) {
        changeLocale(locale);
        onClose();
    };
    var options = [
        {
            label: t('main-menu.dropdown-link-helpDocs'),
            id: 'menu-dropdown__help-docs',
            target: '_blank',
            href: 'https://help.zignaly.com/hc/en-us',
        },
        {
            separator: true,
            id: 'menu-dropdown__language-switcher',
            label: (React.createElement(React.Fragment, null,
                React.createElement(GlobeLanguagesStyled, { color: theme.palette.neutral300, width: '26px', height: '26px' }),
                React.createElement(LabelButton, { variant: 'body1', color: 'neutral400' }, (_b = LocalizationLanguages[(_a = i18n.language) === null || _a === void 0 ? void 0 : _a.split('_')[0]]) === null || _b === void 0 ? void 0 : _b.label))),
            children: languageMap.map(function (language, index) { return ({
                id: "menu-dropdown-languages__".concat(index.toString()),
                active: i18n.language === language.locale,
                label: language.label,
                onClick: function () { return handleSelectLanguage(language.locale); },
            }); }),
        },
        {
            element: (React.createElement(Networks, { key: '--social-networks' }, socialNetworksLinks.map(function (socialNetwork, index) {
                var IconComponent = socialNetwork.image;
                return (React.createElement(NavLink, { onClick: onClose, href: socialNetwork.path, key: "--social-network-nav-link-".concat(index.toString()), id: "menu-dropdown__social-network-".concat(index.toString()), target: '_blank' },
                    React.createElement(IconComponent, { height: '22px', width: '22px' })));
            }))),
        },
    ];
    if (languageMap.length === 1) {
        options = options.filter(function (x) { return x.id !== 'menu-dropdown__language-switcher'; });
    }
    if (!md) {
        options = __spreadArray([
            {
                label: t('navigation-menu.become-trader'),
                id: 'menu-dropdown__become-trader',
                href: ROUTE_BECOME_TRADER,
                onClick: function () { return navigate(ROUTE_BECOME_TRADER); },
            }
        ], options, true);
    }
    if (isAuthenticated && (traderServices === null || traderServices === void 0 ? void 0 : traderServices.length) && !isFetching) {
        options = __spreadArray([
            {
                label: t('main-menu.dropdown-link-forTrading'),
                id: 'menu-dropdown__for-trading',
                href: service &&
                    generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                        serviceId: (_c = service.serviceId) === null || _c === void 0 ? void 0 : _c.toString(),
                    }),
                onClick: function () {
                    var _a;
                    return navigate(service
                        ? generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                            serviceId: (_a = service.serviceId) === null || _a === void 0 ? void 0 : _a.toString(),
                        })
                        : ROUTE_BECOME_TRADER);
                },
            }
        ], options, true);
    }
    return (React.createElement(DropDown, { component: function (_a) {
            var open = _a.open;
            return (React.createElement(IconButton, { id: 'menu__dropdown-trading', variant: 'flat', icon: React.createElement(OptionHorizontalDotsIcon, { width: 14, height: 4, color: open ? theme.palette.neutral100 : theme.palette.neutral300 }), isFocused: open }));
        }, options: options }));
};
export default ExtraNavigationDropdown;
//# sourceMappingURL=index.js.map