# Storefront Backend Project

>- To run the app, Open the terminal in the root folder of the project, Run `npm run build` then `node dist/server.js` or you can just run `npm run start`.
>- `db-migrate up` and `node dist/server.js` or `npm run watch` and now you can test the endpoints in postman.


## Environment Variables

POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=
POSTGRES_PASSWORD=
ENV=dev
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=

## Ports

-localhost port is: 3000
-Postgres port is: 5432

## Databases

There are 2 databases shopping and shopping_test. There's an environment variable ENV=dev
and it's set to equal test when running jasmine tests so the the tests occur on the shopping_test database (in the test script in package.json (npm run test))

## Migrations

- There are 4 tables all have migrations.
- For Up migrations: db-migrate up
- For Down migrations: db-migrate down -c 5  or: db-migrate reset
- For shopping_test Down migrations: `db-migrate --env test down -c 5`

## Project Setup

> - `npm install` & `yarn install` for installing all the packages in dependencies.
> - Database creation:
      -  `CREATE USER shopping_user WITH PASSWORD 'password123';`
      -  `CREATE DATABASE shopping;`
      -  `\c shopping;`
      -  `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
      -  `CREATE DATABASE shopping_test;`
      -  `\c shopping_test;`
      -  `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`
> - `db-migrate up`
> - `npm run test` for Jasmine
> - `npm run build` for compiling TypeScript
> - `npm run watch` to run server and use Postman

## RESTful routes for the endpoints routes


- An INDEX route: '/users' [GET]
- A SHOW route: '/users/:id' [GET]
- A CREATE route: '/users' [POST]

- An INDEX route: '/products' [GET]
- A SHOW route: '/products/:id' [GET]
- A CREATE route: '/products' [POST]

- A CREATE route: '/orders' [POST]
- An INDEX route: '/orders/:user_id' [GET]
- A CREATE route: '/orders/:id/products' [POST]

- An INDEX route: '/products-in-orders' [GET]
- An INDEX route: '/users-with-orders' [GET]


## Application description and usage
- A storefront API for an online store. The API provides the database for users, products and orders. It uses password hashing using bcrypt to protect sensitive data and authorization using jsonwebtoken to only allow authorized users to use the service.

The app uses the following tools:
> - Node, Express, cors, TypeScript, Jasmine, Supertest, Postgres, db-migrate, dotenv, bcrypt, jsonwebtoken and prettier.

- Using Postman, We can test the app: create a new user and get a token as a response then using the token to get authurized to show all users or show a single user by putting the user id as a parameter in the route. We can create orders and products, show one or all products and show all orders or one that's attached to a specific user using user_id. and using the addProduct function, We can add many products to one order. 
