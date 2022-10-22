import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret);

    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};

export default verifyAuthToken;
