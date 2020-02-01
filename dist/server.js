"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
require("./db");
var app = express_1.default();
var PORT = (_a = parseInt(process.env.PORT), (_a !== null && _a !== void 0 ? _a : 5000));
// Routes
app.use('/users', require('./routes/userRoutes'));
app.listen(PORT, function () {
    console.log("Server started on PORT " + PORT);
});
