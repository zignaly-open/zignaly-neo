import { Box } from '@mui/system';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { TextButton, ZigTypography } from '@zignaly-open/ui';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { HideReadMoreEffects, MarkdownContainer } from '../styles';
import breaks from 'remark-breaks';
var MarkdownSection = function (_a) {
    var title = _a.title, subtitle = _a.subtitle, _b = _a.readMore, readMore = _b === void 0 ? true : _b, _c = _a.heightLimit, heightLimit = _c === void 0 ? 120 : _c, content = _a.content, emptyText = _a.emptyText;
    var t = useTranslation('action').t;
    var ref = useRef();
    var chunks = (content || '').trim().split(/\n+/).filter(Boolean);
    var _d = (ref === null || ref === void 0 ? void 0 : ref.current) || {}, _e = _d.scrollHeight, scrollHeight = _e === void 0 ? 0 : _e, _f = _d.clientHeight, clientHeight = _f === void 0 ? 0 : _f;
    var _g = useState(false), shown = _g[0], setShown = _g[1];
    var _h = useState(readMore), shouldShowReadMore = _h[0], setShouldShowReadMore = _h[1];
    var delta = 24 * 2;
    useLayoutEffect(function () {
        if (scrollHeight && clientHeight && scrollHeight - delta < heightLimit) {
            setShouldShowReadMore(false);
        }
    }, [clientHeight && scrollHeight]);
    useLayoutEffect(function () {
        if (scrollHeight &&
            clientHeight &&
            scrollHeight > clientHeight &&
            scrollHeight - delta < clientHeight) {
            setShown(true);
        }
    }, [scrollHeight, clientHeight]);
    var Icon = shown ? RemoveIcon : AddIcon;
    return (React.createElement(Box, { mt: 8, mb: 4 },
        React.createElement(ZigTypography, { variant: 'h2', sx: { mb: 1 } }, title),
        subtitle,
        React.createElement(HideReadMoreEffects, { ref: ref, open: shown || !shouldShowReadMore, heightLimit: heightLimit }, chunks.length ? (React.createElement(MarkdownContainer, null,
            React.createElement(ReactMarkdown, { remarkPlugins: [breaks], linkTarget: '_blank' }, content))) : (React.createElement(ZigTypography, { color: 'neutral400' }, emptyText))),
        shouldShowReadMore && (React.createElement(TextButton, { leftElement: React.createElement(Icon, { sx: { color: '#65647E' }, width: 16, height: 16 }), caption: shown ? t('read-less') : t('read-more'), color: 'links', onClick: function () { return setShown(function (v) { return !v; }); } }))));
};
export default MarkdownSection;
//# sourceMappingURL=MarkdownSection.js.map