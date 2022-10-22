"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1_user_1 = require("../models/1-user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_function_1 = __importDefault(require("../utilities/auth_function"));
dotenv_1.default.config();
const store = new _1_user_1.userStore();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await store.show(userId);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            id: req.body.id,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const user_routes = (app) => {
    app.get('/users', auth_function_1.default, index);
    app.get('/users/:id', auth_function_1.default, show);
    app.post('/users', create);
};
exports.default = user_routes;
