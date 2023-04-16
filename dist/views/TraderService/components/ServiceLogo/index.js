var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { Avatar, ZigButton } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Close, Edit } from '@mui/icons-material';
import { LogoContainer } from './styles';
import { getServiceLogo } from 'util/images';
import { uploadImage } from 'apis/cloudinary';
var ServiceLogo = function (_a) {
    var service = _a.service, value = _a.value, onChange = _a.onChange;
    var t = useTranslation('service').t;
    var _b = useState(false), uploading = _b[0], setUploading = _b[1];
    function uploadLogo(e) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setUploading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4, uploadImage(e.target.files[0])];
                    case 2:
                        data = _a.sent();
                        onChange(data.secure_url);
                        return [3, 4];
                    case 3:
                        setUploading(false);
                        return [7];
                    case 4: return [2];
                }
            });
        });
    }
    return (React.createElement(Box, { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 1 },
        React.createElement(LogoContainer, null,
            React.createElement(Avatar, { size: 'xx-large', alt: t('logo-alt', { name: service.name }), image: getServiceLogo(value) }),
            uploading ? (React.createElement(CircularProgress, { size: 24 })) : (value && (React.createElement(IconButton, { onClick: function () { return onChange(''); } },
                React.createElement(Close, null))))),
        React.createElement(ZigButton, { startIcon: React.createElement(Edit, null), variant: 'text', component: 'label' },
            t('edit.logo'),
            React.createElement("input", { hidden: true, type: 'file', onChange: uploadLogo }))));
};
export default ServiceLogo;
//# sourceMappingURL=index.js.map