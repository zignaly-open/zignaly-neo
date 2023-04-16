import React from 'react';
import { MenuDropDown, Typography } from '@zignaly-open/ui';
import { HeadOption } from './styles';
import { Link, useLocation } from 'react-router-dom';
export var ServiceListOption = function (_a) {
    var path = _a.path, label = _a.label, id = _a.id;
    var location = useLocation();
    return (React.createElement(Link, { to: path, id: id },
        React.createElement(HeadOption, { active: location.pathname === path },
            React.createElement(Typography, { variant: 'h3' }, label))));
};
export var RouteGroup = function (_a) {
    var routes = _a.routes;
    return (React.createElement(React.Fragment, null, routes.map(function (r) { return (React.createElement(ServiceListOption, { id: r.id, path: r.path, key: r.path, label: r.name })); })));
};
export var RouteDropdown = function (_a) {
    var _b;
    var id = _a.id, routes = _a.routes, title = _a.title;
    var activePath = (_b = useLocation()) === null || _b === void 0 ? void 0 : _b.pathname;
    return (React.createElement(React.Fragment, null,
        React.createElement(MenuDropDown, { id: id, title: title, dropDownOptions: {
                maxHeight: '300px',
            }, focused: routes.some(function (x) { return activePath === x.path; }) },
            React.createElement(RouteGroup, { routes: routes }))));
};
//# sourceMappingURL=atoms.js.map