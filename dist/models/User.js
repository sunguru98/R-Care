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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    accessToken: String,
    email: { type: String, required: true },
    routes: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'route', default: [] }
});
userSchema.methods.toJSON = function () {
    var user = this;
    delete user.__v;
    delete user.password;
    return user;
};
userSchema.methods.getAccessToken = function () {
    return __awaiter(this, void 0, void 0, function () {
        var user, payload, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = this;
                    payload = { email: user.email, _id: user.id };
                    token = jsonwebtoken_1.sign(payload, process.env.JWT_SECRET_KEY, {
                        expiresIn: '24h'
                    });
                    user.accessToken = token;
                    return [4 /*yield*/, user.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, user.accessToken];
            }
        });
    });
};
userSchema.statics.findByEmailAndPassword = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isMatched, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error('Invalid credentials');
                return [4 /*yield*/, bcryptjs_1.compare(user.password, password)];
            case 2:
                isMatched = _a.sent();
                if (!isMatched)
                    throw new Error('Invalid credentials');
                return [2 /*return*/, user];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.isModified('password')) return [3 /*break*/, 2];
                    return [4 /*yield*/, bcryptjs_1.hash(this.password, 10)];
                case 1:
                    hashedPassword = _a.sent();
                    this.password = hashedPassword;
                    _a.label = 2;
                case 2:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
var User = mongoose_1.model('user', userSchema);
exports.default = User;
