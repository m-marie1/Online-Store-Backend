import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOrders();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/products-in-orders', productsInOrders);
  app.get('/users-with-orders', usersWithOrders);
};

export default dashboardRoutes;
