import React from 'react';
import { useTheme } from '@mui/material';
import { Layout, Header, Title, Body, HeaderButton, Inline } from './styles';
import { CloseIcon, ArrowLeftIcon } from '@zignaly-open/ui';
function ModalContainer(_a) {
    var children = _a.children, _b = _a.title, title = _b === void 0 ? null : _b, _c = _a.titleAlign, titleAlign = _c === void 0 ? 'left' : _c, _d = _a.onGoBack, onGoBack = _d === void 0 ? null : _d, width = _a.width, _e = _a.onClickClose, onClickClose = _e === void 0 ? null : _e, _f = _a.customHeaderAction, customHeaderAction = _f === void 0 ? null : _f;
    var theme = useTheme();
    return (React.createElement(Layout, { width: width },
        React.createElement(Header, { compact: !title && !onGoBack },
            React.createElement(Inline, { align: titleAlign },
                onGoBack && typeof onGoBack === 'function' && (React.createElement(HeaderButton, { onClick: onGoBack },
                    React.createElement(ArrowLeftIcon, { width: '32px', height: '32px', color: theme.palette.neutral300 }))),
                !!title && (React.createElement(Title, { variant: 'h1', sx: { paddingRight: '20px' }, color: 'neutral100' }, title))),
            !customHeaderAction
                ? onClickClose &&
                    typeof onClickClose === 'function' && (React.createElement(HeaderButton, { onClick: onClickClose },
                    React.createElement(CloseIcon, { color: theme.palette.neutral300 })))
                : customHeaderAction),
        React.createElement(Body, null, children)));
}
export default ModalContainer;
//# sourceMappingURL=index.js.map