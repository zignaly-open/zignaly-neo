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
import { useModal } from 'mui-modal-provider';
import { useCallback } from 'react';
import { track } from '@zignaly-open/tracker';
import { useCurrentUser } from '../../apis/user/use';
import AlertModal from './modals/AlertModal';
import ConfirmModal from './modals/ConfirmModal';
import TypeTextConfirmModal from './modals/TypeTextConfirmModal';
import { generatePath, useNavigate } from 'react-router-dom';
export function useZModal(options) {
    var _a = options || {}, customClose = _a.customClose, modalOptions = __rest(_a, ["customClose"]);
    var _b = useModal(modalOptions), showModal = _b.showModal, etc = __rest(_b, ["showModal"]);
    var userId = useCurrentUser().userId;
    var ourShowModal = useCallback(function (Component, props) {
        var _a;
        var _b = props || {}, ctaId = _b.ctaId, modalProps = __rest(_b, ["ctaId"]);
        var trackId = (_a = Component.trackId) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        trackId && track({ hash: trackId, userId: userId, ctaId: ctaId });
        var modal = showModal(Component, __assign(__assign({}, modalProps), { close: function () {
                trackId && track({ userId: userId });
                customClose ? customClose(modal) : modal.destroy();
            } }));
        return modal;
    }, [showModal, userId]);
    return __assign(__assign({}, etc), { showModal: ourShowModal, originalShowModal: showModal });
}
export function useZRouteModal(route) {
    var navigate = useNavigate();
    return useCallback(function (params) { return navigate(generatePath(route, params || {})); }, []);
}
export function useZAlert() {
    var showModal = useZModal().showModal;
    return function (props) { return showModal(AlertModal, props); };
}
export function useZConfirm() {
    var showModal = useZModal().showModal;
    return function (props) { return showModal(ConfirmModal, props); };
}
export function useZTypeWordConfirm() {
    var showModal = useZModal().showModal;
    return function (props) { return showModal(TypeTextConfirmModal, props); };
}
//# sourceMappingURL=use.js.map