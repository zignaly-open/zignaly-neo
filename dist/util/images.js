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
export function getImageOfAccount(index) {
    var id = (index % 6) + 1;
    return "/images/avatars/bg-".concat(id, ".png");
}
export var getServiceLogo = function (serviceLogo) {
    return serviceLogo || '/images/coin-broken.svg';
};
function downloadUri(name, url) {
    var a = document.createElement('a');
    a.setAttribute('download', name);
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.click();
}
export function downloadSvgElementAsSvgImage(svg, name) {
    if (!svg)
        return;
    var data = new XMLSerializer().serializeToString(svg);
    var svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    downloadUri(name, URL.createObjectURL(svgBlob));
}
var loadImage = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var img;
    return __generator(this, function (_a) {
        img = document.createElement('img');
        img.src = url;
        return [2, new Promise(function (resolve, reject) {
                img.onload = function () { return resolve(img); };
                img.onerror = reject;
            })];
    });
}); };
export var downloadSvgElementAsPngImage = function (svg, name, scale) {
    if (scale === void 0) { scale = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var svgAsXML, svgData, img, canvas, dataURL;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    svgAsXML = new XMLSerializer().serializeToString(svg);
                    svgData = "data:image/svg+xml,".concat(encodeURIComponent(svgAsXML));
                    return [4, loadImage(svgData)];
                case 1:
                    img = _a.sent();
                    canvas = document.createElement('canvas');
                    canvas.width = svg.clientWidth * scale;
                    canvas.height = svg.clientHeight * scale;
                    canvas
                        .getContext('2d')
                        .drawImage(img, 0, 0, svg.clientWidth * scale, svg.clientHeight * scale);
                    return [4, canvas.toDataURL("image/png", 1.0)];
                case 2:
                    dataURL = _a.sent();
                    downloadUri(name, dataURL);
                    return [2];
            }
        });
    });
};
//# sourceMappingURL=images.js.map