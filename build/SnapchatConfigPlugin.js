"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var config_plugins_1 = require("@expo/config-plugins");
var fs_1 = require("fs");
var path_1 = require("path");
var SnapchatConfigPlugin = function (expoConfig) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (!((_b = (_a = expoConfig === null || expoConfig === void 0 ? void 0 : expoConfig.extra) === null || _a === void 0 ? void 0 : _a.SnapKit) === null || _b === void 0 ? void 0 : _b.OAuth2ClientID))
        return expoConfig;
    var props = {
        OAuth2ClientID: (_d = (_c = expoConfig === null || expoConfig === void 0 ? void 0 : expoConfig.extra) === null || _c === void 0 ? void 0 : _c.SnapKit) === null || _d === void 0 ? void 0 : _d.OAuth2ClientID,
        Scheme: ((_f = (_e = expoConfig === null || expoConfig === void 0 ? void 0 : expoConfig.extra) === null || _e === void 0 ? void 0 : _e.SnapKit) === null || _f === void 0 ? void 0 : _f.Scheme) || "AppSchemeEXample",
        SCSDKRedirectUrl: ((_h = (_g = expoConfig === null || expoConfig === void 0 ? void 0 : expoConfig.extra) === null || _g === void 0 ? void 0 : _g.SnapKit) === null || _h === void 0 ? void 0 : _h.SCSDKRedirectUrl) ||
            "snapkitexample://main/auth",
        NSCameraUsageDescription: ((_k = (_j = expoConfig === null || expoConfig === void 0 ? void 0 : expoConfig.extra) === null || _j === void 0 ? void 0 : _j.SnapKit) === null || _k === void 0 ? void 0 : _k.NSCameraUsageDescription) ||
            "Capture photos for SnapChat",
        NSMicrophoneUsageDescription: ((_m = (_l = expoConfig === null || expoConfig === void 0 ? void 0 : expoConfig.extra) === null || _l === void 0 ? void 0 : _l.SnapKit) === null || _m === void 0 ? void 0 : _m.NSMicrophoneUsageDescription) ||
            "Capture videos for SnapChat"
    };
    var targetSdkVersion;
    var config = (0, config_plugins_1.withInfoPlist)(expoConfig, function (modConfig) {
        var _a, _b, _c;
        //@ts-ignore
        modConfig.modResults = __assign(__assign(__assign({}, modConfig.modResults), buildInfoPlist(props.OAuth2ClientID, props)), { CFBundleURLTypes: [
                __assign(__assign({}, (_a = modConfig.modResults.CFBundleURLTypes) === null || _a === void 0 ? void 0 : _a[0]), { CFBundleURLSchemes: __spreadArray(__spreadArray([], (_c = (_b = modConfig.modResults.CFBundleURLTypes) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.CFBundleURLSchemes, true), [
                        props.Scheme,
                    ], false), CFBundleURLName: "$(PRODUCT_BUNDLE_IDENTIFIER)", 
                    //@ts-ignore
                    CFBundleTypeRole: "Editor" }),
            ] });
        return modConfig;
    });
    config = (0, config_plugins_1.withProjectBuildGradle)(expoConfig, function (modConfig) {
        targetSdkVersion = extractTargetSdkVersion(modConfig.modResults.contents);
        modConfig.modResults.contents = updateGradleBuild(modConfig.modResults.contents);
        return modConfig;
    });
    config = (0, config_plugins_1.withAndroidManifest)(config, function (modConfig) { return __awaiter(void 0, void 0, void 0, function () {
        var provider, dirPath, filePath, dirExist;
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (targetSdkVersion >= 30) {
                        //@ts-ignore
                        if ((_a = modConfig.modResults.manifest) === null || _a === void 0 ? void 0 : _a.queries) {
                            //@ts-ignore
                            modConfig.modResults.manifest.queries[0] = __assign(__assign({}, modConfig.modResults.manifest.queries[0]), { package: [
                                    {
                                        $: { "android:name": "com.snapchat.android" }
                                    },
                                ] });
                        }
                        else {
                            modConfig.modResults.manifest = __assign(__assign({}, modConfig.modResults.manifest), { 
                                //@ts-ignore
                                queries: [
                                    {
                                        $: {},
                                        package: [
                                            {
                                                $: { "android:name": "com.snapchat.android" }
                                            },
                                        ]
                                    },
                                ] });
                        }
                    }
                    //@ts-ignore
                    (_b = modConfig.modResults.manifest.application) === null || _b === void 0 ? void 0 : _b[0] =
                        config_plugins_1.AndroidConfig.Manifest.addMetaDataItemToMainApplication(
                        //@ts-ignore
                        modConfig.modResults.manifest.application[0], "com.snapchat.kit.sdk.clientId", props.OAuth2ClientID, "value");
                    provider = (_c = modConfig.modResults.manifest.application[0]) === null || _c === void 0 ? void 0 : _c.provider;
                    if (!provider ||
                        (provider &&
                            !provider.some(function (prov) {
                                return prov.$["android:name"] === "androidx.core.content.FileProvider";
                            }))) {
                        //@ts-ignore
                        (_d = modConfig.modResults.manifest.application) === null || _d === void 0 ? void 0 : _d[0] = __assign(__assign({}, modConfig.modResults.manifest.application[0]), buildFileProvider(((_e = expoConfig.android) === null || _e === void 0 ? void 0 : _e.package) || ''));
                    }
                    else {
                        // check if meta data are defined
                        //<meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/file_paths"/>
                        if (!((_f = provider[0]) === null || _f === void 0 ? void 0 : _f["meta-data"])) {
                            //@ts-ignore
                            modConfig.modResults.manifest.application[0].provider[0]["meta-data"] =
                                [
                                    {
                                        $: {
                                            "android:name": "android.support.FILE_PROVIDER_PATHS",
                                            "android:resource": "@xml/file_paths"
                                        }
                                    },
                                ];
                        }
                        else if (!((_g = provider[0]) === null || _g === void 0 ? void 0 : _g["meta-data"].some(function (meta) {
                            return meta.$["android:name"] === "android.support.FILE_PROVIDER_PATHS" &&
                                meta.$["android:resource"] === "@xml/file_paths";
                        }))) {
                            //@ts-ignore
                            modConfig.modResults.manifest.application[0].provider[0]["meta-data"].push({
                                $: {
                                    "android:name": "android.support.FILE_PROVIDER_PATHS",
                                    "android:resource": "@xml/file_paths"
                                }
                            });
                        }
                    }
                    return [4 /*yield*/, config_plugins_1.AndroidConfig.Paths.getResourceFolderAsync(modConfig.modRequest.projectRoot)];
                case 1:
                    dirPath = _h.sent();
                    return [4 /*yield*/, config_plugins_1.AndroidConfig.Paths.getResourceXMLPathAsync(modConfig.modRequest.projectRoot, 
                        //@ts-ignore
                        { kind: "xml", name: "file_paths" })];
                case 2:
                    filePath = _h.sent();
                    return [4 /*yield*/, (0, fs_1.existsSync)((0, path_1.join)(dirPath, "xml"))];
                case 3:
                    dirExist = _h.sent();
                    if (!!dirExist) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, fs_1.mkdir)((0, path_1.join)(dirPath, "xml"), function (err) { return console.error(err); })];
                case 4:
                    _h.sent();
                    _h.label = 5;
                case 5: return [4 /*yield*/, (0, fs_1.writeFile)(filePath, file_pathsContent, { encoding: "utf-8" }, function (err) {
                        return console.error("write file error ::", err);
                    })];
                case 6:
                    _h.sent();
                    return [2 /*return*/, modConfig];
            }
        });
    }); });
    return config;
};
var file_pathsContent = '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<paths xmlns:android="http://schemas.android.com/apk/res/android">\n' +
    '  <files-path name="files" path="." />\n' +
    '  <external-files-path name="external_files" path="." />\n' +
    '  <external-path name="external_files" path="." />\n' +
    '  <cache-path name="cached_files" path="." />\n' +
    '  <external-cache-path name="cached_files" path="." />\n' +
    '  <root-path name="root" path="." />\n' +
    "</paths>";
exports["default"] = SnapchatConfigPlugin;
var updateGradleBuild = function (contents) {
    var _a;
    var stringToAdd = "\n" +
        "        maven {\n" +
        '            url "https://storage.googleapis.com/snap-kit-build/maven"\n' +
        "        }";
    if (contents.includes(stringToAdd)) {
        return contents;
    }
    var content = contents.split("allprojects");
    var repos = (_a = content === null || content === void 0 ? void 0 : content[1]) === null || _a === void 0 ? void 0 : _a.split("repositories");
    var indexToAdd = repos[1].indexOf("{");
    var updated = content[0] +
        "allprojects" +
        repos[0] +
        "repositories" +
        repos[1].substring(0, indexToAdd + 1) +
        stringToAdd +
        repos[1].substring(indexToAdd + 1, repos[1].length);
    return updated;
};
var buildFileProvider = function (applicationId) {
    return {
        provider: [
            {
                $: {
                    "android:name": "androidx.core.content.FileProvider",
                    "android:authorities": "".concat(applicationId, ".fileprovider"),
                    "android:exported": "false",
                    "android:grantUriPermissions": "true"
                },
                "meta-data": [
                    {
                        $: {
                            "android:name": "android.support.FILE_PROVIDER_PATHS",
                            "android:resource": "@xml/file_paths"
                        }
                    },
                ]
            },
        ]
    };
};
var extractTargetSdkVersion = function (content) {
    var targetSdkVersion = "";
    for (var i = content.indexOf("targetSdkVersion") + 16; i < content.length; i++) {
        if (/^\d$/.test(content[i])) {
            for (; /^\d$/.test(content[i]);) {
                targetSdkVersion = targetSdkVersion + content[i];
                i++;
            }
            break;
        }
    }
    return Number(targetSdkVersion);
};
var buildInfoPlist = function (applicationId, props) {
    return {
        LSApplicationQueriesSchemes: ["snapchat", "bitmoji-sdk", "itms-apps"],
        SCSDKClientId: applicationId,
        SCSDKRedirectUrl: props.SCSDKRedirectUrl,
        NSCameraUsageDescription: props.NSCameraUsageDescription,
        NSMicrophoneUsageDescription: props.NSMicrophoneUsageDescription
    };
};
