"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    async create(O) {
        // Create a new order
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [O.status, O.user_id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order of status ${O.status} and userId of ${O.user_id}. Error: ${err}`);
        }
    }
    async orderByUser(user_id) {
        // Get all oreders that are associated to a user by user id
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE user_id=($1)`;
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`couldn't get the current order or orders of that user id ${err}`);
        }
    }
    async addProduct(oP) {
        //Check if the order is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(ordersql, [oP.order_id]);
            const order = result.rows[0];
            if (order.status !== 'open') {
                throw new Error(`Could not add product ${oP.product_id} to order ${oP.order_id} because order status is ${order.status}`);
            }
            conn.release();
        }
        catch (err) {
            throw err;
        }
        //add product to an open order
        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                oP.quantity,
                oP.order_id,
                oP.product_id,
            ]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${oP.product_id} to order ${oP.order_id}: ${err}`);
        }
    }
}
exports.orderStore = orderStore;
