"use server";
"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoGalleries = exports.getGalleryVideos = exports.getGalleryPhotos = exports.addImageToGallery = exports.getGalleries = exports.validateAndFixFeaturedImages = void 0;
// Runtime configuration handled in route segments
var react_1 = require("react");
var db_1 = __importDefault(require("@/app/db/db"));
var validateAndFixFeaturedImages = function (galleryId) { return __awaiter(void 0, void 0, void 0, function () {
    var gallery, featuredImages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.default.gallery.findUnique({
                    where: { id: galleryId },
                    include: { images: true }
                })];
            case 1:
                gallery = _a.sent();
                if (!gallery) {
                    throw new Error('Gallery not found');
                }
                featuredImages = gallery.images.filter(function (img) { return img.featured; });
                if (featuredImages.length === 1) {
                    return [2 /*return*/]; // Already valid
                }
                if (!(featuredImages.length === 0 && gallery.images.length > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1.default.image.update({
                        where: { id: gallery.images[0].id },
                        data: { featured: true }
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!(featuredImages.length > 1)) return [3 /*break*/, 5];
                return [4 /*yield*/, Promise.all(featuredImages.slice(1).map(function (img) {
                        return db_1.default.image.update({
                            where: { id: img.id },
                            data: { featured: false }
                        });
                    }))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.validateAndFixFeaturedImages = validateAndFixFeaturedImages;
exports.getGalleries = (0, react_1.cache)(function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (language) {
        var galleries, localizedGalleries, error_1;
        if (language === void 0) { language = 'en'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.default.gallery.findMany({
                            include: {
                                images: {
                                    orderBy: {
                                        featured: 'desc'
                                    }
                                }
                            },
                            orderBy: { createdAt: 'desc' },
                        })];
                case 1:
                    galleries = _a.sent();
                    // Validate featured images in parallel
                    return [4 /*yield*/, Promise.all(galleries.map(function (gallery) { return (0, exports.validateAndFixFeaturedImages)(gallery.id); }))];
                case 2:
                    // Validate featured images in parallel
                    _a.sent();
                    localizedGalleries = galleries.map(function (gallery) { return ({
                        id: gallery.id,
                        title: language === 'en' ? gallery.title_en : gallery.title_ar,
                        images: gallery.images.map(function (image) { return ({
                            id: image.id,
                            url: image.url,
                            title: image.title_en && image.title_ar ?
                                (language === 'en' ? image.title_en : image.title_ar) :
                                null,
                            featured: image.featured
                        }); })
                    }); });
                    return [2 /*return*/, {
                            success: true,
                            data: localizedGalleries
                        }];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching galleries:', error_1);
                    return [2 /*return*/, {
                            success: false,
                            error: 'Failed to fetch galleries'
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
});
var addImageToGallery = function (galleryId, imageUrl, title_en, title_ar) { return __awaiter(void 0, void 0, void 0, function () {
    var image, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.image.create({
                        data: {
                            url: imageUrl,
                            title_en: title_en,
                            title_ar: title_ar,
                            galleryId: galleryId,
                            featured: false
                        }
                    })];
            case 1:
                image = _a.sent();
                return [2 /*return*/, {
                        success: true,
                        data: {
                            id: image.id,
                            url: image.url,
                            title: image.title_en,
                            featured: image.featured
                        }
                    }];
            case 2:
                error_2 = _a.sent();
                console.error('Error adding image to gallery:', error_2);
                return [2 /*return*/, {
                        success: false,
                        error: 'Failed to add image to gallery'
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addImageToGallery = addImageToGallery;
exports.getGalleryPhotos = (0, react_1.cache)(function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (language) {
        if (language === void 0) { language = 'en'; }
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.getGalleries)(language)];
        });
    });
});
exports.getGalleryVideos = (0, react_1.cache)(function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (language) {
        if (language === void 0) { language = 'en'; }
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, exports.getVideoGalleries)(language)];
        });
    });
});
exports.getVideoGalleries = (0, react_1.cache)(function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (language) {
        var videoGalleries, localizedVideoGalleries, error_3;
        if (language === void 0) { language = 'en'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.default.videoGallery.findMany({
                            include: {
                                videos: true
                            },
                            orderBy: { createdAt: 'desc' },
                        })];
                case 1:
                    videoGalleries = _a.sent();
                    localizedVideoGalleries = videoGalleries.map(function (gallery) { return ({
                        id: gallery.id,
                        title: language === 'en' ? gallery.title_en : gallery.title_ar,
                        videos: gallery.videos.map(function (video) { return ({
                            id: video.id,
                            url: video.url,
                            title: language === 'en' ? video.title_en : video.title_ar,
                            description: video.description_en && video.description_ar ?
                                (language === 'en' ? video.description_en : video.description_ar) :
                                null,
                            type: video.type
                        }); })
                    }); });
                    return [2 /*return*/, {
                            success: true,
                            data: localizedVideoGalleries
                        }];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error fetching video galleries:', error_3);
                    return [2 /*return*/, {
                            success: false,
                            error: 'Failed to fetch video galleries'
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
});
