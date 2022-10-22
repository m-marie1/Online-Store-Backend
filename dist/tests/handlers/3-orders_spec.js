"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const _1_users_spec_1 = require("./1-users_spec");
const request = (0, supertest_1.default)(server_1.default);
describe('Test orders handler', function () {
    it('Creates an order and sends its info back', async function () {
        const response = await request
            .post('/orders')
            .send({ status: 'open', user_id: 1 })
            .set('Authorization', `Bearer ${_1_users_spec_1.token}`);
        expect(response.status).toEqual(200);
    });
    it('Gets orders by user id', async function () {
        const response = await request
            .get('/orders/1')
            .set('Authorization', `Bearer ${_1_users_spec_1.token}`)
            .expect(200);
        expect(response.body[0].id).toBe(1);
        expect(response.body[0].status).toBe('open');
        expect(response.body[0].user_id).toBe(1);
        expect(response.body.length).toBe(1);
    });
    it('Adds a produuct to an open order', async function () {
        const response = await request
            .post('/orders/1/products')
            .send({ quantity: 15, product_id: 1 })
            .set('Authorization', `Bearer ${_1_users_spec_1.token}`)
            .expect(200);
        expect(response.body.id).toBe(1);
        expect(response.body.quantity).toBe(15);
        expect(response.body.product_id).toBe(1);
    });
});
