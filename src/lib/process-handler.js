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
import { existsSync, mkdirSync, writeFileSync } from "fs";
import getAsins from "./scraping/get-asins.js";
import getProducts from "./scraping/get-products.js";
import { productLimit } from "../../cas.config.js";
import traverseSubcategories from "./traverse-subcategories.js";
export default function handleProcess(node, root) {
    return __awaiter(this, void 0, void 0, function () {
        function camelize(str) {
            return str
                .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
                .replace(/\s+/g, "");
        }
        var _a, _b, _i, key, path, _c, node_1, category, asinCodes, products;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!(typeof (node !== null) &&
                        typeof (node === "object") &&
                        !Array.isArray(node))) return [3 /*break*/, 5];
                    _a = [];
                    for (_b in node)
                        _a.push(_b);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    key = _a[_i];
                    path = "".concat(root, "/").concat(key);
                    if (!existsSync(path))
                        mkdirSync(path);
                    return [4 /*yield*/, handleProcess(node[key], path)];
                case 2:
                    _d.sent();
                    traverseSubcategories(node[key], handleProcess, root);
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 10];
                case 5:
                    if (!(typeof (node !== null) &&
                        typeof (node === "array") &&
                        Array.isArray(node))) return [3 /*break*/, 10];
                    _c = 0, node_1 = node;
                    _d.label = 6;
                case 6:
                    if (!(_c < node_1.length)) return [3 /*break*/, 10];
                    category = node_1[_c];
                    console.log("array category of node: ".concat(category));
                    return [4 /*yield*/, getAsins(category, productLimit)];
                case 7:
                    asinCodes = _d.sent();
                    return [4 /*yield*/, getProducts(asinCodes)];
                case 8:
                    products = _d.sent();
                    writeFileSync("".concat(root, "/").concat(camelize(category).replace("'", ""), "_Product-Data.json"), JSON.stringify(products));
                    _d.label = 9;
                case 9:
                    _c++;
                    return [3 /*break*/, 6];
                case 10: return [2 /*return*/];
            }
        });
    });
}
