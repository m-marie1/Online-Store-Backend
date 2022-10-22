import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import user_routes from './handlers/1-users';
import product_routes from './handlers/2-products';
import order_routes from './handlers/3-orders';
import dashboardRoutes from './handlers/4-dashboard';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

user_routes(app);
product_routes(app);
order_routes(app);
dashboardRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
