import express, { Request, Response } from 'express';
import { Order, orderProducts, orderStore } from '../models/3-order';
import verifyAuthToken from '../utilities/auth_function';

const store = new orderStore();

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: req.body.id,
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderByUser = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.user_id);
    const currentOrder = await store.orderByUser(userId);
    res.json(currentOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderP: orderProducts = {
      order_id: parseInt(req.params.id),
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };

    const addedProduct = await store.addProduct(orderP);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_routes = (app: express.Application) => {
  app.post('/orders', verifyAuthToken, create);
  app.get('/orders/:user_id', verifyAuthToken, orderByUser);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default order_routes;
