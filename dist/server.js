"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const _1_users_1 = __importDefault(require("./handlers/1-users"));
const _2_products_1 = __importDefault(require("./handlers/2-products"));
const _3_orders_1 = __importDefault(require("./handlers/3-orders"));
const _4_dashboard_1 = __importDefault(require("./handlers/4-dashboard"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, _1_users_1.default)(app);
(0, _2_products_1.default)(app);
(0, _3_orders_1.default)(app);
(0, _4_dashboard_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
