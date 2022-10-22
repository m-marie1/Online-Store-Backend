import express, { Request, Response } from 'express';
import { User, userStore } from '../models/1-user';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../utilities/auth_function';

dotenv.config();

const store = new userStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.id);
    const user = await store.show(userId);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: req.body.id,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as Secret
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
};

export default user_routes;
