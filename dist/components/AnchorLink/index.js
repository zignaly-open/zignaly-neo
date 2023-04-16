var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';
var AnchorLink = styled(Link)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  color: ", ";\n\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  color: ", ";\n\n  &:hover {\n    text-decoration: underline;\n  }\n"])), function (props) { return props.theme.palette.links; });
export var ExternalLink = styled('a')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: ", ";\n\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  color: ", ";\n\n  &:hover {\n    text-decoration: underline;\n  }\n"])), function (props) { return props.theme.palette.links; });
ExternalLink.defaultProps = { target: '_blank' };
export default AnchorLink;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map