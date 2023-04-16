var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Modal as MuiModal } from '@mui/material';
import { LoaderContainer } from './styles';
import { Loader } from '@zignaly-open/ui';
import ModalContainer from './ModalContainer';
import AuthenticatedWall from '../../util/walls/AuthenticatedWall';
import { useIsAuthenticated, useMaybeMakeSureSessionIsAlive, } from '../../apis/user/use';
var ZModal = function (_a) {
    var close = _a.close, isLoading = _a.isLoading, authOnly = _a.authOnly, children = _a.children, onGoBack = _a.onGoBack, title = _a.title, width = _a.width, wide = _a.wide, titleAlign = _a.titleAlign, props = __rest(_a, ["close", "isLoading", "authOnly", "children", "onGoBack", "title", "width", "wide", "titleAlign"]);
    var isAuthenticated = useIsAuthenticated();
    useMaybeMakeSureSessionIsAlive(!!authOnly);
    return (React.createElement(MuiModal, __assign({}, props, { onClose: close, style: {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
        } }),
        React.createElement(ModalContainer, { width: (wide && 784) || width, title: title, onClickClose: close, onGoBack: onGoBack, titleAlign: titleAlign }, isLoading ? (React.createElement(LoaderContainer, null,
            React.createElement(Loader, { color: '#fff', ariaLabel: 'Loading...' }))) : authOnly && !isAuthenticated ? (React.createElement(AuthenticatedWall, null)) : (React.createElement(React.Fragment, null, children)))));
};
export default ZModal;
//# sourceMappingURL=index.js.map