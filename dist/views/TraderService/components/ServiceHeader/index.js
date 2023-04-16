import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MarginContainer, MenuDropDown, ZigTypography } from '@zignaly-open/ui';
import { Layout, Container, Options, Option } from './styles';
import { useIsServiceOwner, useTraderServices, } from '../../../../apis/service/use';
import { generatePath, Link, useParams, useLocation } from 'react-router-dom';
import { RouteDropdown, RouteGroup } from './atoms';
import { ROUTE_TRADING_SERVICE, ROUTE_TRADING_SERVICE_API, ROUTE_TRADING_SERVICE_INVESTORS, ROUTE_TRADING_SERVICE_MANAGE, ROUTE_TRADING_SERVICE_EDIT, } from '../../../../routes';
function ServiceHeader() {
    var _a;
    var menuDropDownRef = useRef(null);
    var t = useTranslation('service-header').t;
    var serviceId = useParams().serviceId;
    var currentPath = (_a = useLocation()) === null || _a === void 0 ? void 0 : _a.pathname;
    var isOwner = useIsServiceOwner(serviceId);
    var myServicesList = useTraderServices().data;
    var activeService = myServicesList === null || myServicesList === void 0 ? void 0 : myServicesList.find(function (s) { return s.serviceId === serviceId; });
    useEffect(function () {
        var _a;
        if (menuDropDownRef && menuDropDownRef.current) {
            (_a = menuDropDownRef === null || menuDropDownRef === void 0 ? void 0 : menuDropDownRef.current) === null || _a === void 0 ? void 0 : _a.setIsDropDownActive(false);
        }
    }, [serviceId]);
    if (!isOwner) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(Layout, null,
        React.createElement(MarginContainer, null,
            React.createElement(Container, null,
                React.createElement(MenuDropDown, { id: 'service-management-header__choose-service', ref: menuDropDownRef, title: activeService === null || activeService === void 0 ? void 0 : activeService.serviceName, secondaryTitle: t('dropdown.manageServices'), dropDownOptions: {
                        maxHeight: '300px',
                    } },
                    React.createElement(Options, null, myServicesList === null || myServicesList === void 0 ? void 0 : myServicesList.map(function (service) { return (React.createElement(Link, { id: "service-management-header__choose-".concat(service === null || service === void 0 ? void 0 : service.serviceId), to: currentPath.replace(serviceId, service === null || service === void 0 ? void 0 : service.serviceId), key: "--route-key-".concat(service === null || service === void 0 ? void 0 : service.serviceId) },
                        React.createElement(Option, { active: serviceId === (service === null || service === void 0 ? void 0 : service.serviceId) },
                            React.createElement(ZigTypography, { variant: 'body1' }, service === null || service === void 0 ? void 0 : service.serviceName)))); }))),
                React.createElement(RouteGroup, { routes: [
                        {
                            name: t('managements-label'),
                            path: generatePath(ROUTE_TRADING_SERVICE_MANAGE, {
                                serviceId: serviceId,
                            }),
                            id: "service-management-header__manage-funds",
                        },
                    ] }),
                React.createElement(RouteGroup, { routes: [
                        {
                            name: t('dropdown.trade.links.api'),
                            path: generatePath(ROUTE_TRADING_SERVICE_API, { serviceId: serviceId }),
                            id: "service-management-header__service-api",
                        },
                    ] }),
                React.createElement(RouteGroup, { routes: [
                        {
                            name: t('investors-label'),
                            path: generatePath(ROUTE_TRADING_SERVICE_INVESTORS, {
                                serviceId: serviceId,
                            }),
                            id: "service-management-header__investors",
                        },
                    ] }),
                React.createElement(RouteDropdown, { id: 'service-management-header__choose-option', title: t('dropdown.profile.title'), routes: [
                        {
                            name: t('dropdown.profile.links.profile'),
                            path: generatePath(ROUTE_TRADING_SERVICE, {
                                serviceId: serviceId,
                            }),
                            id: "service-management-header__service-profile",
                        },
                        {
                            name: t('dropdown.profile.links.profile-edit'),
                            path: generatePath(ROUTE_TRADING_SERVICE_EDIT, {
                                serviceId: serviceId,
                            }),
                            id: "service-management-header__edit-service",
                        },
                    ] })))));
}
export default ServiceHeader;
//# sourceMappingURL=index.js.map