"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _3_order_1 = require("../models/3-order");
const auth_function_1 = __importDefault(require("../utilities/auth_function"));
const store = new _3_order_1.orderStore();
const create = async (req, res) => {
    try {
        const order = {
            id: req.body.id,
            status: req.body.status,
            user_id: req.body.user_id,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderByUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id);
        const currentOrder = await store.orderByUser(userId);
        res.json(currentOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    try {
        const orderP = {
            order_id: parseInt(req.params.id),
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const addedProduct = await store.addProduct(orderP);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_routes = (app) => {
    app.post('/orders', auth_function_1.default, create);
    app.get('/orders/:user_id', auth_function_1.default, orderByUser);
    app.post('/orders/:id/products', auth_function_1.default, addProduct);
};
exports.default = order_routes;
