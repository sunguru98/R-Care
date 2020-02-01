"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
mongoose_1.connect(process.env.MONGODB_URI.replace('<password>', process.env.MONGODB_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}, function () { return console.log('Database connected'); });
