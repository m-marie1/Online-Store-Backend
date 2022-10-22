"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const dashboard = new dashboard_1.DashboardQueries();
const usersWithOrders = async (_req, res) => {
    try {
        const users = await dashboard.usersWithOrders();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productsInOrders = async (_req, res) => {
    try {
        const products = await dashboard.productsInOrders();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const dashboardRoutes = (app) => {
    app.get('/products-in-orders', productsInOrders);
    app.get('/users-with-orders', usersWithOrders);
};
exports.default = dashboardRoutes;
