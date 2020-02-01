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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = __importDefault(require("../models/User"));
var express_validator_1 = require("express-validator");
var authenticate_1 = __importDefault(require("../middleware/authenticate"));
var router = express_1.Router();
// @route - POST /user/signup
// @desc - Registers a user
// @access - Public
router.post('/signup', express_validator_1.check('email', 'Email is required')
    .not()
    .isEmpty(), express_validator_1.check('email', 'Email is invalid').isEmail(), express_validator_1.check('name', 'Name is required')
    .not()
    .isEmpty(), express_validator_1.check('password', 'Password is required')
    .not()
    .isEmpty(), express_validator_1.check('password', 'Password should be minimum 8 characters').isLength({
    min: 8
}), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, name_1, password, user, accessToken, _b, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty())
                    return [2 /*return*/, res
                            .status(400)
                            .send({ statusCode: 400, message: errors.array() })];
                _a = req.body, email = _a.email, name_1 = _a.name, password = _a.password;
                user = new User_1.default({ email: email, name: name_1, password: password });
                return [4 /*yield*/, user.save()];
            case 1:
                _c.sent();
                _b = "Bearer ";
                return [4 /*yield*/, user.getAccessToken()];
            case 2:
                accessToken = _b + (_c.sent());
                return [2 /*return*/, res
                        .status(201)
                        .send({ statusCode: 201, user: user, accessToken: accessToken, expiresIn: '24h' })];
            case 3:
                err_1 = _c.sent();
                return [2 /*return*/, res.status(500).json({ statusCode: 500, message: 'Server Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route - POST /user/login
// @desc - Registers a user
// @access - Public
router.post('/login', express_validator_1.check('email', 'Email is required')
    .not()
    .isEmpty(), express_validator_1.check('password', 'Password is required')
    .not()
    .isEmpty(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, accessToken, _b, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty())
                    return [2 /*return*/, res
                            .status(400)
                            .send({ statusCode: 400, message: errors.array() })];
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findByEmailAndPassword(email, password)];
            case 1:
                user = _c.sent();
                if (!user)
                    return [2 /*return*/, res
                            .status(401)
                            .send({ statusCode: 401, message: 'Invalid credentials' })];
                _b = "Bearer ";
                return [4 /*yield*/, user.getAccessToken()];
            case 2:
                accessToken = _b + (_c.sent());
                return [2 /*return*/, res.send({ statusCode: 200, user: user, accessToken: accessToken, expiresIn: '24h' })];
            case 3:
                err_2 = _c.sent();
                return [2 /*return*/, res.status(500).send({ statusCode: 500, message: 'Server Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route - DELETE /user/logout
// @desc - Log out user.
// @access - Private (Auth)
router.delete('/logout', authenticate_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accessToken = req.accessToken.replace('Bearer ', '');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1.default.findOne({ accessToken: accessToken })];
            case 2:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res
                            .status(400)
                            .send({ statusCode: 400, message: 'Invalid request' })];
                user.accessToken = null;
                return [2 /*return*/, res
                        .status(202)
                        .send({ statusCode: 202, message: 'User Logged out successfully' })];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).send({ statusCode: 500, message: 'Server Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
